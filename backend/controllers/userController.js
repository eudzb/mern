import mongoose from 'mongoose';
import userSchema from '../models/userModel';

const User = mongoose.model('User', userSchema);

export const getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
