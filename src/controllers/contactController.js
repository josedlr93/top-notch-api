import mongoose from 'mongoose';

import { ContactSchema } from '../models/contactModel.js';
import { handleDuplicateKey } from '../errorHandler.js';
import * as contactService from '../services/contactService.js';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
  try {
    const contact = await contactService.addNewContact(Contact, req.body);
    res.json(contact);
  } catch(err) {
      // MongoError: Duplicate key error
      if (err.code === 11000){
        handleDuplicateKey(res, err);
      } else {
        res.send(err);
      }
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getContacts(Contact);
    res.json(contacts);
  } catch(err) {
    res.send(err);
  }
};

export const getContactWithID = (req, res) => {
  Contact.findById(req.params.contactID, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const updateContact = (req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
};

export const deleteContact = (req, res) => {
  Contact.findByIdAndDelete({ _id: req.params.contactID }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({ 
      contact,
      message: contact ? 'Successfully deleted contact' : `No contact with ID: ${req.params.contactID}` });
  });
};