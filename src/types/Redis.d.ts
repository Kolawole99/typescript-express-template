import { Redis } from '../utilities/PackageWrapper';

export {};

type responseBody = string | object;

declare global {
    type RedisClientType = ReturnType<typeof Redis.createClient>;
    type RedisClientOptions = Parameters<typeof Redis.createClient>[0];
}
