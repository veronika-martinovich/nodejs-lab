import { DBConnect } from './helpers/DBConnect';
import { lastRatingsJob } from './jobs/last-ratings';
import { server } from './index';

const { PORT } = require('./config');

const port = PORT || 3000;

DBConnect().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${port}`);
      lastRatingsJob.start();
    });
  }
});

export { server };
