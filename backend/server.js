require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const shortCode = "4699156";
const passkey = "YG5/fvQcGbTlP/LzgpBWaTkdglPLuVJZ+jgEjcFPaoBLnL7koQsC6LOniZf7APzcoUGT9qkGwvR8KSvCAobmR2l7eUarvQKoQk6Lws95mA0G0R7c7IdmkPGoOlvNTGYz/H5wcl+QiFRpA7DEolYw1hbUUrfCUsWFKzDQ7lj/YuJDl3BFR2nAR5zsYquFe7jtRvmmQUdeu2AiLi8WstXqY1hJtihZz1+BtS3djeJZYaEBb6PZlwYqCq+vQTbDiZHLCyIlrUOWwi+zyREyHLRqyGakpi8VH1JLc6lNzZDMZBXKDoOxLtYzw7o1CW0vbPwucRhIk7kieezWzIy/ks2ZkQ==";
const consumerKey = "3nzJZtPlAKIkGGFAtM4gWlmWbcjx0eMSDvFU9VPsROpAUkjo";
const consumerSecret = "gvleGEAsAePYfgHglEXx0011AIKfkGH2es5KglNb2UkrhZLkNDkGnBxrDo7NRYDR";
const callbackURL = "https://nnecfaorg.vercel.app/callback";

async function getAccessToken() {
    const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
        auth: { username: consumerKey, password: consumerSecret },
    });
    return response.data.access_token;
}

app.post("/stkpush", async (req, res) => {
    const { phone, amount, document } = req.body;
    const timestamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");
    const accessToken = await getAccessToken();

    const stkPushPayload = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: callbackURL,
        AccountReference: document,
        TransactionDesc: `Payment for ${document}`,
    };

    try {
        const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", stkPushPayload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        res.json({ success: true, checkoutRequestID: response.data.CheckoutRequestID });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.get("/payment-status", async (req, res) => {
    res.json({ success: true }); // Simulated success response
});

app.listen(3000, () => console.log("Server running on port 3000"));
