export const getContacts = (Contact) => {
  return Contact.find({});
};

export const addNewContact = (Contact, data) => {
  let newContact = new Contact(data);
  return newContact.save();
};