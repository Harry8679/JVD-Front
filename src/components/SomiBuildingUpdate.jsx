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
  return (
    <div>SomiBuildingUpdate</div>
  )
}

export default SomiBuildingUpdate;