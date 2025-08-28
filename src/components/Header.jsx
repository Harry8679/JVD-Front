import React from "react";

// Tailwind-only, no external UI libs needed
// Drop this component into your app and ensure Tailwind is configured.
// The design mirrors the provided screenshot with fully responsive behavior.

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-200">
      {/* Top Announcement Bar */}
      <div className="w-full bg-zinc-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold tracking-tight">Pray First</span>
              <span className="text-zinc-300">21 Days of Prayer and Fasting</span>
            </div>
            <div className="flex items-baseline gap-2 sm:justify-end">
              <span className="font-semibold tracking-tight">Bible in One Year</span>
              <span className="text-zinc-300">Study the Bible with VOUS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Partner / Sub Nav Bar */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Left: logo strip (scrollable on small screens) */}
            <nav className="flex-1 overflow-x-auto">
              <ul className="flex items-center gap-6 min-w-max text-zinc-800">
                <li className="whitespace-nowrap font-serif italic text-lg">Friends + Family</li>
                <li className="whitespace-nowrap font-semibold">VOUSCon</li>
                <li className="whitespace-nowrap font-semibold">
                  <span className="tracking-tight">VOUS</span>
                  <span className="ml-2 text-xs uppercase tracking-wider align-top">College of Ministry</span>
                </li>
                <li className="whitespace-nowrap font-semibold">
                  <span className="tracking-tight">VOUS</span> <span className="tracking-tight">MERCH</span>
                </li>
                <li className="whitespace-nowrap font-semibold flex items-center gap-1">
                  <span className="tracking-tight">VOUS</span>
                  <span className="tracking-tight">WORSHIP</span>
                </li>
              </ul>
            </nav>

            {/* Right: CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 active:scale-[.99] transition">
                Care Request
              </button>
              <button className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 active:scale-[.99] transition">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Header */}
      <div className="w-full bg-rose-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5 gap-4">
            {/* Brand mark (placeholder) */}
            <a href="#" aria-label="VOUS Home" className="flex items-center gap-2">
              <div className="font-black text-2xl tracking-tight">VOUS</div>
            </a>

            {/* Center nav inside elevated card */}
            <div className="hidden md:flex">
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-zinc-100">
                <nav aria-label="Primary" className="px-6">
                  <ul className="flex items-center gap-8 text-base font-semibold text-zinc-900">
                    <li>
                      <a href="#" className="inline-block py-3 hover:opacity-70">
                        Visit VOUS
                      </a>
                    </li>
                    <li>
                      <a href="#" className="inline-block py-3 hover:opacity-70">
                        Sermons
                      </a>
                    </li>
                    <li>
                      <a href="#" className="inline-block py-3 hover:opacity-70">
                        Crews
                      </a>
                    </li>
                    <li>
                      <a href="#" className="inline-block py-3 hover:opacity-70">
                        Vision
                      </a>
                    </li>
                    <li>
                      <a href="#" className="inline-block py-3 hover:opacity-70">
                        Give
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Right: Menu button */}
            <div className="flex items-center gap-3">
              <button className="md:hidden inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-white/70 bg-white">
                <span>Menu</span>
                <HamburgerIcon />
              </button>
              <button className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-zinc-900">
                <span>Menu</span>
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M3 6.75h18v1.5H3zM3 11.25h18v1.5H3zM3 15.75h18v1.5H3z" />
    </svg>
  );
}