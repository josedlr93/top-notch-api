import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const JobSchema = new Schema({
  name: {
    type: String,
    required: 'Name required'
  },
  date: {
    type: Date,
    required: 'Date required'
  },
  trucks: {
    type: Array,
    required: 'trucks required'
  },
  employees: {
    type: Array,
    required: 'employees required'
  },
});