import React from "react";
import { Link } from "react-router-dom";

// Header principal (annonce + sous-nav + nav)
export default function Header() {
  return (
    <header className="w-full border-b border-zinc-200">
      {/* Barre d’annonce */}
      <div className="w-full text-sm text-white bg-zinc-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between">
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

      {/* Sous-nav partenaires */}
      <div className="w-full bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Logos/mentions à gauche */}
            <nav className="flex-1 overflow-x-auto">
              <ul className="flex items-center gap-6 min-w-max text-zinc-800">
                <li className="font-serif text-lg italic whitespace-nowrap">Friends + Family</li>
                <li className="font-semibold whitespace-nowrap">VOUSCon</li>
                <li className="font-semibold whitespace-nowrap">
                  <span className="tracking-tight">VOUS</span>
                  <span className="ml-2 text-xs tracking-wider uppercase align-top">
                    College of Ministry
                  </span>
                </li>
                <li className="font-semibold whitespace-nowrap">
                  <span className="tracking-tight">VOUS</span> <span className="tracking-tight">MERCH</span>
                </li>
                <li className="flex items-center gap-1 font-semibold whitespace-nowrap">
                  <span className="tracking-tight">VOUS</span>
                  <span className="tracking-tight">WORSHIP</span>
                </li>
              </ul>
            </nav>

            {/* Actions à droite */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/care-request"
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 active:scale-[.99] transition"
              >
                Care Request
              </Link>
              <Link
                to="/connexion"
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 active:scale-[.99] transition"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="w-full bg-rose-50/40">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-5">
            {/* Logo / Accueil */}
            <Link to="/" aria-label="Accueil" className="flex items-center gap-2">
              <div className="text-2xl font-black tracking-tight">VOUS</div>
            </Link>

            {/* Nav centrale */}
            <div className="hidden md:flex">
              <div className="bg-white shadow-sm rounded-2xl ring-1 ring-zinc-100">
                <nav aria-label="Primary" className="px-6">
                  <ul className="flex items-center gap-8 text-base font-semibold text-zinc-900">
                    <li>
                      <Link to="/visit" className="inline-block py-3 hover:opacity-70">
                        Visit VOUS
                      </Link>
                    </li>
                    <li>
                      <Link to="/sermons" className="inline-block py-3 hover:opacity-70">
                        Sermons
                      </Link>
                    </li>
                    <li>
                      <Link to="/crews" className="inline-block py-3 hover:opacity-70">
                        Crews
                      </Link>
                    </li>
                    <li>
                      <Link to="/vision" className="inline-block py-3 hover:opacity-70">
                        Vision
                      </Link>
                    </li>
                    <li>
                      <Link to="/give" className="inline-block py-3 hover:opacity-70">
                        Give
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Boutons menu */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border md:hidden rounded-xl border-zinc-300 hover:bg-white/70"
              >
                <span>Menu</span>
                <HamburgerIcon />
              </button>
              <button
                type="button"
                className="items-center hidden gap-2 text-sm tracking-widest uppercase md:inline-flex text-zinc-900"
              >
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
      className="w-5 h-5"
    >
      <path d="M3 6.75h18v1.5H3zM3 11.25h18v1.5H3zM3 15.75h18v1.5H3z" />
    </svg>
  );
}