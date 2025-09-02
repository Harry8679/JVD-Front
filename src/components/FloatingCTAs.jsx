import React, { useState, useEffect } from 'react'

const FloatingCTAs = ({
    anchorIds = ["build-cta", "vision-cta"],
    visionHref = "#",
    visionLabel = "See the Vision",
    giveHref = "#",
    giveLabel = "Give Today",
    topOffset = 16, // px from top when fixed
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodes = anchorIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

    if (!nodes.length) {
        setVisible(true);
        return;
    }

    let anyVisible = false;
    const update = () => setVisible(!anyVisible);


    const obs = new IntersectionObserver((entries) => {
        // recompute visibility across all entries
        anyVisible = entries.some((e) => e.isIntersecting);
        update();
    }, { threshold: 0.1 });


    nodes.forEach((n) => obs.observe(n));


    return () => obs.disconnect();
    }, [anchorIds.join(",")]);
  return (
    <div className={`fixed left-1/2 -translate-x-1/2 z-50 transition duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    style={{ top: topOffset }} aria-hidden={!visible}>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md shadow bg-zinc-100/90 backdrop-blur ring-1 ring-zinc-300">
            <a href={visionHref}
            className="inline-flex items-center justify-center rounded-sm border border-zinc-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-zinc-50 active:scale-[.99]">
                {visionLabel}
            </a>
            <a href={giveHref}
            className="inline-flex items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-white px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide hover:bg-zinc-800 active:scale-[.99]">
                {giveLabel}
            </a>
        </div>
    </div>
  )
}

export default FloatingCTAs;