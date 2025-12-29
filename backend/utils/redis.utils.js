import { createClient } from 'redis';

const client = createClient({
  //   url: 'redis://localhost:6379',
  url: process.env.REDIS_URL,
});

client.on('error', (error) => console.log('Redis Client Error ⚠️ : ', error));

await client.connect();
console.log('🚀 Redis Engine: Connected and Ready');

export default client;
