/**
 *
 * This introduces the concept of "network/external communication" to the application.
 * It handles the changes where the application needs to communicate externally and may be synchronous or asynchronous.
 *
 * SYNCHRONOUS:
 * The application will wait for the response from the server this takes place in the http folder.
 *
 * ASYNCHRONOUS:
 * The application will not wait for the response from the server this takes place in the pub and sub folders.
 * Pub for sending and Sub for receiving.
 *
 *
 * Client implementation for:
 * Apache Kafka - Pub/Sub system. Persistent. Large Amounts of Data. 1M messages/sec scale. 1:N consumers.
 * Redis - Caching and Scalability, In-memory store or Short-lived Messages. 1M messages/sec scale. 1:1 or 1:N consumers.
 * RabbitMQ - Message based communication. Persistent and Transient store. Complex Routing. 50K messages/sec scale. 1:1 or 1:N consumers.
 *
 */

import { Redis } from '../utilities/PackageWrapper';

class RedisClient {
    static connection: RedisClientType;

    constructor() {}

    static async createOrGetRedisClient(): Promise<RedisClientType | undefined> {
        try {
            const options: RedisClientOptions = {
                url: 'redis://alice:foobared@awesome.redis.server:6380',
            };

            if (!this.connection) {
                const Connection = Redis.createClient(options);

                await Connection.connect();

                Connection.on('error', (err) => console.log('Redis Client Connection Error', err));

                Connection.on('ready', () => console.log('Redis Client Connection Ready'));

                this.connection = Connection;
            }

            return this.connection;
        } catch (error) {
            // Log Errors
        }
    }
}

export default RedisClient;
