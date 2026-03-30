import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';
import urlRoutes from './routes/urlRoutes'

const app = express();

//Middleware nya guys
app.use(express.json());        
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/api', urlRoutes)


export default app;