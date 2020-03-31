import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';

const ensureIsAuthentificated = (req, res, next) => {
  // 1 - Check if authentification header is given
  if (!req.headers.autoriation) {
    return res.status(401).send('token is missing');
  }

  // 2 - Check if auth bearer
  const token = req.headers.autoriation.split(' ')[1];

  // 2-1 Check if auth bearer is correct
  var payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send('Token expired');
  }

  const personId = payload.iss;

  Person.findById(personId, (err, person) => {
    if (err) {
      return res.status(401).send('PersonNotFound');
    }
    req.userId = personId;
    next();
  });
};

export default ensureIsAuthentificated;
