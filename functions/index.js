// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const SECRET_KEY =
  "sk_test_51HQ5UXAOBzJpPKFIkVoUWVPYtiV7AKYe98415fwjcelNgUG5fyHM8PntA2ALRh27WAm7gDA2AsmBbhNrfbAP3D4i006nl76gK0";
const stripe = require("stripe")(SECRET_KEY);

//app config
const app = express();

//middlewares
app.use(cors({ origin: true }));
app.use(express.json()); //send data as json format

//endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total; //or req.params

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  //Ok - Created, send client secret on /post request
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//listen

// const port = 9001;
// app.listen(port, () => `Server running on localhost: ${port}`);

//run backend express through cloud function
exports.api = functions.https.onRequest(app);
