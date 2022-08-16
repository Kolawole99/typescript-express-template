/**
 *
 * This handles all the abstraction of the methods Mongoose uses to interface with MongoDB.
 * @module CONTROLLER:MongoDBController
 */

import Constants from '../utilities/Constants';
import { Mongoose } from '../utilities/PackageWrapper';
import { parseObject } from '../utilities/Utils';

class MongoDBController implements IDBController {
    model: any;

    constructor(modelName: string) {
        this.init(modelName);
    }

    private init(modelName: string): void {
        try {
            if (Mongoose.version < Constants.MongooseVersion) {
                throw new Error(`Mongoose version ${Mongoose.version} is not supported.`);
            }

            if (!modelName || !Constants.AppModels.MongoDB[modelName]) {
                throw new Error('Cannot Instantiate, as this is an invalid application model name');
            }

            this.setModel(modelName);
        } catch (error) {
            console.log(error);
        }
    }

    private setModel(modelName: string) {
        this.model = Mongoose.model(modelName);
    }

    public async createRecord(payload: any): Promise<any> {}

    public async createRecords(payload: any): Promise<any> {}

    public async readRecord(data: object): Promise<object | unknown> {
        try {
            const filter = this.model.sanitizeFilter(data);

            return parseObject(await this.model.findOne(filter));
        } catch (error) {
            return error;
        }
    }

    public async readRecords(payload: any): Promise<any> {}

    public async aggregateRecord(payload: any): Promise<any> {}

    public async countRecords(payload: {
        data: object;
        skip: number;
        limit: number;
    }): Promise<number | unknown> {
        try {
            const { data, skip, limit } = payload;

            return await this.model
                .countDocuments({ ...data })
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
