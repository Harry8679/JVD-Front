import React, { useState, useEffect, useRef, useMemo } from "react";

function parseAspect(aspect = "16/9") {
  const [w, h] = String(aspect).split("/").map(Number);
  if (!w || !h) return 56.25;       // fallback 16:9
  return (h / w) * 100;             // padding-top %
}

const ImageCarousel = ({
  images = [],
  aspect = "16/9",
  autoPlay = false,
  interval = 5000,
  className = "",
  rounded = "2xl",
}) => {
  const [index, setIndex] = useState(0);
  const total = images?.length ?? 0;
  if (!total) return null;

  const startX = useRef(null);
  const deltaX = useRef(0);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(() => setIndex(i => (i + 1) % total), interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, total]);

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; deltaX.current = 0; };
  const onTouchMove  = (e) => { if (startX.current == null) return; deltaX.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd   = () => {
    const T = 50;
    if (deltaX.current >  T) setIndex(i => (i - 1 + total) % total);
    if (deltaX.current < -T) setIndex(i => (i + 1) % total);
    startX.current = null; deltaX.current = 0;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft")  setIndex(i => (i - 1 + total) % total);
    if (e.key === "ArrowRight") setIndex(i => (i + 1) % total);
  };

  const slides = useMemo(
    () => images.map(img => (typeof img === "string" ? { src: img, alt: "" } : img)),
    [images]
  );

  const padTop = parseAspect(aspect);
  const roundedMap = { lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl" };
  const roundedCls = roundedMap[rounded] || "rounded-2xl";

  // largeur du track et déplacement juste d’1 slide
  const trackWidthPct   = total * 100;                // ex: 5 slides -> 500%
  const slideWidthPct   = 100 / total;                // ex: 20%
  const translateXPct   = (index * 100) / total;      // ex: 1 slide -> 20%

  return (
    <section className={`w-full ${className}`}>
      <div
        className={`relative overflow-hidden ${roundedCls} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ring-1 ring-zinc-200 bg-black`}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Image carousel"
      >
        {/* Wrapper ratio */}
        <div
          className="relative w-full"
          style={{ paddingTop: `${padTop}%` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Track */}
          <div
            className="absolute top-0 left-0 flex h-full transition-transform duration-500"
            style={{
              width: `${trackWidthPct}%`,
              transform: `translateX(-${translateXPct}%)`,
            }}
          >
            {slides.map((s, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-full"
                style={{ width: `${slideWidthPct}%` }}
              >
                <img
                  src={s.src}
                  alt={s.alt || `Slide ${i + 1}`}
                  className="absolute inset-0 object-cover w-full h-full"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={() => setIndex(i => (i - 1 + total) % total)}
              aria-label="Previous slide"
              className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow left-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
            >
              {/* chevron-left */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={() => setIndex(i => (i + 1) % total)}
              aria-label="Next slide"
              className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow right-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
            >
              {/* chevron-right (corrigé) */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M8.59 7.41 10 6l6 6-6 6-1.41-1.41L13.17 12z" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {total > 1 && (
          <div className="absolute flex items-center gap-2 -translate-x-1/2 left-1/2 bottom-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ring-1 ring-zinc-200 transition ${i === index ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel;