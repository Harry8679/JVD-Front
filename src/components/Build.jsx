import React from 'react'

const Build = ({
    title = "VOUS SOMI",
    subtitle = "Building Project",
    heroImage = "https://images.unsplash.com/photo-1469796466635-455ede028aca?q=80&w=2000&auto=format&fit=crop",
    visionHref = "#",
    giveHref = "#",
    videoId = "",
}) => {
  
  return (
    <section className="border-t bg-rose-50/40 border-zinc-100">
        <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8 sm:py-16">
        {/* Title */}
            <div className="text-center">
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
                <p className="mt-2 text-lg italic sm:text-xl text-zinc-700">{subtitle}</p>
            </div>
            <div className="relative mt-10 sm:mt-12">
              <div className="relative overflow-hidden rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ring-1 ring-zinc-200 bg-white">
                <img
                src={heroImage}
                alt="VOUS SoMi Building Project"
                className="block w-full h-auto"
                loading="lazy"
                />


                {/* CTA pill centered near bottom */}
                <div className="absolute -translate-x-1/2 left-1/2 bottom-6">
                  <div className="flex items-center gap-2 px-2 py-2 rounded-md shadow bg-zinc-100/90 backdrop-blur ring-1 ring-zinc-300">
                    <a href={visionHref}
                      className="inline-flex items-center justify-center rounded-sm border border-zinc-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-zinc-50 active:scale-[.99]">
                      See the Vision
                    </a>
                    <a
                      href={giveHref}
                      className="inline-flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-white px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-zinc-800 active:scale-[.99]">
                      Give Today
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Video (optional) */}
            {videoId ? (
              <div className="mt-12 rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ring-1 ring-zinc-200 bg-black">
                <div className="relative pt-[56.25%]">
                  <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="VOUS SoMi Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  />
                </div>
              </div>
            ) : null}
        </div>
    </section>
  )
}

export default Build