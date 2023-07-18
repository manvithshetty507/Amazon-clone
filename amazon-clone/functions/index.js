/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51NV05wSA8giEP6SWssq7cVLipQGF2Qtf69C2OHy5j0sGFMkxABPu0hPF8ErlyJg9DC4L6PTL61LMFRVGhLr2Pp7v004UsJfzhj')

//API

//App config
const app = express();

//Middlewares
app.use(cors({origin: true}));
app.use(express.json());

//Api routes
app.get('/', (request, response) => response.status(200).send('hello world4'));
app.post('/payment/create' , async (request, response) => {
    const total = request.query.total;

    console.log('BOOM!! ' , total);

    const paymentIntent = await ((total > 0) && stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
        payment_method: ['card'],
        description: 'Purchase of XYZ product',
    }));

    if (paymentIntent && paymentIntent.status === "requires_payment_method") {
        // Handle the case where a payment method is required
        // You can prompt the user to enter their payment details or use an existing payment method
        console.log("Payment method is required.");
        // Your code for handling the payment method requirement
      } else {
        // Handle other cases or proceed with payment confirmation
        console.log("PaymentIntent status:", paymentIntent.status);
        // Your code for payment confirmation or other logic
      }

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app);

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
