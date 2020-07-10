import mongoose from 'mongoose';
import { ContactSchema } from './contactModel.js';

const Schema = mongoose.Schema;

// copy all from contact schema
export const EmployeeSchema = new Schema(ContactSchema)
  .add({
    admin: {
      type: Boolean,
      default: false
    },
    has_CDL: {
      type: Boolean,
      default: false
    }
  });