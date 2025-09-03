// netlify/functions/get-donation-total.js
const Stripe = require("stripe");

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })
  : null;

exports.handler = async () => {
  try {
    if (!stripe) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "No STRIPE_SECRET_KEY" }),
      };
    }

    let total = 0;
    let starting_after;

    do {
      const page = await stripe.paymentIntents.list({
        limit: 100,
        ...(starting_after ? { starting_after } : {}),
      });

      for (const pi of page.data) {
        // On additionne uniquement les paiements réussis en EUR
        if (pi.status === "succeeded" && pi.currency === "eur") {
          total += pi.amount_received || 0;
        }
      }

      starting_after = page.has_more
        ? page.data[page.data.length - 1].id
        : undefined;
    } while (starting_after);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total_cents: total }),
    };
  } catch (err) {
    console.error("get-donation-total error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};