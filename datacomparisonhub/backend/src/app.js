const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

const { initialData } = require('./models/initialData.model')
const { processHistoricalData } = require('./models/dataProcessor.model');
const { availableCountry } = require('./models/availableCountry.model');


app.use(cors({
    origin: ['http://localhost:3000', 'https://welfredk.github.io'],
    
}));
app.use(morgan('combined'));

app.use(express.json());

app.get('/getInitialData', async (req, res) => {
    const data = await initialData();
    res.status(200).json(data);
});

app.get('/availableCountry', (req, res) => {
    res.status(200).json(availableCountry);
});


app.post('/getNewData', async (req, res) => {
    const data = await processHistoricalData({
        countries: req.body.country,
        startYear: req.body.startYear
    });
    res.status(200).json(data);
});



module.exports = app;