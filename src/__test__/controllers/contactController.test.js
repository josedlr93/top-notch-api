import * as contactService from '../../services/contactService';

describe('contactService test', () => {
  it('has a module', () => {
    expect(contactService).toBeDefined();
  });

  describe('getContacts test', () => {
    it('gets contacts', () => {
      const MockModel = {
        find: jest.fn()
      };
      contactService.getContacts(MockModel);
      expect(MockModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('addNewContact test', () => {
    it('adds a contact', () => {
      const save = jest.fn();
      let first_name;
      let last_name;
      const MockModel = (data) => {
        first_name = data.first_name;
        last_name = data.last_name;

        return {
          ...data,
          save
        };
      };

      contactService.addNewContact(MockModel, {
        first_name: 'John',
        last_name: 'Doe'
      });

      expect(save).toHaveBeenCalledTimes(1);
      expect(first_name).toEqual('John');
      expect(last_name).toEqual('Doe');
      
    });
  });

});

