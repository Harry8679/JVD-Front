// netlify/functions/verify-checkout-session.js
const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const qs = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};
    const sessionId = qs.session_id || body.session_id;
    if (!sessionId) {
      return { statusCode: 400, body: JSON.stringify({ error: "missing_session_id" }) };
    }

    // On récupère la session + quelques détails utiles
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "line_items", "customer"],
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: session.id,
        payment_status: session.payment_status,     // 'paid' attendu
        amount_total: session.amount_total,         // en cents
        currency: session.currency,                 // 'eur'
        customer_email: session.customer_details?.email || session.customer?.email || null,
        metadata: session.metadata || {},
        line_items: (session.line_items?.data || []).map(li => ({
          description: li.description,
          quantity: li.quantity,
          amount_subtotal: li.amount_subtotal,
          currency: li.currency
        })),
        payment_intent_status: session.payment_intent?.status || null,
      }),
    };
  } catch (err) {
    console.error("verify-checkout-session error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};