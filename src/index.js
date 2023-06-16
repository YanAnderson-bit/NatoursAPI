require('dotenv').config();
const database = require('./database/start');
const EnvironmentVariables = require('./modules/EnvironmentVariables');
const app = require('./app');

const port = EnvironmentVariables.getVariable('SERVER_PORT');

database.start();

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
