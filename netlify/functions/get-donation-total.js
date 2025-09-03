// netlify/functions/get-donation-total.js
const Stripe = require("stripe");

exports.handler = async () => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    let total = 0;
    let count = 0;

    // On utilise charges.list + auto-paging
    // Pas de paramètre "payment_status" (ça n'existe pas) et "status" n'est pas accepté ici.
    // On filtre en code: status === 'succeeded', paid true, non remboursé, currency === 'eur'
    const iter = stripe.charges.list({ limit: 100 });

    for await (const ch of iter.autoPagingEach ? iter.autoPagingEach() : iter) {
      if (
        ch.status === "succeeded" &&
        ch.paid === true &&
        ch.refunded === false &&
        ch.currency?.toLowerCase() === "eur"
      ) {
        total += ch.amount; // en cents
        count += 1;
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total_cents: total, count }),
    };
  } catch (err) {
    console.error("get-donation-total error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "internal_error" }),
    };
  }
};