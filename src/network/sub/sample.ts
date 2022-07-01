import RedisClient from '..';

const client: RedisClientType = RedisClient.createOrGetRedisClient() as unknown as RedisClientType;
const Subscriber = client.duplicate();

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
