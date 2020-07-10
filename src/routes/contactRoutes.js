import {
  getContacts,
  addNewContact,
  getContactWithID,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

const contactRoutes = (app) => {
  app.route('/contact')
    .get(getContacts)

    .post(addNewContact);

  app.route('/contact/:contactID')
    .get(getContactWithID)

    .put(updateContact)

    .delete(deleteContact);
};

export default contactRoutes;