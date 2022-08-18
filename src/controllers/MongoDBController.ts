/**
 *
 * This handles all the abstraction of the methods Mongoose uses to interface with MongoDB.
 * @module CONTROLLER:MongoDBController
 */

import Constants from '../utilities/Constants';
import { Mongoose } from '../utilities/PackageWrapper';
import { parseObject } from '../utilities/Utils';

class MongoDBController implements IDBController {
    model!: MongooseModel;

    constructor(modelName: string) {
        this.init(modelName);
    }

    /**
     * This method initializes the Model controller by:
     * 1. Verifying that the model is registered in the application.
     * 2. Retrieving the MongoDB instance of the Model using Mongoose so we can get the required methods.
     */
    private init(modelName: string): void {
        try {
            if (!modelName || !Constants.AppModels.MongoDB[modelName]) {
                throw new Error('Cannot Instantiate, as this is an invalid application model name');
            }

            this.model = Mongoose.model(modelName);
        } catch (error) {
            console.log(error);
        }
    }

    /** Helper method to process all class errors from Mongoose or MongoDB */
    private processError(error: any): { name: string; failed: boolean; error: string } {
        let message;

        const { name, code, keyPattern } = error;

        if (name === 'MongoServerError' && code && code === 11000) {
            const keys = Object.keys(keyPattern).join(',');

            message = `Entry already exist for ${keys} `;
        } else if (name === 'ValidationError') {
            if (error.errors[Object.keys(error.errors)[0]].properties) {
                const { type, path } = error.errors[Object.keys(error.errors)[0]].properties;

                message = `Validation failed for field ${path} (${type}) `;
            }

            const { kind, value, path } = error.errors[Object.keys(error.errors)[0]];

            message = `Validation failed for field ${path} (${value}) instead of ${kind} `;
        } else {
            message = `Controller Error:: ${error.message}`;
        }

        return { name, failed: true, error: message };
    }

    /** This method accepts an object and uses it to creates a record */
    public async createRecord(data: object): Promise<object> {
        try {
            const record = await this.model.create(data);

            return parseObject(record);
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method accepts an array of objects and uses it to creates multiple records */
    public async createRecords(data: ArrayOfObjects): Promise<object> {
        try {
            const record = await this.model.create(data);

            return parseObject(record);
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method fetches the first document matching the provided filter */
    public async readRecord(data: object): Promise<object> {
        try {
            const record: object = await this.model
                .findOne(data)
                .setOptions({ sanitizeFilter: true });

            return parseObject(record);
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method takes in a filter and some properties such as skip, limit and returns all matching documents  */
    public async readRecords(payload: {
        data: object;
        fieldsToReturn?: string | object;
        sortOptions?: string;
        skip?: number;
        limit?: number;
    }): Promise<object> {
        try {
            const {
                data,
                fieldsToReturn = '',
                sortOptions = '',
                skip = 0,
                limit = Number.MAX_SAFE_INTEGER,
            } = payload;

            const record: any[] = await this.model
                .find({ ...data }, fieldsToReturn)
                .setOptions({ sanitizeFilter: true })
                .skip(skip)
                .limit(limit)
                .sort(sortOptions);

            return parseObject(record);
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method counts all the document in this collection that matches the provided filter */
    public async countRecordsByFilter(data: object): Promise<object> {
        try {
            return {
                count: await this.model.countDocuments(data).setOptions({ sanitizeFilter: true }),
            };
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method counts all the document in this collection. This does not accept a filter */
    public async countAllModelRecords(): Promise<object> {
        try {
            return {
                count: await this.model.estimatedDocumentCount(),
            };
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method updates the first document matching the provided filter */
    public async updateRecord(payload: { conditions: object; dataToSet: object }): Promise<object> {
        try {
            const { conditions, dataToSet } = payload;

            const result = await this.model
                .updateOne(
                    { ...conditions },
                    {
                        ...dataToSet,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /** This method updates all the documents matching the provided filter */
    public async updateRecords(payload: {
        conditions: object;
        dataToSet: object;
    }): Promise<object> {
        try {
            const { conditions, dataToSet } = payload;

            const result = await this.model
                .updateMany(
                    { ...conditions },
                    {
                        ...dataToSet,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method overwrites the total values of the first document matching the query completely with the new data.
     * Only use this method when you do not care about the previous data stored for the filter(that is you want to upsert the previous value).
     */
    public async updateRecordByReplacing(payload: {
        conditions: object;
        dataToSet: object;
    }): Promise<object> {
        try {
            const { conditions, dataToSet } = payload;

            const result = await this.model
                .replaceOne(
                    { ...conditions },
                    {
                        ...dataToSet,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method sets "isActive = false" for the first document matching the provided filter.
     *
     * This is a form of in application Trash where you can send documents to.
     * We advise you use this always for easy data restoration.
     */
    public async softDeleteRecord(conditions: object): Promise<object> {
        try {
            const result = await this.model
                .updateOne(
                    { ...conditions },
                    {
                        isActive: false,
                        isDeleted: false,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method sets "isActive = false" for all the documents matching the provided filter.
     *
     * This is a form of in application Trash where you can send documents to.
     * We advise you use this always for easy data restoration.
     */
    public async softDeleteRecords(conditions: object): Promise<object> {
        try {
            const result = await this.model
                .updateMany(
                    { ...conditions },
                    {
                        isActive: false,
                        isDeleted: false,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method sets:
     *
     *  1. "isActive=false"
     *  2. "isDeleted=true"
     *
     * On the first document matching the provided filter.
     *
     * This is a clearing of the application Trash. Data reaches the end of life here.
     * End users can no longer access this data at this stage although it is still in the database.
     */
    public async hardDeleteRecord(conditions: object): Promise<object> {
        try {
            const result = await this.model
                .updateOne(
                    { ...conditions },
                    {
                        isActive: false,
                        isDeleted: true,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method sets:
     *
     *  1. "isActive=false"
     *  2. "isDeleted=true"
     *
     * On all the documents matching the provided filter.
     *
     * This is a clearing of the application Trash. Data reaches the end of life here.
     * End users can no longer access this data at this stage although it is still in the database.
     */
    public async hardDeleteRecords(conditions: object): Promise<object> {
        try {
            const result = await this.model
                .updateMany(
                    { ...conditions },
                    {
                        isActive: false,
                        isDeleted: true,
                        $currentDate: { updatedOn: true },
                    }
                )
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method deletes the first document matching the provided filter from the collection storage.
     *
     * This is an actual delete in the storage delete sense, it is a permanent delete.
     * You better know what you are doing before you use this method, as why would you want to dig up the dead.
     * In fact, you are advised not to use this method at all unless the world is coming to an end.
     */
    public async totalHardDeleteRecord(conditions: object): Promise<object> {
        try {
            const result = await this.model
                .deleteOne(conditions)
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }

    /**
     * This method deletes all the documents matching the provided filter from the collection storage.
     *
     * This is an actual delete in the storage delete sense, it is a permanent delete.
     * You better know what you are doing before you use this method, as why would you want to dig up the dead.
     * In fact, you are advised not to use this method at all unless the world is coming to an end.
     */
    public async totalHardDeleteRecords(conditions: object): Promise<object> {
        try {
            const result = await this.model
                .deleteMany(conditions)
                .setOptions({ sanitizeFilter: true });

            return parseObject(result);
        } catch (error) {
            return this.processError(error);
        }
    }
}

export default MongoDBController;
