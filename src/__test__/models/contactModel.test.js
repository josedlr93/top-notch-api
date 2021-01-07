import mongoose, { connect, disconnect } from '../../lib/database.js';
import { ContactSchema } from '../../models/contactModel.js';

const Contact = mongoose.model('Contact', ContactSchema);

describe('Contact model test', () => {  
  const contactInfo = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@email.com',
    address: '1 address st, city state, 11111',
    phone: 1111111111,
    alt_phone: null
  }

  beforeAll(async () => {
    await connect();
    await Contact.deleteMany({})
  });

  afterEach(async () => {
    await Contact.deleteMany({});
  });

  afterAll(async () => {
    await disconnect();
    console.log('DB - connection closed');
  });

  it('has a module', () => {
    expect(Contact).toBeDefined();
  });

  describe('save contact', () => {
    it('saves a contact', async () => {
      const contact = new Contact(contactInfo);
      
      const savedContact = await contact.save();
      const foundContact = await Contact.findById(savedContact._id);
      
      expect(contact.first_name).toEqual(foundContact.first_name);
      expect(contact.last_name).toEqual(foundContact.last_name);
      expect(contact.email).toEqual(foundContact.email);
      expect(contact.address).toEqual(foundContact.address);
      expect(contact.phone).toEqual(foundContact.phone);
      expect(contact.alt_phone).toEqual(foundContact.alt_phone);
    });
  });

  describe('update contact', () => {
    it('updates a contact', async () => {
      const contact = new Contact(contactInfo);

      const savedContact = await contact.save();
      const foundContact = await Contact.findById(savedContact._id);

      expect(contact.first_name).toEqual(foundContact.first_name);

      contact.first_name = 'Jane';
      
      const updatedContact = await contact.save();

      expect(updatedContact.first_name).toEqual(contact.first_name)
      
    });
  });

  describe('get contact', () => {
    it('gets a contact', async () => {
      const contact = new Contact(contactInfo);

      const savedContact = await contact.save();
      const foundContact = await Contact.findById(savedContact._id);

      expect(foundContact).toBeDefined();
    });
  });

  describe('delete contact', () => {
    it('deletes a contact by id', async () => {
      const contact = new Contact(contactInfo);

      const savedContact = await contact.save();

      const deletedContact = await Contact.findByIdAndDelete({ _id: savedContact._id });

      expect(deletedContact._id).toEqual(savedContact._id);
    });
  })
});