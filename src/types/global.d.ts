import { Express, Kafka, Mongoose, Redis } from '../utilities/PackageWrapper';

declare global {
    /** Data structures */
    type ArrayOfStrings = Array<string>;
    type ArrayOfObjects = Array<object>;
    type DictionaryKeyStringPair = {
        [key: string]: string;
    };
    type ObjectOfObject = {
        [key: string]: Object;
    };
    type StringObjectType = string | object;

    /** Controller typings */
    interface IDBController {
        createRecord(request: any): Promise<any>;
        createRecords(request: any): Promise<any>;
        readRecord(request: any): Promise<any>;
        readRecords(request: any): Promise<any>;
        countRecordsByFilter(request: any): Promise<any>;
        countAllModelRecords(request: any): Promise<any>;
        updateRecord(request: any): Promise<any>;
        updateRecords(request: any): Promise<any>;
        updateRecordByReplacing(request: any): Promise<any>;
        softDeleteRecord(request: any): Promise<any>;
        softDeleteRecords(request: any): Promise<any>;
        hardDeleteRecord(request: any): Promise<any>;
        hardDeleteRecords(request: any): Promise<any>;
        totalHardDeleteRecord(request: any): Promise<any>;
        totalHardDeleteRecords(request: any): Promise<any>;
    }
    interface IDBControllerConstructor {
        new (value: string): IDBController;
    }

    /** Kafka typings */
    type Kafka = Kafka.Kafka;
    type KafkaMessage = Kafka.KafkaMessage;
    type KafkaConsumerEachMessagePayload = {
        topic: string;
        partition: number;
        message: KafkaMessage;
    };
    interface KafkaTopicConfiguration extends Kafka.ITopicConfig {}

    /** Mongoose and MongoDB typings */
    type MongooseModel = typeof Mongoose.Model;

    /** Redis typings */
    type RedisClientType = ReturnType<typeof Redis.createClient>;
    type RedisClientOptions = Parameters<typeof Redis.createClient>[0];

    /** Express typings */
    type ENextFunction = Express.NextFunction;
    type EResponse = Express.Response;
    type ERequest = Express.Request;
    type RequestHandler = {
        request: ERequest;
        response: EResponse;
        next: ENextFunction;
    };

    type responseBody = string | object;
}

export {};
