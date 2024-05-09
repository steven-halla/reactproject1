// Specify Stripe secret api key here
const stripe = require("stripe")("sk_test_51KNY88CtkgS34zHnd7PAu9ta7AzrrKpss5fDcW0tWVqHSSE7Nk72LJkuC1IODBHlkC5aa8tXD7SNHscxMN84SjPk00BXM5Ye9R");
// Create a PaymentIntent with the order amount and currency
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1200, // Specify amount here
  currency: "usd" // Specify currency here
});
// Return client secret
res.send({
  clientSecret: paymentIntent.client_secret
});