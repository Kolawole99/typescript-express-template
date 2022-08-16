/**
 * This handles all the required model configuration and instantiations for the application.
 * @module MODELS:Index
 */
import { resolve } from 'path';

import { Glob, Mongoose } from '../utilities/PackageWrapper';

class InstantiateMongoDB {
    constructor() {}

    /**
     *
     * Mongoose opens a connection to MongoDB using the APP_DB_URI parameter which is a MongoDB connection string.
     * This method creates the model schema and verifies that our application connects to the provided MongoDB instance.
     *
     */
    async openConnection(DB_URL: string) {
        try {
            console.log('Attempting to connect to MongoDB');

            await Mongoose.connect(DB_URL, {
                autoIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as Mongoose.ConnectOptions);

            console.log('MongoDB connection successful');
        } catch (error) {
            console.log(error);
        }
    }

    /**
     *
     * Recursively loads all model definition files in the mongodb models folder into the app.
     *
     */
    async loadModels() {
        try {
            console.log('Loading MongoDB model directory');

            const basePath = resolve(__dirname, '../models/mongodb');
            const files = Glob.sync('*.js', { cwd: basePath });

            console.log('Initializing MongoDB models');

            files.forEach((file: string) => {
                require(resolve(basePath, file));
            });

            console.log('Loaded MongoDB models', Mongoose.modelNames());
        } catch (error) {
            console.log(error);
        }
    }
}

export { InstantiateMongoDB };
