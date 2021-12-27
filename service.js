import Joi from 'joi';
import Base from './models/base.js';
import PhoneBook from './models/model.js';

class ContactService extends Base {
  async create(contact) {
    const data = await this.validate(contact);

    const oldContact = PhoneBook.findOne(data.phoneNumber);
    if (oldContact) {
      return oldContact;
    }

    let newContact = { ...data, createdAt: new Date() };

    newContact = PhoneBook.create(newContact);

    return newContact;
  }

  findOne(phoneNumber) {
    const contact = PhoneBook.findOne(phoneNumber);
    if (!contact) {
      return 'phone number or contact does not exist';
    }
    return contact;
  }

  list() {
    const contacts = PhoneBook.list();
    if (!contacts.length) {
      return 'contacts does not exist';
    }

    contacts.sort((a, b) => a.name.localeCompare(b.name));

    return contacts;
  }

  delete(phoneNumber) {
    this.phoneBook.delete(phoneNumber);
  }

  async update(phoneNumber, update) {
    const oldcontact = PhoneBook.findOne(phoneNumber);
    if (!oldcontact) {
      console.error('contact does not exist');
      return 'contact does not exist';
    }

    const request = await this.validate(update, 'update');

    // make sure the number is still unique
    const isSameNumber = phoneNumber === update.phoneNumber;
    if (!isSameNumber) {
      if (!PhoneBook.isUnique(update.phoneNumber)) {
        return 'phone number already exist...';
      }
    }

    const updatedContact = PhoneBook.update(phoneNumber, request);
    return updatedContact;
  }

  async validate(request, action = 'create') {
    try {
      const schema = {
        update: Joi.object({
          name: Joi.string().min(3).max(100)
            .trim(),
          email: Joi.string().email().trim().lowercase(),
          phoneNumber: Joi.string().trim(),
        }),

        create: Joi.object({
          name: Joi.string().min(3).max(100).required()
            .trim(),
          email: Joi.string().email().trim().lowercase()
            .required(),
          phoneNumber: Joi.string().trim().required(),
        }),
      };

      const value = await schema[action].validateAsync(request);

      return value;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}

export default new ContactService();
