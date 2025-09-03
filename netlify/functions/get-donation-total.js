// netlify/functions/get-donation-total.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    // Récupère toutes les sessions "paid"
    const iterator = stripe.checkout.sessions.list({
      limit: 100,
      payment_status: "paid",
    }).autoPagingIterator();

    let total = 0;
    for await (const s of iterator) {
      // Filtrage optionnel : seulement ton "produit"
      if (s.metadata?.product_name === "don-ponctuel") {
        total += s.amount_total || 0;
      }
    }

    return { statusCode: 200, body: JSON.stringify({ total_cents: total }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};