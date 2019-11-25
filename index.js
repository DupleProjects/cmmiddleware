// jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({ type: 'application/json'}));

app.post("/notify",function(req,res){

  var results = req.body.status;
  var user_id = req.body.m_payment_id;

  var baseUrl = "https://creator.zoho.com/api/dupletech/json/creating-millionaires/form/Subscriptions/record/add";
  var options = {
    url:baseUrl,
    method:"POST",
    qs:{
      authtoken:"faafd2c544bc60e3932dc3fcc58b43af",
      scope:"creatorapi",
      test:user_id,
    }
  };

  var baseUrl2 = "https://creator.zoho.com/api/dupletech/json/creating-millionaires/form/User_Profile/record/update";
  var options2 = {
    url:baseUrl2,
    method:"POST",
    qs:{
      authtoken:"faafd2c544bc60e3932dc3fcc58b43af",
      scope:"creatorapi",
      criteria:"ID=" + user_id,
      User_Type:"Trader",
      User_Status:"Active"
    }
  };

  request(options,function(error, response, body){

    //Security Check 1: Check if the host initiating the API call is from Payfast
    if(["www.payfast.co.za","w1w.payfast.co.za","w2w.payfast.co.za","sandbox.payfast.co.za","localhost:3000"].indexOf(req.headers.host) !== -1){
      request(options2,function(error, response, body){
        res.status(200);
        res.send(user_id);
      });
    }
    else{
      res.status(400).send("Not allowed!!");
    }
});

});



//Local Testing only
app.listen(6000,function(){
  console.log("Server is running on port 6000");
});
