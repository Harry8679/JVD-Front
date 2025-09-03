// netlify/functions/get-donation-total.js
const Stripe = require("stripe");

exports.handler = async () => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    let total = 0; // en cents
    let count = 0;
    let starting_after;

    do {
      const page = await stripe.charges.list({
        limit: 100,
        starting_after,
      });

      for (const ch of page.data) {
        // Garde seulement les paiements réussis, non remboursés, en EUR
        if (ch.status === "succeeded" && ch.paid && !ch.refunded && ch.currency?.toLowerCase() === "eur") {
          // (Optionnel) filtrer seulement tes dons, si tu mets "product_name" dans metadata côté Checkout Session
          // if (ch.metadata?.product_name !== "don-ponctuel") continue;

          total += ch.amount; // total en cents
          count += 1;
        }
      }

      starting_after = page.has_more ? page.data[page.data.length - 1].id : undefined;
    } while (starting_after);

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