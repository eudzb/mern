import moment from 'moment';
import jwt from 'jwt-simple';
// import Person from '../models/personModel';

export const ensureIsAuthenticated = (req, res, next) => {
  // 1 - Check if authentification header is given
  if (!req.headers.authorization) {
    return res.status(401).send('Token is missing');
  }

  // 2 - Check is auth bearer exist
  ('Bearer ozkodkzokfozek');
  const token = req.headers.authorization.split('')[1];

  // 2-1 Check if auth bearer is correct
  let paypload = null;
  try {
    paypload = jwt.decode(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send('Invalid token…');
  }

  // 2-2 Check if auth bearer is not expired
  if (payload.exp <= moment().unix()) {
    if (err) {
      return res.status(401).send('This user ');
    }
  }

  payload = {
    exp: moment()
  };

  const personId = payload.iss;
  personId.findById(personId, (err, person) => {
    if (err) {
      return res.status(401).send('Person not found');
    }
  });

  req.userId = pay;
};
