import { KafkaClient, RedisClient } from '..';

const publishArticleToRedis = async () => {
    const article = {
        id: '123456',
        name: 'Using Redis Pub/Sub with Node.js',
        blog: 'Logrocket Blog',
    };

    const redisClient: RedisClientType = (await RedisClient.createOrGetClient()) as RedisClientType;
    const Publisher = redisClient.duplicate();
    await Publisher.connect();

    await Publisher.publish('article', JSON.stringify(article));
};

const processProducer = async () => {
    const msg = JSON.stringify({ customerId: 1, orderId: 1 });

    const kafkaClient: Kafka = (await KafkaClient.createOrGetClient()) as Kafka;
    const producer = kafkaClient.producer();
    await producer.connect();

    await producer.send({
        topic: 'orderCreated',
        messages: [{ value: msg }],
    });

    await producer.send({
        topic: 'orderSuccessful',
        messages: [{ value: msg }],
    });
};
