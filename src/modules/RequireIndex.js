import requireindex from 'requireindex';

export default (directory) => {
  const directoryFiles = requireindex(directory);
  return Object.keys(directoryFiles).reduce((memo, key) => {
    memo[key] = directoryFiles[key].default;
    return memo;
  }, {});
};
