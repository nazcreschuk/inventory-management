import { config as envConfig } from 'dotenv';

envConfig();

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI
};

export default config;
