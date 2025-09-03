// netlify/functions/get-donation-total.js
const Stripe = require("stripe");

exports.handler = async () => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    let total = 0;   // en centimes
    let count = 0;

    // Async iterator natif : pas besoin d'autoPagingEach
    for await (const ch of stripe.charges.list({ limit: 100 })) {
      if (
        ch.status === "succeeded" &&
        ch.paid === true &&
        ch.refunded === false &&
        (ch.amount_captured ?? ch.amount) > 0 &&
        (ch.currency || "").toLowerCase() === "eur"
      ) {
        total += ch.amount; // centimes
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message || "internal_error" }),
    };
  }
};