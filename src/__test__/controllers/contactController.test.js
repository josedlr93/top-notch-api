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
  
});

