const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');




const orderRoute = require('./api/routes/order');
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');


require('./db');



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));



app.use('/order', orderRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);





const PORT = 3000;

app.listen(PORT, console.log('server started...'));