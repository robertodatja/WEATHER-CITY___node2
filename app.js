const  ekspres = require("express");
const  https = require("https");
const  appi = ekspres();

const  bodyParser= require("body-parser");
appi.use(bodyParser.urlencoded({extended: true}));



//1. The client by typing localhost:3000 in the browser, practically is making a req to our-server.
So he is going to render in index.html by calling appi.post in the route
appi.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});



//2. Catching the req  by using  appi.post()
appi.post("/", function(req, res){

  const query = req.body.cityName; //3. Body parser allows to fetch the data based in the name of input
  const apiKey = "930b121f932b22e6f0bd6ef98df54570";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){ //4. Getting the dynamic data based on what user typed into input

    response.on("data", function(data){
      const weatherData = JSON.parse(data); //5.Converting into JS Object
      //6. Catching particular properties
      const temperature = weatherData.main.temp ;
      console.log(temperature);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //7.Sending response to the Client by using Node and Express
      res.write("<p> The weather is currently " + description + "</p>");
      res.write("<h1> The temperature in "+query+" is " +temperature+ " degrees Celcius.</h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });

  });

});





/*-------------------Port---------------------------------------*/
appi.listen("3000", function(){
  console.log("Serveri is working on port 3000");
});
