import mongoose from 'mongoose';
import { TruckSchema } from '../models/truckModel.js';
import { handleDuplicateKey } from '../lib/errorHandler.js';

const Truck = mongoose.model('Truck', TruckSchema);

export const addNewTruck = (req, res) => {
  let newTruck = new Truck(req.body);

  newTruck.save((err, truck) => {
    if (err) {
      // MongoError: Duplicate key error
      if (err.code === 11000) {
        handleDuplicateKey(res, err);
      } else {
        res.send(err);
      }
    }
    res.json(truck);
  });
};

export const getTrucks = (req, res) => {
  Truck.find({}, (err, truck) => {
    if (err) {
      res.send(err);
    }
    res.json(truck);
  });
};

export const getTruckWithID = (req, res) => {
  Truck.findById(req.params.truckID, (err, truck) => {
    if (err) {
      res.send(err);
    }
    res.json(truck);
  });
};

export const updateTruck = (req, res) => {
  Truck.findOneAndUpdate(
    { _id: req.params.truckID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, truck) => {
      if (err) {
        res.send(err);
      }
      res.json(truck);
    });
};

export const deleteTruck = (req, res) => {
  Truck.findByIdAndDelete({ _id: req.params.truckID }, (err, truck) => {
    if (err) {
      res.send(err);
    }
    console.log(truck);
    res.json({
      truck,
      message: truck ? 'Successfully deleted truck' : `No truck with ID: ${req.params.truckID}`
    });
  });
};