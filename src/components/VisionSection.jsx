import React from 'react'

const VisionSection = ({
    title = "See the Vision",
    ctaPrimaryLabel = "SEE THE VISION",
    ctaPrimaryHref = "#",
    ctaSecondaryLabel = "GIVE TODAY",
    ctaSecondaryHref = "#",
    videoId = "", // YouTube ID (ex: Ow3xcNv4a4I)
}) => {
  return (
    <section className="py-10 bg-zinc-700 sm:py-14">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            {/* Centered CTAs on top */}
            <div className="flex justify-center gap-2">
                <a href={ctaPrimaryHref} className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide uppercase border rounded-sm border-zinc-300 bg-zinc-200/20 sm:text-sm text-zinc-100 hover:bg-zinc-200/30">
                    {ctaPrimaryLabel}
                </a>
                <a href={ctaSecondaryHref} className="inline-flex items-center justify-center rounded-sm border border-zinc-900 bg-[#ded6cd] px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-zinc-900 hover:bg-[#d6cec4]">
                    {ctaSecondaryLabel}
                </a>
            </div>
            {/* Title */}
            <h2 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-100">
                {title}
            </h2>

            {/* Divider */}
            <div className="mt-4 border-t border-zinc-500" />
            
            {/* Video */}
            {videoId ? (
                <div className="mt-8 rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/20 bg-black">
                    <div className="relative pt-[56.25%]">
                    <iframe className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                        title="Vision Video" frameBorder="0"
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

export default VisionSection;