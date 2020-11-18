import * as contactService from '../../services/contactService';

describe('contactServices test #cold-test', () => {
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

    it('throws an error on missing last name', () => {
      expect(() => {
        contactService.addNewContact({}, {first_name: 'John'});
      }).toThrow('first and last name required')
    });
    
    it('throws an error on missing first name', () => {
      expect(() => {
        contactService.addNewContact({}, {last_name: 'Doe'});
      }).toThrow('first and last name required')
    });
  });

  describe('getContactWithID test', () => {
    it('gets a contact', () => {
      const MockModel = {
        findById: jest.fn()
      };

      contactService.getContactWithID(MockModel);
      expect(MockModel.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateContact test', () => {
    it('updates a contact', () => {
      const MockModel = {
        findOneAndUpdate: jest.fn()
      };

      contactService.updateContact(MockModel);
      expect(MockModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteContact test', () => {
    it('deletes a contact', () => {
      const MockModel = {
        findByIdAndDelete: jest.fn()
      };

      contactService.deleteContact(MockModel);
      expect(MockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  })

});

