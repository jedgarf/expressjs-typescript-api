import * as apiConfig from './api.config';
import * as dbConfig from './db.config';
import * as emailConfig from './email.config';

const combinedConfigs = {
  api: apiConfig,
  db: dbConfig,
  email: emailConfig
};

export default combinedConfigs;