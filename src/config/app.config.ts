export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: '10.211.55.5',
    port: 5432,
  },
});
