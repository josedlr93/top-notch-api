import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TruckSchema = new Schema({
  truck_num: {
    type: Number,
    required: 'Enter truck number.',
    unique: true
  },
  vin: {
    type: String,
    unique: true,
    minlength: 17,
    maxlength: 17
  },
  plate_num: {
    type: String,
    unique: true
  },
  cdl_required: {
    type: Boolean,
    required: 'Indicate if CDL required.'
  },
  service_date: {
    type: Date
  }
});