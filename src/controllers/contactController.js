import mongoose from 'mongoose';

import { ContactSchema } from '../models/contactModel.js';
import * as contactService from '../services/contactService.js';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res, next) => {
  try {
    const contact = await contactService.addNewContact(Contact, req.body);
    res.json(contact);
  } catch(err) {
    next(err);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getContacts(Contact);
    res.json(contacts);
  } catch(err) {
    next(err);
  }
};

export const getContactWithID = async (req, res, next) => {
  try {
    const contact = await contactService.getContactWithID(Contact, req.params.contactID);
    res.json(contact);
  } catch(err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
    try {
      const contact = await contactService.updateContact(Contact, req.params.contactID, req.body);
      res.json(contact);
    } catch(err) {
      next(err);
    }
};

export const deleteContact = async (req, res, next) => {  
  try {
    const contact = await contactService.deleteContact(Contact, req.params.contactID);
    res.json({
      contact,
      message: contact ? 'Successfully deleted contact' : `No contact with ID: ${req.params.contactID}`
    });
  } catch(err) {
    next(err);
  }
};