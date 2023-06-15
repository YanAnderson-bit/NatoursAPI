module.exports = {
  getVariable: (key) => process.env[key] || '',
};
