import express from 'express';
import { RequestMethod, ILocationResponse } from './types';
import { API_HOST, API_PORT, API_LOCATION } from './meta';
import { promisifyHttpRequest } from './utils';
import { client } from '../../redis';
import { cache } from '../../middleware';

const router = express.Router();

async function getLocation(latt: string, long: string) {
  const data = await promisifyHttpRequest<ILocationResponse>(
    API_HOST,
    API_PORT,
    `${API_LOCATION}/?lattlong=${latt},${long}`,
    RequestMethod.GET
  );

  // caching response
  const serializedData = JSON.stringify(data);
  client.setex(`${latt},${long}`, 1000, serializedData);

  return data;
}

router.get('/', cache('lattlong', true), async (req, res, next) => {
  const { lattlong } = req.query;

  if (lattlong === undefined) {
    next(new Error('lattlong query param is required'));
  }

  try {
    const [latt, long] = (lattlong as string).split(',');
    const data = await getLocation(latt, long);
    return res.json(data);
  } catch (err) {
    next(err);
  }
})


export default router;