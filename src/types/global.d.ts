import { Kafka, Redis } from '../utilities/PackageWrapper';

declare global {
    type ArrayOfStrings = Array<string>;

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

    type responseBody = string | object;
}

export {};
