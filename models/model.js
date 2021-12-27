/**
 * Case 1:
 * The contacts are store as an array of contact, i.e contacts = [ {<contact>}, {<contact>}, ...]
 * 
 * Case 2:
 * To aid searching, may be, I could have stored the contacts in this format:
 * contacts =  { phoneNumber1: {<phoneNumber1Details>}, phoneNumber2: {<phoneNumber2Details>} }
 * such that i can find: contact2 = contacts[phoneNumber2]
 * Also other CRUD operation could been made simple.
 * 
 * However, here I am. I implemented case 1, that reps the "list/array" of contacts
 */
class PhoneBook {
  static instance;

  constructor() {
    if (PhoneBook.instance) {
      return PhoneBook.instance;
    }
    this.contacts = [];
    PhoneBook.instance = this;
  }

  create(contact) {
    this.contacts.push(contact);

    return contact;
  }

  findOne(phoneNumber) {
    return this.contacts.find((contact) => contact.phoneNumber === phoneNumber);
  }

  list() {
    return this.contacts;
  }

  delete(phoneNumber) {
    // if the contact does not exist we do not need to say anything, at least for now
    this.contacts = this.contacts.filter((contact) => contact.phoneNumber !== phoneNumber);
  }

  update(phoneNumber, _contact) {
    const index = this.contacts.findIndex((contact) => contact.phoneNumber === phoneNumber);

    this.contacts[index] = Object.assign(this.contacts[index], _contact);

    return this.contacts[index];
  }

  findByName(name) {
    return this.contacts.find((contact) => `${contact.name}`.toLowerCase() === `${name}`.toLowerCase().trim());
  }

  isUnique(phoneNumber) {
    return !!this.findOne(phoneNumber);
  }
}

export default new PhoneBook();
