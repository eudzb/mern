import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

const personSchema = new Schema({
  firstName: {
    type: String,
    unique: true,
    required: true
  },
  lastName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save', function (next) {
  var person = this;
  if (!person.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(person.password, salt, function (err, hash) {
      person.password = hash;
      next();
    });
  });
});

export default mongoose.model('Person', personSchema);
