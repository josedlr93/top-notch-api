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
  assigned_trucks: {
    type: [Object],
  },
  assigned_employees: {
    type: [Object],
  },
});