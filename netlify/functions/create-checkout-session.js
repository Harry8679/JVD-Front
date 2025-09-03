// netlify/functions/create-checkout-session.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { amount, email, product_name = "don-ponctuel", metadata = {} } =
      JSON.parse(event.body || "{}");

    const amountCents = Math.round(Number(amount) * 100);
    if (!amountCents || amountCents < 100) {
      throw new Error("Montant invalide (minimum 1 €).");
    }

    // Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: product_name },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      // Toutes les valeurs doivent être des strings
      metadata: Object.fromEntries(
        Object.entries({ product_name, ...metadata }).map(([k, v]) => [
          k,
          String(v ?? ""),
        ])
      ),
      billing_address_collection: "required",
      success_url: `${process.env.SITE_URL || "http://localhost:3000"}/don/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL || "http://localhost:3000"}/don/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }),
    };
  }
};