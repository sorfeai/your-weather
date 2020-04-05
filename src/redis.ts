import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL || 6379;

export const client = redis.createClient(REDIS_URL as any);