import { Express, Kafka, Mongoose, Redis } from '../utilities/PackageWrapper';

declare global {
    type ArrayOfStrings = Array<string>;

    interface IDBController {
        createRecord(request: any): Promise<any>;
        createRecords(request: any): Promise<any>;
        readRecord(request: any): Promise<any>;
        readRecords(request: any): Promise<any>;
        aggregateRecord(request: any): Promise<any>;
        countRecords(request: any): Promise<any>;
        updateRecord(request: any): Promise<any>;
        updateRecords(request: any): Promise<any>;
        softDeleteRecord(request: any): Promise<any>;
        softDeleteRecords(request: any): Promise<any>;
        hardDeleteRecord(request: any): Promise<any>;
        hardDeleteRecords(request: any): Promise<any>;
    }
    interface IDBControllerConstructor {
        new (value: string): IDBController;
    }

    type DictionaryKeyStringPair = {
        [key: string]: string;
    };

    /** Kafka typings */
    type Kafka = Kafka.Kafka;
    type KafkaMessage = Kafka.KafkaMessage;
    type KafkaConsumerEachMessagePayload = {
        topic: string;
        partition: number;
        message: KafkaMessage;
    };
    interface KafkaTopicConfiguration extends Kafka.ITopicConfig {}

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

    type StringObjectType = string | object;
}

export {};
