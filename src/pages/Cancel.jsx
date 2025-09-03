import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <main className="max-w-3xl px-4 py-16 mx-auto">
      <h1 className="text-3xl font-bold">Paiement annulé</h1>
      <p className="mt-2 text-zinc-600">Aucun débit n’a été effectué.</p>
      <Link to="/je-veux-donner" className="inline-block px-4 py-2 mt-6 font-semibold text-white rounded-md bg-zinc-900">
        Réessayer
      </Link>
    </main>
  );
}