import { Schema } from 'mongoose';

messages: {
  const MessageSchema = new Schema({
    type: String,
    required: true
  },
  username: { type: Schema.Type.objectId, ref: 'User' }
});

export default MessageSchema;
