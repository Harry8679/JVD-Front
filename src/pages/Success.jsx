import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import SomiBuildingUpdate from "../components/SomiBuildingUpdate";

const GOAL_EUR = 32_500_000;
const fmtEUR = (cents) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
    .format((cents || 0) / 100);

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [info, setInfo] = React.useState(null);
  const [err, setErr] = React.useState("");
  const [raised, setRaised] = React.useState(null);

  React.useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const r = await fetch(
          `/.netlify/functions/verify-checkout-session?session_id=${encodeURIComponent(sessionId)}`
        );
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Vérification impossible");
        setInfo(j);
      } catch (e) {
        setErr(e.message);
      }
    })();

    (async () => {
      try {
        const r = await fetch("/.netlify/functions/get-donation-total");
        const j = await r.json();
        setRaised((j.total_cents || 0) / 100);
      } catch (e) {}
    })();
  }, [sessionId]);

  const footnoteGoal = Math.max(GOAL_EUR - (raised ?? 0), 0);

  return (
    <main className="max-w-3xl px-4 py-16 mx-auto">
      <h1 className="text-3xl font-bold">Merci pour votre don 🙏</h1>

      {!sessionId && (
        <>
          <p className="mt-2 text-zinc-600">Identifiant de session manquant.</p>
          <Link to="/je-veux-donner" className="inline-block px-4 py-2 mt-6 font-semibold text-white rounded-md bg-zinc-900">
            Faire un don
          </Link>
        </>
      )}

      {err && (
        <p className="p-3 mt-4 text-sm text-red-700 rounded-md bg-red-50">{err}</p>
      )}

      {!info && !err && sessionId && (
        <p className="mt-4 text-zinc-600">Vérification du paiement en cours…</p>
      )}

      {info && (
        <section className="p-5 mt-6 bg-white rounded-xl ring-1 ring-zinc-200">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-zinc-500">Montant</dt>
              <dd className="text-lg font-semibold">{fmtEUR(info.amount_total)}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Statut</dt>
              <dd className="text-lg font-semibold capitalize">{info.payment_status}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Email</dt>
              <dd className="text-lg">{info.customer_email || "—"}</dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500">Référence</dt>
              <dd className="text-lg">{info.id}</dd>
            </div>
          </dl>

          <div className="flex gap-3 mt-6">
            <Link to="/" className="px-4 py-2 font-semibold text-white rounded-md bg-zinc-900">
              Retour à l’accueil
            </Link>
            <Link to="/je-veux-donner" className="px-4 py-2 font-semibold border rounded-md border-zinc-300">
              Faire un autre don
            </Link>
          </div>
        </section>
      )}

      {raised != null && (
        <div className="mt-12">
          <SomiBuildingUpdate
            raised={Math.round(raised)}
            goal={GOAL_EUR}
            footnoteGoal={Math.round(footnoteGoal)}
          />
        </div>
      )}
    </main>
  );
}