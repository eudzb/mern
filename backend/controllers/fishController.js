import mongoose from 'mongoose';
import fishSchema from '../models/fishModel';

const Fish = mongoose.model('Fish', fishSchema);

export const addFish = (req, res) => {
  let fish = new Fish(req.body);
  fish.save((err, savedFish) => {
    if (err) {
      res.send(err);
    }
    res.json(savedFish);
  });
};

export const updateFish = (req, res) => {
  Fish.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, fishUpdated) => {
    if (err) {
      res.send('An error occured while trying to get the fish');
    }

    res.json(fishUpdated);
  });
};

export const deleteFish = (req, res) => {
  Fish.remove({ _id: req.params.id }, err => {
    if (err) {
      res.send('An error occured while trying to get the fish');
    }

    res.send('The fish has been correctly deleted !');
  });
};

export const getAllFish = (req, res) => {
  Fish.find({}, (err, fishes) => {
    if (err) {
      res.send('An error occured while trying to get fishes');
    }

    res.send(fishes);
  });
};
