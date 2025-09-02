import React, { useState, useEffect } from 'react'

const ImageCarousel = ({
    images = [], // array of strings or {src, alt}
    aspect = "16/9", // ex: "16/9", "3/2", "4/3"
    autoPlay = false,
    interval = 5000,
    className = "",
    rounded = "2xl",
}) => {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = ((index % total) + total) % total;


  // Auto-play
  useEffect(() => {
  if (!autoPlay || total <= 1) return;
  const id = setInterval(() => setIndex((i) => (i + 1) % total), interval);
  return () => clearInterval(id);
  }, [autoPlay, interval, total]);


  // Swipe support
  const startX = React.useRef(null);
  const deltaX = React.useRef(0);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const threshold = 50; // px
    if (deltaX.current > threshold) setIndex((i) => (i - 1 + total) % total);
    else if (deltaX.current < -threshold) setIndex((i) => (i + 1) % total);
    startX.current = null;
    deltaX.current = 0;
  };


  // Keyboard arrows
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
  };


  if (!total) return null;


  const roundedCls = `rounded-${rounded}`;
  const aspectCls = `aspect-[${aspect}]`;


  const slides = images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : img
  );
  return (
    <section className={`w-full ${className}`}>
        <div
        className={`relative overflow-hidden ${roundedCls} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ring-1 ring-zinc-200 bg-black`}
        onKeyDown={onKeyDown} tabIndex={0} aria-roledescription="carousel" aria-label="Image carousel">
        {/* Slides wrapper */}
        <div className={`relative w-full ${aspectCls}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((s, i) => (
                <div key={i} className="relative flex-shrink-0 w-full h-full">
                    <img
                    src={s.src} alt={s.alt || `Slide ${i + 1}`} className="absolute inset-0 object-cover w-full h-full"
                    loading={i === 0 ? "eager" : "lazy"}/>
                </div>
            ))}
            </div>
        </div>


        {/* Arrows */}
        {total > 1 && (
        <>
        <button onClick={() => setIndex((i) => (i - 1 + total) % total)} aria-label="Previous slide"
        className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow left-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button onClick={() => setIndex((i) => (i + 1) % total)} aria-label="Next slide"
        className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow right-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="m10 6 1.41 1.41L8.83 10H20v2H8.83l2.58 2.59L10 16l-6-6z"/></svg>
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
        className={`h-2.5 w-2.5 rounded-full ring-1 ring-zinc-200 transition ${
        i === current ? "bg-white" : "bg-white/40"
        }`}
        />
        ))}
        </div>
        )}
        </div>
    </section>
  )
}

export default ImageCarousel;