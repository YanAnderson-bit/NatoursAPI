import dotenv from 'dotenv';

import app from './app';
import databaseStart from './database/start';
import EnvironmentVariables from './modules/EnvironmentVariables';

dotenv.config();

const port = EnvironmentVariables.getVariable('SERVER_PORT');

databaseStart();

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
