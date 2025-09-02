// src/components/ImageCarousel.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";

function parseAspect(aspect = "16/9") {
  const [w, h] = String(aspect).split("/").map(Number);
  if (!w || !h) return 56.25; // fallback 16:9
  return (h / w) * 100;       // padding-top %
}

const ImageCarousel = ({
  images = [],           // array de strings ou { src, alt }
  aspect = "16/9",       // "16/9", "3/2", "4/3"...
  autoPlay = false,
  interval = 5000,
  className = "",
  rounded = "2xl",       // "lg" | "xl" | "2xl"
}) => {
  // ---- Hooks tjrs au début (avant tout return) ----
  const [index, setIndex] = useState(0);
  const total = images?.length ?? 0;

  // refs pour le swipe
  const startX = useRef(null);
  const deltaX = useRef(0);

  // autoplay
  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(() => setIndex(i => (i + 1) % total), interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, total]);

  // handlers swipe
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const T = 50; // px
    if (deltaX.current >  T) setIndex(i => (i - 1 + total) % total);
    if (deltaX.current < -T) setIndex(i => (i + 1) % total);
    startX.current = null;
    deltaX.current = 0;
  };

  // clavier
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft")  setIndex(i => (i - 1 + total) % total);
    if (e.key === "ArrowRight") setIndex(i => (i + 1) % total);
  };

  // ---- dérivés / styles ----
  const slides = useMemo(
    () => images.map(img => (typeof img === "string" ? { src: img, alt: "" } : img)),
    [images]
  );
  const current = ((index % Math.max(total, 1)) + Math.max(total, 1)) % Math.max(total, 1);
  const padTop = parseAspect(aspect); // ratio en %

  // mapping arrondis (évite rounded-${...})
  const roundedMap = { lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl" };
  const roundedCls = roundedMap[rounded] || "rounded-2xl";

  // ---- rendu (après les hooks) ----
  if (total === 0) return null;

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
          {/* Track : left:0 (pas de right:0) pour laisser la largeur s'adapter */}
          <div
            className="absolute top-0 left-0 flex h-full transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="relative flex-shrink-0 w-full h-full">
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

        {/* Flèches */}
        {total > 1 && (
          <>
            <button
              onClick={() => setIndex(i => (i - 1 + total) % total)}
              aria-label="Previous slide"
              className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow left-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
            <button
              onClick={() => setIndex(i => (i + 1) % total)}
              aria-label="Next slide"
              className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow right-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="m10 6 1.41 1.41L8.83 10H20v2H8.83l2.58 2.59L10 16l-6-6z"/></svg>
            </button>
          </>
        )}

        {/* Points */}
        {total > 1 && (
          <div className="absolute flex items-center gap-2 -translate-x-1/2 left-1/2 bottom-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ring-1 ring-zinc-200 transition ${i === current ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel;
