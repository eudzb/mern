import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';

export const signIn = async (req, res) => {
  //1 check if email exist
  const person = await Person.findOne({ email: req.body.email });

  //2 if exist, compare pwd with bcrypt
  if (!person) {
    return res.send('this user does not exist');
  }

  // user exist
  const password = req.body.password;
  console.log(password);

  bcrypt.compare(password, person.password, function (error, success) {
    if (success) {
      console.log(person.password);
      const payload = {
        exp: moment.add(1, 'hour').unix(),
        iat: moment.unix(),
        iss: person.id
      };

      // 3 generate jwt token
      let token = jwt.encode(payload, process.env.TOKEN_SECRET);

      // return a person
      res.json({
        firstName: person.firstName,
        lastName: person.lastName,
        token: `Bearer ${token}`,
        expiration: moment().add(1, 'hour').format('YYY-MM-DD HH:mm')
      });
    }
    res.send('this email and password combination is incorrect');
  });
};

export const signUp = (req, res) => {
  let person = new Person(req.body);
  person.save((err, savedPerson) => {
    if (err) {
      res.send(err);
    }
    res.json(savedPerson);
  });
};

export const getAllPerson = async (req, res) => {
  const users = await Person.find();
  res.json(users);
};
