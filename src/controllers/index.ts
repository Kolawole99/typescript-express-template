import MongoDBController from './MongoDBController';
import SQLNoOracleController from './SQLNoOracleController';

import Constants from '../utilities/Constants';
import { verifyObject } from '../utilities/Utils';

class BaseController {
    databaseType: string;
    databaseName: string;

    constructor({ databaseType, databaseName }: { databaseType: string; databaseName: string }) {
        this.databaseType = databaseType;
        this.databaseName = databaseName;
    }

    public selectDatabase(): IDBControllerConstructor {
        const selectedDatabaseType = Constants.DatabaseTypesAndNames[this.databaseType];

        if (!verifyObject(selectedDatabaseType)) {
            throw new Error(`${this.databaseType} is not a valid database type`);
        }

        console.log('Attempting to select database engine: ', this.databaseName);

        const selectedDatabase = selectedDatabaseType[this.databaseName];

        if (!selectedDatabase) {
            throw new Error(`${this.databaseName} is not a supported database.`);
        }

        console.log('Attempting to select database Controller: ', selectedDatabase);

        const DatabaseControllerMap = {
            [Constants.DatabaseTypesAndNames.NoSQL.MongoDB]: MongoDBController,
            [Constants.DatabaseTypesAndNames.SQL.AmazonRedshift]: SQLNoOracleController,
            [Constants.DatabaseTypesAndNames.SQL.MariaDB]: SQLNoOracleController,
            [Constants.DatabaseTypesAndNames.SQL.MsSQL]: SQLNoOracleController,
            [Constants.DatabaseTypesAndNames.SQL.MySQL]: SQLNoOracleController,
            [Constants.DatabaseTypesAndNames.SQL.PostgreSQL]: SQLNoOracleController,
            [Constants.DatabaseTypesAndNames.SQL.SQLite]: SQLNoOracleController,
        };
        const Controller = DatabaseControllerMap[selectedDatabase];

        if (!Controller) {
            throw new Error(Constants.UNSUPPORTED);
        }

        console.log('Successfully selected controller for:', selectedDatabase);

        return Controller;
    }
}

export default BaseController;
