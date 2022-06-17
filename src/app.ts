import express from 'express';

import ApplicationRoutes from './routes/index';

const { NODE_ENV, PORT, APP_NAME } = process.env;

const app = express();

app.use('/', ApplicationRoutes);

const APP_PORT: number = parseInt(<string>PORT, 10);
app.listen(APP_PORT, () => {
    if (NODE_ENV === 'development') {
        console.log(`🔥 Development Server is running at http://localhost:${APP_PORT} 👍`);
    } else {
        console.log(`😃 ${APP_NAME as string} is LIVE on port ${APP_PORT}. 👍`);
    }
});
