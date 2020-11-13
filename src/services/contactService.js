export const getContacts = (Contact) => {
  return Contact.find({});
};

export const addNewContact = (Contact, data) => {
  let newContact = new Contact(data);
  return newContact.save();
};

export const getContactWithID = (Contact, contactID) => {
  return Contact.findById(contactID);
};

export const updateContact = (Contact, contactID, data) => {
  return Contact.findOneAndUpdate(
    { _id: contactID },
    data,
    {
      new: true,
      useFindAndModify: false
    });
};

export const deleteContact = (Contact, contactID) => {
  return Contact.findByIdAndDelete({ _id: contactID });
};