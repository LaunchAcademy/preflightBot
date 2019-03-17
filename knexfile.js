module.exports = {
  development: {
    client: 'pg',
    connection: { user: '', password: '', database: 'preflight_dev' }
  },
  test: {
    client: 'pg',
    connection: { user: '', password: '', database: 'preflight_test' }
  },
  production: { client: 'pg', connection: process.env.DATABASE_URL }
};