import { Morgan, Winston } from '../utilities/PackageWrapper';
import { verifyObject, verifyString } from '../utilities/Utils';

const { APP_NAME, NODE_ENV } = process.env;

type logParam = { message: string; body?: object };

/**
 *
 * This class and the associated method is used for application wide logging.
 * This class seeks to implement itself as a container for logging
 * and the single source of truth for the whole application logging activities.
 *
 */
class AppLogger {
    Logger: any = null;
    morganMiddleware: any = null;

    constructor() {
        this.setUpObservabilitySuite();
        this.setUpWinston();
        this.setUpMorgan();
    }

    private setUpObservabilitySuite() {}

    /** This method initializes and configures Winston for the application logging */
    private setUpWinston() {
        const { createLogger, format, transports } = Winston;
        const { combine, colorize, timestamp, printf, label, uncolorize } = format;

        const myCustomLevels = {
            levels: {
                error: 0,
                warn: 1,
                info: 2,
                http: 3,
                verbose: 4,
                debug: 5,
            },
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'green',
                http: 'magenta',
                verbose: 'blue',
                debug: 'white',
            },
        };

        Winston.addColors(myCustomLevels.colors);

        const outputFormat = combine(
            uncolorize(),
            label({ label: `[${APP_NAME}]` }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS A' }),
            printf((info) => `${info.timestamp} ${info.label} ${info.level} ${info.message}`)
        );

        const appTransport =
            NODE_ENV === 'development'
                ? [
                      new transports.Console({
                          format: combine(colorize({ all: true })),
                      }),
                      new transports.File({
                          format: format.json(),
                          filename: 'logs/combined.log',
                      }),
                  ]
                : [new transports.Http({ format: format.json() })];

        // Create the logger instance that has to be exported and used to log messages.
        this.Logger = createLogger({
            level: 'debug',
            levels: myCustomLevels.levels,
            format: outputFormat,
            transports: appTransport,
        });
    }

    /** This method initializes and configures Morgan for the application request logging */
    private setUpMorgan() {
        const stream: Morgan.StreamOptions = {
            write: (message) => this.http({ message }), // Use the Winston http severity
        };

        // Customizing log format for Morgan
        const prodFormat =
            '[:date[web] :remote-addr :remote-user ] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms | :referrer - :user-agent';

        const morganFormat = NODE_ENV === 'production' ? prodFormat : 'dev';

        // Build the morgan middleware using the settings
        this.morganMiddleware = Morgan.default(morganFormat, { stream });
    }

    /** This method wraps and adds the morgan middleware into the application */
    public logRequest() {
        if (!this.morganMiddleware) {
            this.setUpMorgan();
        }

        return this.morganMiddleware;
    }

    /** This method validates that the parameters sent to the logger is valid for logging */
    private verifyLogParam({ message, body }: logParam) {
        if (verifyString(message) && !body) {
            return true;
        } else if (verifyString(message) && body && verifyObject(body)) {
            return true;
        } else {
            return false;
        }
    }

    /** This method logs an error in the application */
    public error({ message, body }: logParam) {
        if (this.verifyLogParam({ message, body })) {
            this.Logger.error(message);
        }
    }

    /** This method logs a warning message in the application */
    public warn({ message, body }: logParam) {
        if (this.verifyLogParam({ message, body })) {
            this.Logger.warn(message);
        }
    }

    /** This method logs an information */
    public info({ message, body }: logParam) {
        if (this.verifyLogParam({ message, body })) {
            this.Logger.info(message);
        }
    }

    /** This method logs an information with more details not covered in the info type log */
    public verbose({ message, body }: logParam) {
        if (this.verifyLogParam({ message, body })) {
            this.Logger.verbose(message);
        }
    }

    /** This method logs application http requests */
    private http({ message, body }: logParam) {
        if (this.verifyLogParam({ message, body })) {
            this.Logger.http(message.trim());
        }
    }

    /** This method of logging is used for debugging while developing in the application */
    public debug({ message, body }: logParam) {
        if (this.verifyLogParam({ message, body })) {
            this.Logger.debug(message);
        }
    }
}

const Logger = new AppLogger();

export default Logger;
