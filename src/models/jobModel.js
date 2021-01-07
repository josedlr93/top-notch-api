import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const JobSchema = new Schema({
  name: {
    type: String,
    required: 'Name required'
  },
  date: {
    type: Date,
    required: 'Date required',
    expires: '90 days'
  },
  assigned_trucks: [{
    truck_num: Number,
    cdl_required: Boolean
  }],
  assigned_employees: [{
    first_name: String,
    last_name: String,
  }],
});