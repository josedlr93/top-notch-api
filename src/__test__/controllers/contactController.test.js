import * as contactService from '../../services/contactService';

describe('Contact service test', () => {
  it('tests the contact service', () => {
    expect(contactService.test()).toEqual(false);
  });
});