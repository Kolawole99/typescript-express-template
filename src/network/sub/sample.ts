import { KafkaClient, RedisClient } from '..';

const redisClient: RedisClientType = RedisClient.createOrGetClient() as unknown as RedisClientType;
const Subscriber = redisClient.duplicate();
Subscriber.connect();

const subscribeToArticle = async () => {
    await Subscriber.subscribe('article', (message) => {
        console.log(message);
    });
};

Subscriber.pSubscribe('SERVICE_NAME*', (message: string, channel) => {
    console.log(message, channel); // 'message', 'channel'
    switch (channel) {
        case 'SERVICE_NAME_A':
            handleChannelA(message);
            break;
        case 'SERVICE_NAME_B':
            handleChannelB(message);
            break;
    }
});

const handleChannelA = async (message: string) => {
    console.log(message);
};

const handleChannelB = async (message: string) => {
    console.log(message);
};

const kafkaClient: Kafka = KafkaClient.createOrGetClient() as unknown as Kafka;
const ordersConsumer = kafkaClient.consumer({ groupId: 'orders' });
ordersConsumer.connect();
ordersConsumer.subscribe({ topic: 'orderCreated', fromBeginning: true });

const notificationConsumer = kafkaClient.consumer({ groupId: 'notifications' });
notificationConsumer.connect();
notificationConsumer.subscribe({ topic: 'orderSuccessful', fromBeginning: true });

const processConsumer = async () => {
    await ordersConsumer.run({ eachMessage: handleKafkaA });

    await notificationConsumer.run({ eachMessage: handleKafkaA });
};

const handleKafkaA = async ({ topic, partition, message }: KafkaConsumerEachMessagePayload) => {
    console.log(`Handling a new message`, {
        topic,
        partition,
        message: {
            offset: message.offset,
            headers: message.headers,
            value: message.value?.toString(),
        },
    });
};
