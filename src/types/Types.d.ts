import Express from 'express';

import BaseController from '../controllers/index';

declare global {
    type Controller = BaseController;
    interface DBController {
        createRecord(request: any): Promise<any>;
        createRecords(request: any): Promise<any>;
        readRecord(request: any): Promise<any>;
        readRecords(request: any): Promise<any>;
        countRecords(request: any): Promise<any>;
        updateRecord(request: any): Promise<any>;
        updateRecords(request: any): Promise<any>;
        deleteRecord(request: any): Promise<any>;
        deleteRecords(request: any): Promise<any>;
    }
    type DictionaryKeyStringPair = {
        [key: string]: string;
    };
    type NextFunction = Express.NextFunction;
    type Response = Express.Response;
    type Request = Express.Request;
    type RequestHandler = {
        request: Request;
        response: Response;
        next: NextFunction;
    };
    type StringObjectType = string | object;
}
