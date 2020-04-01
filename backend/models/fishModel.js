import { Schema } from 'mongoose';

const fishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

export default fishSchema;
