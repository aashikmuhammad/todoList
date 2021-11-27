import express from 'express';
import './data/db/mongoose.js';
import apiRoutes from './data/API/apiRoutes.js';
import cookieParser from 'cookie-parser';
import jwt from 'express-jwt';
import config from './config.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:5000'],
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(jwt({
    secret: config.jwt.secret,
    algorithms:['HS256'],
    credentialsRequired: false,
    getToken: req => req?.cookies?.auth
}))
apiRoutes(app);

app.listen(5000, () => {
    console.log('Server is up on PORT: ', 5000)
})