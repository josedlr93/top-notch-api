import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  first_name: {
    type: String,
    required: 'Enter a first name.'
  },
  last_name: {
    type: String,
    required: 'Enter a first name.'
  },
  email: {
    type: String,
    unique: true
  },
  address: {
    type: String
  },
  phone: {
    type: Number
  },
  alt_phone: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});