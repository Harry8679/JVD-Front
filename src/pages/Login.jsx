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
                <a href="/register" className="font-semibold hover:underline">Pas de compte ? S’inscrire</a>
            </div>
        }
    >

    </AuthLayout>
  )
}

export default Login;