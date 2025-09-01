import React from 'react'

const LatestUpdateCard = ({
    title = "Latest Update",
    paragraphs = [], // array of strings; for rich text, pass children instead
    className = "",
    icon = "★",
    children,
}) => {
  return (
    <section className={`w-full ${className}`}>
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#dcd3c9] text-zinc-900 ring-1 ring-black/10 shadow-sm px-5 sm:px-8 py-7 sm:py-10">
                {/* Title + star */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">{icon}</span>
                    <h3 className="text-2xl font-extrabold sm:text-3xl">{title}</h3>
                </div>
                {/* Divider */}
                <div className="mt-4 border-t border-zinc-900/80" />
                {/* Content */}
                <div className="mt-6 space-y-6 text-base leading-relaxed sm:text-lg">
                    {children ? children : paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default LatestUpdateCard;