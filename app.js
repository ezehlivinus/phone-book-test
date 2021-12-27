import Contacts from './service.js';

(async () => {
  const contact1 = await Contacts.create({
    phoneNumber: '+38097766666', name: 'John', email: 'ezeh@gmail.com',
  });

  const contact2 = await Contacts.create({
    phoneNumber: '+63655450004', name: 'John', email: 'ezeh@gmail.com',
  });

  // contact three, we do not need to use
  // the object of this new contact, so we didnt assign it a variable
  await Contacts.create({
    phoneNumber: '+00000000000000', name: 'John', email: 'ezeh@gmail.com',
  });

  // this does not get created as the number is same as above
  await Contacts.create({
    phoneNumber: '+00000000000000', name: 'John', email: 'ezeh@gmail.com',
  });

  // all contacts
  const contacts = Contacts.list();
  // console.log(contacts)

  // find one contact
  const contact = await Contacts.findOne('+00000000000000');
  // console.log(contact);

  // update this contact
  const updated = await Contacts.update('+00000000000000', {
    phoneNumber: '+00000000000000', name: 'Michael', email: 'ezeh@gmail.com',
  });

  // console.log(updated);
  // console.log(Contacts.list());

  // update this contact
  const contactAlreadyExist = await Contacts.update('+00000000000000', {
    phoneNumber: '+00000000000000', name: 'Michael', email: 'ezeh@gmail.com',
  });
  // console.log(contactAlreadyExist);

  // console.log(contacts);
})();
