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

    public async createRecord(payload: any): Promise<any> {}

    public async createRecords(payload: any): Promise<any> {}

    public async readRecord(data: object): Promise<object | unknown> {
        try {
            const record = await this.model.findOne(data).setOptions({ sanitizeFilter: true });

            if (record) {
                return parseObject(record);
            }
        } catch (error) {
            return error;
        }
    }

    public async readRecords(payload: {
        data: object;
        skip: number;
        limit: number;
    }): Promise<number | unknown> {
        try {
            const { data, skip, limit } = payload;

            const record = await this.model
                .find(data)
                .setOptions({ sanitizeFilter: true })
                .skip(skip)
                .limit(limit);

            if (record) {
                return parseObject(record);
            }
        } catch (error) {
            return error;
        }
    }

    public async aggregateRecord(payload: any): Promise<any> {}

    public async countRecords(payload: {
        data: object;
        skip: number;
        limit: number;
    }): Promise<number | unknown> {
        try {
            const { data, skip, limit } = payload;

            return await this.model
                .countDocuments(data)
                .setOptions({ sanitizeFilter: true })
                .skip(skip)
                .limit(limit);
        } catch (error) {
            return error;
        }
    }

    public async updateRecord(payload: any): Promise<any> {}

    public async updateRecords(payload: any): Promise<any> {}

    public async softDeleteRecord(payload: any): Promise<any> {}

    public async softDeleteRecords(payload: any): Promise<any> {}

    public async hardDeleteRecord(payload: any): Promise<any> {}

    public async hardDeleteRecords(payload: any): Promise<any> {}
}

export default MongoDBController;
