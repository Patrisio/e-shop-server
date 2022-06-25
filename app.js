const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routers/products');
require('dotenv/config');

const PORT = 3001;

const app = express();

const api = process.env.API_URL;
const connectionString = process.env.CONNECTION_STRING;

app.use(cors);
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

app.use(`${api}/products`, productsRouter);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database',
})
    .then(() => {
        console.log('SUCCESS CONNECTIONS');
    })
    .catch((err) => {
        console.log(err);
    });


app.listen(PORT, () => {
    console.log(`App is listening localhost:${PORT}`);
});