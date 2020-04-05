import express from 'express';
import location from './location';
import weather from './weather';

const router = express.Router();

router.use('/location', location);
router.use('/weather', weather);

export default router;