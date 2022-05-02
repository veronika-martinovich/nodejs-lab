import { DBConnect } from './helpers/DBConnect';
import { lastRatingsJob } from './jobs/last-ratings';
import { server } from './index';

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

DBConnect().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    server.listen(port, host, () => {
      console.log(`Server is running on port ${port}`);
      lastRatingsJob.start();
    });
  }
});

export { server };
