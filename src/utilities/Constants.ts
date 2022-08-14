type DatabaseTypesAndEngines = {
    [key: string]: DictionaryKeyStringPair;
};

export default {
    AllowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    AppModels: {
        MDBSample: 'MDBSample',
    } as DictionaryKeyStringPair,
    DatabaseTypesAndEngines: {
        NoSQL: {
            CouchDB: 'CouchDB',
            ElasticSearch: 'ElasticSearch',
            Mongo: 'MongoDB',
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
    MongooseVersion: '6.4.0', // Minimum Mongoose Version for this project
    RequestMaxByteSize: 5242880, // This is representing (5MB/5,120KB) of data in bytes
    UNSUPPORTED: 'Not yet Supported',
};
