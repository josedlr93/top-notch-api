import MemoryServer from '../MemoryServer.js';
import { ContactSchema } from '../../models/contactModel.js';

describe('Contact model test', () => {  
  const db = new MemoryServer();
  const validationFailureMsg = 'Contact validation failed';
  let Contact;
  let contactInfo;

  beforeAll(async () => {
    await db.connect();
    Contact = db.connection.model('Contact', ContactSchema);
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
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('has a module', () => {
    expect(Contact).toBeDefined();
  });

  describe('save contact', () => {
    it('saves a contact', async () => {
      const contact = new Contact(contactInfo);
      const savedContact = await contact.save();
      const foundContact = await Contact.findById(savedContact._id);
      
      expect(foundContact.first_name).toBe(contact.first_name);
      expect(foundContact.last_name).toBe(contact.last_name);
      expect(foundContact.email).toBe(contact.email);
      expect(foundContact.address).toBe(contact.address);
      expect(foundContact.phone).toBe(contact.phone);
      expect(foundContact.alt_phone).toBe(contact.alt_phone);
    });
    
    it('does not save a contact, missing key: first_name', async () => {
      contactInfo.first_name = undefined;
      const contact = new Contact(contactInfo);

      await contact.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
        expect(err.errors.first_name).toBeDefined();
        expect(err.errors.first_name.properties.message).toBe('Enter a first name');
      });   
    });
    
    it('does not save a contact, missing key: last_name', async () => {
      contactInfo.last_name = undefined;
      const contact = new Contact(contactInfo);

      await contact.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
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

      expect(foundContact.first_name).toEqual(contact.first_name);

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