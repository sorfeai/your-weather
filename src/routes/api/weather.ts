import express from 'express';
import { client } from '../../redis';
import { RequestMethod, IWeatherResponse } from './types';
import { promisifyHttpRequest } from './utils';
import { API_HOST, API_PORT, API_WEATHER } from './meta';
import { cache } from '../../middleware';

const router = express.Router();

async function getWeather(woeid: string) {
  const data = await promisifyHttpRequest<IWeatherResponse>(
    API_HOST,
    API_PORT,
    `${API_WEATHER}/${woeid}`,
    RequestMethod.GET
  );

  // caching response
  const serializedData = JSON.stringify(data);
  client.setex(woeid, 1000, serializedData);

  return data;
}

router.get('/:woeid', cache('woeid'), async (req, res, next) => {
  const { woeid } = req.params;

  try {
    const data = await getWeather(woeid);
    return res.json(data);
  } catch (err) {
    next(err);
  }
})

export default router;