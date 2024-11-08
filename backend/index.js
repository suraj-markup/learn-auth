require('dotenv').config(); 
require('./Models/db');  


const cors=require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser=require('body-parser');
const AuthRouter=require('./Routes/authRouter');
const ProductRouter=require('./Routes/ProductRouter');
const { ensureAuthenticated } = require('./Middleware/Auth');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend origin
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true, // Allow credentials (like cookies)
    optionSuccessStatus: 200,
 };
 
 app.use(cors(corsOptions));
app.use(cookieParser());


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.get('/test',ensureAuthenticated,(req,res)=>{
    res.status(200).json({success:true});
});


app.get('/ping', (req, res) => {
    res.send('Pong ...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
