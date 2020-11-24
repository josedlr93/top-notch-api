import mongoose from 'mongoose';

import { TruckSchema } from '../models/truckModel.js';
import * as truckService from '../services/truckService.js';

const Truck = mongoose.model('Truck', TruckSchema);

export const addNewTruck = async (req, res, next) => {
  try {
    const truck = await truckService.addNewTruck(Truck, req.body);
    res.json(truck);
  } catch (err) {
    next(err);
  }
};

export const getTrucks = async (req, res, next) => {
  try {
    const trucks = await truckService.getTrucks(Truck);
    res.json(trucks);
  } catch (err) {
    next(err);
  }
};

export const getTruckWithID = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckWithID(Truck, req.params.truckID);
    res.json(truck);
  } catch (err) {
    next(err);
  }
};

export const updateTruck = async (req, res, next) => {
  try {
    const truck = await truckService.updateTruck(Truck, req.params.truckID, req.body);
    res.json(truck);
  } catch (err) {
    next(err);
  }
};

export const deleteTruck = async (req, res, next) => {
  try {
    const truck = await truckService.deleteTruck(Truck, req.params.truckID);
    res.json({
      truck,
      message: truck ? 'Successfully deleted truck' : `No truck with ID: ${req.params.truckID}`
    });
  } catch (err) {
    next(err);
  }
};