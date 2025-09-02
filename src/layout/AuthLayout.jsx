const AuthLayout = ({ title, subtitle, children, footer }) => {
    return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-rose-50/40">
        <div className="w-full max-w-md">
            <div className="overflow-hidden bg-white shadow-xl rounded-2xl ring-1 ring-zinc-100">
                <div className="px-6 py-6 sm:px-8">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{title}</h1>
                {subtitle ? (
                <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
                ) : null}
                <div className="mt-6">{children}</div>
                </div>
                {footer ? (
                <div className="px-6 py-4 text-sm border-t sm:px-8 bg-zinc-50 border-zinc-100 text-zinc-700">
                    {footer}
                </div>
                ) : null}
            </div>
        </div>
    </div>
    );
}

export default AuthLayout;