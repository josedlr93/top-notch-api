import mongoose, { connect, disconnect } from '../../lib/database.js';
import { ContactSchema } from '../../models/contactModel.js';

const Contact = mongoose.model('Contact', ContactSchema);

describe('Contact model test', () => {  
  let contactInfo;

  beforeAll(async () => {
    await connect();
    await Contact.deleteMany({})
  });

  beforeEach(() => {
    contactInfo = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@email.com',
      address: '1 address st, city state, 11111',
      phone: 1111111111,
      alt_phone: null
    }
  });

  afterEach(async () => {
    await Contact.deleteMany({});
  });

  afterAll(async () => {
    await Contact.deleteMany({});
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
      
      expect(contact.first_name).toBe(foundContact.first_name);
      expect(contact.last_name).toBe(foundContact.last_name);
      expect(contact.email).toBe(foundContact.email);
      expect(contact.address).toBe(foundContact.address);
      expect(contact.phone).toBe(foundContact.phone);
      expect(contact.alt_phone).toBe(foundContact.alt_phone);
    });
    
    it('does not save a contact, missing key: first_name', async () => {
      contactInfo.first_name = undefined;
      const contact = new Contact(contactInfo);

      await contact.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe('Contact validation failed');
        expect(err.errors.first_name).toBeDefined();
        expect(err.errors.first_name.properties.message).toBe('Enter a first name');
      });   
    });
    
    it('does not save a contact, missing key: last_name', async () => {
      contactInfo.last_name = undefined;
      const contact = new Contact(contactInfo);

      await contact.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe('Contact validation failed');
        expect(err.errors.last_name).toBeDefined();
        expect(err.errors.last_name.properties.message).toBe('Enter a last name');
      });   
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

      expect(updatedContact.first_name).toBe(contact.first_name)
      
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
  });
});