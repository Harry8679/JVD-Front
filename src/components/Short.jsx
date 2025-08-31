import React, { useState } from "react";

const Short = ({
  videos = ["jNQXAC9IVRw"], // mets tes IDs YouTube ici pour test
  sideTitle = "VOUS SOMI GROUNDBREAKING",
  sideSubtitle = "The story behind the vision",
  sideText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed erat vitae velit finibus dictum. Donec non risus arcu.",
  ctaLabel = "Learn More",
  ctaHref = "#",
}) => {
  const [index, setIndex] = useState(0);
  const total = videos.length;
  const current = ((index % total) + total) % total; // sécurise l’index

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="bg-rose-50/40">
      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          {/* Gauche : vidéo verticale + flèches + vignettes */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ring-1 ring-zinc-200 bg-black">
              {/* Wrapper 9:16 */}
              <div className="relative pt-[177.78%]">
                <iframe
                  key={videos[current]}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videos[current]}?rel=0&modestbranding=1&playsinline=1`}
                  title="Shorts Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Flèches */}
              <button
                onClick={goPrev}
                aria-label="Previous video"
                className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow left-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next video"
                className="absolute inline-flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full shadow right-3 top-1/2 bg-white/85 hover:bg-white ring-1 ring-zinc-200"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="m10 6 1.41 1.41L8.83 10H20v2H8.83l2.58 2.59L10 16l-6-6z" />
                </svg>
              </button>
            </div>

            {/* Miniatures */}
            <div className="mt-4">
              <div className="flex gap-3 pb-2 overflow-x-auto">
                {videos.map((vid, i) => (
                  <button
                    key={vid + i}
                    onClick={() => setIndex(i)}
                    className={`relative shrink-0 w-16 sm:w-20 aspect-[9/16] overflow-hidden rounded-lg ring-1 ${
                      i === current ? "ring-zinc-900" : "ring-zinc-300"
                    } bg-zinc-100`}
                    aria-label={`Play video ${i + 1}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`}
                      alt="Video thumbnail"
                      className="absolute inset-0 object-cover w-full h-full"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Droite : texte */}
          <div className="md:pl-2">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{sideTitle}</h2>
            {sideSubtitle && (
              <p className="mt-2 text-lg italic text-zinc-700">{sideSubtitle}</p>
            )}
            {sideText && (
              <p className="mt-6 leading-relaxed text-zinc-700">{sideText}</p>
            )}
            {ctaLabel && (
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center px-4 py-2 mt-6 text-sm font-semibold bg-white border rounded-md border-zinc-300 hover:bg-zinc-50 ring-1 ring-inset ring-zinc-100"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Short;