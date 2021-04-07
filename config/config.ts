import dotenv from 'dotenv';

dotenv.config();

// INTERFACE TO STRONGLY TYPE

interface CustomEnv {
  app: {
    host: string;
    protocol: string;
    port: number;
  }
  email: {
    address: string,
    refereshToken: string,
    clientSecret: string,
    clientId: string,
  }
}


// ENVIRONMENTS

const dev: CustomEnv = {
  app: {
    host: '0.0.0.0',
    protocol: 'http',
    port: 3333,
  },
  email: {
    address: process.env.EMAIL as string,
    clientId: process.env.EMAIL_CLIENT_ID as string,
    clientSecret: process.env.EMAIL_CLIENT_SECRET as string,
    refereshToken: process.env.EMAIL_REFRESH_TOKEN as string,
  },
  // db: {
  //   host: '127.0.0.1',
  //   user: 'gideon',
  //   password: process.env.DB_PASSWORD as string,
  //   schema: 'SCHEMA_TEMPLATE',
  // }
};

// const sandbox: CustomEnv = {

// };

// const production:CustomEnv = {

// };


// CONFIGURING EXPORT - other files don't have to worry about which env is set

const env = process.env.NODE_ENV || 'dev';

const config: Record<string, CustomEnv> = {
  dev,
  // sandbox,
  // prod,
};

export default config[env];