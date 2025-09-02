import React from 'react'
import AuthLayout from '../layout/AuthLayout';

const Register = () => {
  const [showPwd, setShowPwd] = React.useState(false);
  const [showPwd2, setShowPwd2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const firstName = f.get("firstName");
    const lastName = f.get("lastName");
    const email = f.get("email");
    const password = f.get("password");
    const confirm = f.get("confirm");
    const terms = f.get("terms");

    try {
if (!terms) throw new Error("Vous devez accepter les conditions.");
if (password !== confirm) throw new Error("Les mots de passe ne correspondent pas.");
if (!email || !password) throw new Error("Champs requis manquants.");
// TODO: call your API to create the account
await new Promise((r) => setTimeout(r, 700));
console.log("Registered!", { firstName, lastName, email });
// navigate("/login");
    } catch (err) {
    setError(err.message || "Échec de l’inscription");
    } finally {
    setLoading(false);
    }
  }
  return (
    <AuthLayout
        title="Créer un compte"
        subtitle="Rejoignez la communauté."
        footer={
        <div className="text-sm">
            Déjà inscrit ? {" "}
            <a href="/connexion" className="font-semibold hover:underline">Se connecter</a>
        </div>
        }
    >
        <form onSubmit={onSubmit} className="space-y-4">
            {error ? (
            <p className="p-2 text-sm text-red-600 rounded-md bg-red-50">{error}</p>
            ) : null}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-800">Prénom</label>
                    <input id="firstName" name="firstName" required className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-800">Nom</label>
                    <input id="lastName" name="lastName" required className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500" />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-800">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500" placeholder="vous@example.com" />
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-800">Mot de passe</label>
                    <button type="button" onClick={() => setShowPwd((s) => !s)} className="text-xs text-zinc-600 hover:underline">
                        {showPwd ? "Masquer" : "Afficher"}
                    </button>
                </div>
                <input id="password" name="password" type={showPwd ? "text" : "password"} minLength={8} required className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500" placeholder="Au moins 8 caractères" />
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="confirm" className="block text-sm font-medium text-zinc-800">Confirmer le mot de passe</label>
                    <button type="button" onClick={() => setShowPwd2((s) => !s)} className="text-xs text-zinc-600 hover:underline">
                    {showPwd2 ? "Masquer" : "Afficher"}
                    </button>
                </div>
            <input id="confirm" name="confirm" type={showPwd2 ? "text" : "password"} required className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500" placeholder="Répétez le mot de passe" />
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" name="terms" className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20" />
            J’accepte les conditions d’utilisation
            </label>
            <button type="submit" disabled={loading} className="w-full rounded-md bg-zinc-900 text-white px-4 py-2.5 font-semibold hover:bg-zinc-800 disabled:opacity-50">
            {loading ? "Création du compte…" : "S’inscrire"}
            </button>
        </form>
    </AuthLayout>
  )
}

export default Register;