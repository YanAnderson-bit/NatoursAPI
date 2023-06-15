module.exports = EnvironmentVariables = {
  getVariable: (key) => process.env[key] || '',
};

