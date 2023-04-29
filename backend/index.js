import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/db.js';
import SequelizeStore from 'connect-session-sequelize';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db });

// (async () => {
// 	await db.sync();
// })();

app.use(
	session({
		secret: process.env.SESS_SECRET,
		resave: false,
		saveUninitialized: true,
		store,
		cookie: {
			secure: 'auto',
		},
	})
);
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(authRoutes);

// store.sync();

app.listen(process.env.APP_PORT, () => {
	console.log('Server up and running...');
});
