import { Schema } from 'mongoose';

const user = new Schema({
  userName: {
    type: String,
    required: true
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
});

export default user;
