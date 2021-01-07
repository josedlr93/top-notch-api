export const getContacts = (Contact) => {
  return Contact.find({});
};

export const addNewContact = (Contact, data) => {
  if (!data.last_name || !data.first_name){
    let error = new Error('first and last name required');
    error.status = 400;
    throw error;
  }
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