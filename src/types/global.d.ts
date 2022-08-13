import BaseController from '../controllers/index';
import { Express, Kafka, Redis } from '../utilities/PackageWrapper';

declare global {
    type ArrayOfStrings = Array<string>;

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

    /** Kafka typings */
    type Kafka = Kafka.Kafka;
    type KafkaMessage = Kafka.KafkaMessage;
    type KafkaConsumerEachMessagePayload = {
        topic: string;
        partition: number;
        message: KafkaMessage;
    };
    interface KafkaTopicConfiguration extends Kafka.ITopicConfig {}

    /** Redis typings */
    type RedisClientType = ReturnType<typeof Redis.createClient>;
    type RedisClientOptions = Parameters<typeof Redis.createClient>[0];

    /** Express typings */
    type NextFunction = Express.NextFunction;
    type Response = Express.Response;
    type Request = Express.Request;
    type RequestHandler = {
        request: Request;
        response: Response;
        next: NextFunction;
    };

    type responseBody = string | object;

    type StringObjectType = string | object;
}

export {};
