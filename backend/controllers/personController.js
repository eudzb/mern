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
  const paswword = req.body.paswword;
  bcrypt.compare(paswword, person.paswword, function (error, sucess) {
    if (sucess) {
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

// export const signUp = async (req, res) => {
//   let person = new Person(req.body);

//   try {
//     let createPerson = await person.save((err, createdPerson) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json(createdPerson);
//     });
//     res.json(createPerson);
//   } catch (err) {
//     res.send('An error occured');
//   }
//   res.send(person);
// };

export const signUp = (req, res) => {
  let person = new Person(req.body); // ici peut etre
  console.log('person =>', person); // ça tourne à l'infini encore :'(
  person.save((err, savedPerson) => {
    console.log(err);
    if (err) {
      console.log('an error occured', err);
      res.send(err);
    }

    console.log(savedPerson);
    res.json(savedPerson);
    // c'est pire là haha
    // les autres methodes marchent ?
    // oui
    // les méthodes avec user marche (post, get, delete, put) attend attend, viens avec moi
    // personModel.js
  });
};

export const getAllPerson = async (req, res) => {
  const users = await Person.find();
  res.json(users);
};
