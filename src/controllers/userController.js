import { readFileSync } from 'fs';

const users = JSON.parse(readFileSync(`${__dirname}/users.json`, 'utf-8'));

export default {
  getUsers: (req, res) =>
    res.status(200).json({ results: users.length, users }),

  getUser: (req, res) => {
    const userId = req.params.id;
    const user = users.find((item) => item._id === userId);
    if (!user) return res.status(404).json({ status: 'fail' });
    return res.status(200).json({ status: 'success', user });
  },

  updateUser: (req, res) => {},
  createUser: (req, res) => {},
  deleteUser: (req, res) => {},
};
