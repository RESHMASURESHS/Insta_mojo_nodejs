const express = require("express");
const Insta = require("instamojo-nodejs");
const bodyParser = require("body-parser");


const API_KEY = "2ea6603b64979008faf3a86544671e92";

const AUTH_KEY = "82c7750d5d3c78b35f63af8d9d5b9c99";

Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());
const PORT = process.env.PORT || 3009;


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  
  
  app.post("/pay", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var amount = req.body.amount;
  
    var data = new Insta.PaymentData();

const REDIRECT_URL = "http://localhost:3009/success";

data.setRedirectUrl(REDIRECT_URL);
data.send_email = true;
data.purpose = "react js coures"; // REQUIRED

    data.amount = amount;
    data.name = name;
    data.email = email; // REQUIRED
    
  
    Insta.createPayment(data, function (error, response) {
      if (error) {
        // some error
      } else {
        // Payment redirection link at response.payment_request.longurl
        res.send("Please check your email to make payment")
      }
    });
  });
  app.get('/success',(req,res)=>{
      res.send('payment for successful')
  })
  
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });