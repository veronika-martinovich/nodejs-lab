import lastRatingsService from '../resources/last-ratings/last-ratings.service';

const cron = require('node-cron');

export const lastRatingsJob = cron.schedule('0 0 * * 1', () => {
  lastRatingsService.cleanUpOld();
});
