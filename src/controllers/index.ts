import Constants from '../utilities/Constants';
import MongoDBController from './MongoDBController';
import OracleController from './OracleController';
import RedisController from './RedisController';
import SQLNoOracleController from './SQLNoOracleController';

class BaseController {
    databaseType: string;
    engine: string;

    constructor({ databaseType, engine }: { databaseType: string; engine: string }) {
        this.databaseType = databaseType;
        this.engine = engine;

        this.establishDatabaseConnection();
    }

    public establishDatabaseConnection(): any {
        try {
            console.log('Attempting to select database type: ', this.databaseType);
            const database = this.selectDatabase();

            console.log('Selected database: ', database);
            this.setupDatabase();

            console.log('Attempting database connection');
            return this.connectToDatabase();
        } catch (error) {
            // Replace with observability
            console.log(error);
        }
    }

    private selectDatabase(): any {
        const selectedEngine = Constants.DatabaseTypesAndEngines[this.databaseType];
        if (
            selectedEngine && // Verify database type presence
            Object.keys(selectedEngine).length === 0 && // Verify database type content
            Object.getPrototypeOf(selectedEngine) === Object.prototype // Verify object type
        ) {
            throw new Error(`${this.databaseType} is not a valid database type`);
        }

        console.log('Attempting to select database engine: ', this.engine);

        const collectionDatabase = selectedEngine[this.engine];
        if (!collectionDatabase) {
            throw new Error(`${this.engine} is not a supported database.`);
        }

        console.log('Attempting to select database Controller: ', collectionDatabase);

        const unsupported = 'Not yet Supported';
        const DatabaseControllerMap = {
            [Constants.DatabaseTypesAndEngines.NoSQL.CouchDB]: unsupported,
            [Constants.DatabaseTypesAndEngines.NoSQL.ElasticSearch]: unsupported,
            [Constants.DatabaseTypesAndEngines.NoSQL.Mongo]: MongoDBController,
            [Constants.DatabaseTypesAndEngines.NoSQL.Redis]: RedisController,
            [Constants.DatabaseTypesAndEngines.SQL.AmazonRedshift]: SQLNoOracleController,
            [Constants.DatabaseTypesAndEngines.SQL.MariaDB]: SQLNoOracleController,
            [Constants.DatabaseTypesAndEngines.SQL.MsSQL]: SQLNoOracleController,
            [Constants.DatabaseTypesAndEngines.SQL.MySQL]: SQLNoOracleController,
            [Constants.DatabaseTypesAndEngines.SQL.Oracle]: OracleController,
            [Constants.DatabaseTypesAndEngines.SQL.PostgreSQL]: SQLNoOracleController,
            [Constants.DatabaseTypesAndEngines.SQL.SQLite]: SQLNoOracleController,
        };

        return DatabaseControllerMap[collectionDatabase];
    }

    private setupDatabase() {
        console.log('Mapping database credentials to controller');
    }

    private connectToDatabase() {
        console.log('Connected to database');

        console.log('Failure to connect to database');
    }
}

export default BaseController;
