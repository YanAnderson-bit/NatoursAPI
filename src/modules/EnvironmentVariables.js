export default {
  getVariable: (key) => process.env[key] || '',
};
