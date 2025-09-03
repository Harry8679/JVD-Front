// src/pages/Give.jsx
import React from "react";
import SomiBuildingUpdate from "../components/SomiBuildingUpdate";

const initial = {
  amount: 20,
  email: "",
  product_name: "don-ponctuel",
  metadata: {
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
    adresse_2: "",
    code_postal: "",
    ville: "",
    pays: "France",
  },
};

export default function Give() {
  const [form, setForm] = React.useState(initial);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [raised, setRaised] = React.useState(null); // total € déjà collecté

  // Charger le total (simple agrégat Stripe)
  React.useEffect(() => {
    fetch("/.netlify/functions/get-donation-total")
      .then((r) => r.json())
      .then((d) => {
        if (d?.total_cents != null) setRaised(d.total_cents / 100);
      })
      .catch(() => {});
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    if (name in form.metadata) {
      setForm((f) => ({ ...f, metadata: { ...f.metadata, [name]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: name === "amount" ? Number(value) : value }));
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        amount: String(form.amount),
        email: form.email,
        product_name: form.product_name,
        metadata: Object.fromEntries(
          Object.entries(form.metadata).map(([k, v]) => [k, String(v ?? "")])
        ),
      };

      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Impossible de créer le paiement");
      // Redirection vers Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl px-4 py-10 mx-auto">
      <h1 className="text-3xl font-bold">Faire un don</h1>
      <p className="mt-1 text-zinc-600">Merci pour votre générosité 🙏</p>

      <form onSubmit={onSubmit} className="grid gap-4 mt-8 md:grid-cols-2">
        {error ? (
          <div className="p-3 text-sm text-red-700 rounded-md md:col-span-2 bg-red-50">
            {error}
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-medium">Montant (€)</label>
          <input
            type="number"
            name="amount"
            min={1}
            step={1}
            value={form.amount}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            placeholder="vous@example.com"
            required
          />
        </div>

        {/* product_name (fixe ici) */}
        <input type="hidden" name="product_name" value={form.product_name} />

        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            name="nom"
            value={form.metadata.nom}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Prénom</label>
          <input
            name="prenom"
            value={form.metadata.prenom}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Téléphone</label>
          <input
            name="telephone"
            value={form.metadata.telephone}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            placeholder="0600000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Adresse</label>
          <input
            name="adresse"
            value={form.metadata.adresse}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Adresse 2 (optionnel)</label>
          <input
            name="adresse_2"
            value={form.metadata.adresse_2}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Code postal</label>
          <input
            name="code_postal"
            value={form.metadata.code_postal}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Ville</label>
          <input
            name="ville"
            value={form.metadata.ville}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Pays</label>
          <input
            name="pays"
            value={form.metadata.pays}
            onChange={update}
            className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 font-semibold text-white rounded-md bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? "Redirection vers Stripe…" : "Donner"}
          </button>
        </div>
      </form>

      {/* Bloc de suivi (optionnel) */}
      {raised != null ? (
        <div className="mt-12">
          <SomiBuildingUpdate raised={Math.round(raised * 100) / 100} goal={32500} footnoteGoal={16250000} />
        </div>
      ) : null}
    </main>
  );
}
