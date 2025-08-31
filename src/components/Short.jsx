import React, { useState } from 'react'

const Short = ({
    videos = [],
    sideTitle = "VOUS SOMI GROUNDBREAKING",
    sideSubtitle = "The story behind the vision",
    sideText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed erat vitae velit finibus dictum. Donec non risus arcu.",
    ctaLabel = "Learn More",
    ctaHref = "#",
}) => {
    const [index, setIndex] = useState(0);
    const total = videos.length;
    const current = Math.min(Math.max(index, 0), Math.max(total - 1, 0));


    const goPrev = () => setIndex((i) => (i - 1 + total) % total);
    const goNext = () => setIndex((i) => (i + 1) % total);


    if (!total) return null;
  return (
    <section className="bg-rose-50/40">
        <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
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
        </div>
    </section>
  )
}

export default Short;