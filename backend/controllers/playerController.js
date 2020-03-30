import mongoose from 'mongoose';
import playerSchema from '../models/playerModel';

const Player = mongoose.model('Player', playerSchema);

export const add = (req, res) => {
  let newPlayer = new Player(req.body);
  newPlayer.save((err, createdPlayer) => {
    if (err) {
      console.log('Error has occured ');
    }
    res.json(createdPlayer);
  });
};

export const getAll = (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      res.send('an error occured…');
    } else {
      res.send(players);
    }
  });
};
