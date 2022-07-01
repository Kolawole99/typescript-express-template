import RedisClient from '..';

// function asyncProcessEvent(name: string): Promise<string> {
//     /**
//      * call ServiceB to run some different business logic
//      */
//     let snsClient = new AWS.SNS();
//     let params = {
//         Message: JSON.stringify({
//             event: 'service-a-event',
//         }),
//         TopicArn: 'our-sns-topic-message-broker',
//     };

//     return snsClient.publish(params).then((response) => {
//         return response.MessageId;
//     });
// }

const publishArticleToRedis = async () => {
    const article = {
        id: '123456',
        name: 'Using Redis Pub/Sub with Node.js',
        blog: 'Logrocket Blog',
    };

    const client: RedisClientType = (await RedisClient.createOrGetRedisClient()) as RedisClientType;
    const Publisher = client.duplicate();
    await Publisher.connect();

    await Publisher.publish('article', JSON.stringify(article));
};
