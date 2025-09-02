import React from 'react'
import AuthLayout from '../layout/AuthLayout';

const Login = () => {
  const [showPwd, setShowPwd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");


    try {
    // TODO: replace with real auth call
    await new Promise((r) => setTimeout(r, 600));
    if (!email || !password) throw new Error("Veuillez renseigner vos identifiants.");
    // redirect after success (example with window or router)
    // navigate("/");
    console.log("Logged in!", { email });
    } catch (err) {
    setError(err.message || "Échec de connexion");
    } finally {
    setLoading(false);
    }
  }
  return (
    <AuthLayout
        title="Se connecter"
        subtitle="Accédez à votre espace."
        footer={
            <div className="flex items-center justify-between">
                <a href="#" className="hover:underline">Mot de passe oublié ?</a>
                <a href="/inscription" className="font-semibold hover:underline">Pas de compte ? S’inscrire</a>
            </div>
        }
    >
        <form onSubmit={onSubmit} className="space-y-4">
            {error ? (
            <p className="p-2 text-sm text-red-600 rounded-md bg-red-50">{error}</p>
            ) : null}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-800">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required
                className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500"
                placeholder="vous@example.com"/>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-zinc-800">Mot de passe</label>
                    <button type="button" onClick={() => setShowPwd((s) => !s)} className="text-xs text-zinc-600 hover:underline">
                        {showPwd ? "Masquer" : "Afficher"}
                    </button>
                </div>
                <input id="password" name="password" type={showPwd ? "text" : "password"} autoComplete="current-password"
                required minLength={8}
                className="w-full px-3 py-2 mt-1 border rounded-md border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-500"
                placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
                <input type="checkbox" name="remember" className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20" />
                Se souvenir de moi
                </label>
            </div>
            <button type="submit" disabled={loading}
            className="w-full rounded-md bg-zinc-900 text-white px-4 py-2.5 font-semibold hover:bg-zinc-800 disabled:opacity-50">
                {loading ? "Connexion…" : "Se connecter"}
            </button>
        </form>
    </AuthLayout>
  )
}

export default Login;