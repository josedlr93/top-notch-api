import { handleDuplicateKey } from '../errorHandler.js';

export const test = () => {
  return true;
};

export const getContacts = (Contact) => {
  console.log('contactService - getContacts');
  return Contact.find({});
};

export const addNewContact = () => {

};