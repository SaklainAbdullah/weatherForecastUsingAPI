const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){

    response.sendFile(__dirname+"/index.html");
   //response.send("Server is running");

});

app.post("/",function(request,response){
   //var city = request.body.city;
   const query = request.body.city;
   const appid = "bc13548f6bc88458841b32e677871aa1";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+appid;
   https.get(url,function(response2){
      response2.on("data",function(data){
         const weatherData = JSON.parse(data);
         const temp =  weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         response.write("<p>The weather is currently "+weatherDescription+" </p>");
         response.write("<h1>The temparature in "+query+" is "+temp+"</h1>");

         response.send();
         //const temp = weatherData.main.temp;
        //response.send("Temparature is "+temp-273);
      })
   })
});

/*const query = "chittagong";
const appid = "bc13548f6bc88458841b32e677871aa1";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+appid;
https.get(url,function(response2){
   response2.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp =  weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      response.write("<p>The weather is currently "+weatherDescription+" </p>");
      response.write("<h1>The temparature in chittagong is "+temp+"</h1>");

      response.send();
      //const temp = weatherData.main.temp;
     //response.send("Temparature is "+temp-273);
   })
})*/

app.listen(3000,function(){
  console.log("port 3000");
});
