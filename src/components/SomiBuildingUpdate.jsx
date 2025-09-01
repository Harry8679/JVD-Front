import React, { useEffect } from 'react'

const SomiBuildingUpdate = ({
    raised = 7724443, // current amount raised (static for now)
    goal = 32500000, // goal amount displayed on the right
    footnoteGoal = 16250000, // optional footnote line (set null to hide)
    currency = "USD",
    fetchUrl = "",
}) => {
  const [data, setData] = React.useState({ raised, goal, footnoteGoal });
  const [loading, setLoading] = React.useState(false);
  const fmt = new Intl.NumberFormat("fr-FR", {
//   const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    // currency,
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    let active = true;
    async function load() {
    if (!fetchUrl) return;
    try {
        setLoading(true);
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Failed to load totals");
        const json = await res.json();
        if (!active) return;
        setData((d) => ({
            raised: json.raised ?? d.raised,
            goal: json.goal ?? d.goal,
            footnoteGoal: json.footnoteGoal ?? d.footnoteGoal,
        }));
    } catch (e) {
        console.error(e);
    } finally {
        if (active) setLoading(false);
    }
    }
    load();
    return () => {
        active = false;
    };
  }, [fetchUrl]);

  const pct = Math.max(0, Math.min(100, (data.raised / (data.goal || 1)) * 100));

  return (
    <section className="py-10 bg-zinc-700 sm:py-12">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-wide text-center uppercase sm:text-4xl text-zinc-200">
                SOMI BUILDING UPDATE
            </h2>
            {/* Pill bar */}
            <div className="mt-8">
                <div
                    className="relative rounded-full bg-[#ded6cd] ring-1 ring-black/10 shadow-inner h-16 sm:h-20 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={Math.round(pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Building fund progress">
                    {/* Fill */}
                    <div
                        className="absolute inset-y-0 left-0 bg-[#3a3730] border border-black/30 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}/>
                    {/* Center divider */}
                    <div className="absolute -translate-x-1/2 border-l top-2 bottom-2 left-1/2 border-black/20" />


                    {/* Left amount inside the fill */}
                    <div className="absolute -translate-y-1/2 left-6 top-1/2">
                        {loading ? (<div className="w-40 h-6 rounded bg-white/20 animate-pulse" />) : 
                        (<span className="text-xl font-extrabold sm:text-2xl text-zinc-100">
                            {fmt.format(data.raised)}
                        </span>
                        )}
                    </div>


                    {/* Right goal amount */}
                    <div className="absolute -translate-y-1/2 right-6 top-1/2">
                        <span className="text-xl sm:text-2xl font-extrabold text-[#3a3730]">
                            {fmt.format(data.goal)}
                        </span>
                    </div>
                </div>
            </div>
            {/* Footnote */}
            {data.footnoteGoal ? (
                <p className="mt-6 text-sm font-semibold tracking-wide text-center sm:text-base text-zinc-100">
                    *{fmt.format(data.footnoteGoal)} RAISE GOAL
                </p>
                ) : null}
        </div>
    </section>
  )
}

export default SomiBuildingUpdate;