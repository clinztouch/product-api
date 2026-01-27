export const configuration = () => ({
  database: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product_api',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    expiresIn: process.env.JWT_EXPIRES || '1d',
  },
  port: parseInt(process.env.PORT || '3000', 10),
});
