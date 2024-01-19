import express from 'express';
import axios from 'axios';
import https from 'https';
import fs from 'fs';

const app = express();
const port = 3000;

const params = {
    params: {
        lat: 52.267977,
        lon: 10.504225,
        appid: "cb5355e40e984d4ba29e1c21558cede2"
    }
};

app.use(express.static('/public'));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get('https://api.openweathermap.org/data/3.0/onecall', params);
        res.render('index.ejs', {
            temp: Math.round((result.data.daily[1].temp.day - 273.15)*10) / 10,
            weather: result.data.daily[1].weather[0].main,
            summary: result.data.daily[1].summary,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
