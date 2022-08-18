type DatabaseTypesAndEngines = {
    [key: string]: DictionaryKeyStringPair;
};

export default {
    AllowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    AppModels: {
        MongoDB: {
            Sample: 'Sample',
        } as DictionaryKeyStringPair,
        MySQL: {} as DictionaryKeyStringPair,
        PostgreSQL: {} as DictionaryKeyStringPair,
    },
    DatabaseTypesAndNames: {
        NoSQL: {
            CouchDB: 'CouchDB',
            ElasticSearch: 'ElasticSearch',
            MongoDB: 'MongoDB',
            Redis: 'Redis',
        },
        SQL: {
            AmazonRedshift: 'AmazonRedshift',
            InMemory: 'InMemory',
            MariaDB: 'MariaDB',
            MsSQL: 'MsSQL',
            MySQL: 'MySQL',
            Oracle: 'Oracle',
            PostgreSQL: 'PostgreSQL',
            SQLite: 'SQLite',
        },
    } as DatabaseTypesAndEngines,
    Environment: {
        production: 'production',
        staging: 'staging',
        test: 'test',
        development: 'development',
    },
    HTTPResponse: {
        Informational: 'Informational',
        Success: 'Success',
        Redirect: 'Redirect',
        ClientError: 'ClientError',
        ServerError: 'ServerError',
    } as DictionaryKeyStringPair,
    MongoDBVersion: '6.0.0', // Minimum MongoDB Version for this project
    MongooseVersion: '6.5.0', // Minimum Mongoose Version for this project
    RequestMaxByteSize: 5242880, // This is representing (5MB/5,120KB) of data in bytes
    UNSUPPORTED: 'Not yet Supported',
};
