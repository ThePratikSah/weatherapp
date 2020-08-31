const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : "Purnia";
  const appId = "7fbb24a1367fd89b6b51c41e0a81b431";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + appId + "&units=metric";
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.send(`<img src=${imgUrl}><br>Working! Temp in ${location} is ${temp} and the weather is ${weatherData.weather[0].description}`);
    })
  })
})

app.listen(80)