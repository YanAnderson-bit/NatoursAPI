require('dotenv').config();

const EnvironmentVariables = require('./modules/EnvironmentVariables.js');
const app = require('./app')

const port = EnvironmentVariables.getVariable('SERVER_PORT');

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
