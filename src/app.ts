import { Express } from './utilities/PackageWrapper';
import ApplicationRoutes from './routes/index';
import Constants from './utilities/Constants';

const { NODE_ENV, PORT, APP_NAME } = process.env;

const app = Express();

/** Setup the application middlewares */
app.use(
    Express.json({
        limit: Constants.RequestMaxByteSize,
    })
);
app.use(
    Express.urlencoded({
        extended: true,
        limit: Constants.RequestMaxByteSize,
        parameterLimit: 200,
    })
);

/** Setup the application credentials  */
/** Setup observability in the application  */
/** Setup database connection  */
/** Setup models and controllers  */

/** Setup application routing */
app.use('/', ApplicationRoutes);

/** Setup application server */
const APP_PORT: number = parseInt(<string>PORT, 10);
app.listen(APP_PORT, () => {
    if (NODE_ENV === 'development') {
        console.log(`🔥 Development Server is running at http://localhost:${APP_PORT} 👍`);
    } else {
        console.log(`😃 ${APP_NAME as string} is LIVE on port ${APP_PORT}. 👍`);
    }
});
