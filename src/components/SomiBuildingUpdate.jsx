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
  const fmt = new Intl.NumberFormat("fr-US", {
//   const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
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
        </div>
    </section>
  )
}

export default SomiBuildingUpdate;