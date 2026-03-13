const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.static("public"));

app.post("/checkout", async (req, res) => {

const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",
line_items: [
{
price: "price_XXXXXXXX", 
quantity: 1
}
],
success_url: "https://yourdomain.com/success",
cancel_url: "https://yourdomain.com"
});

res.json({ url: session.url });

});

app.listen(3000, () => console.log("Server running"));