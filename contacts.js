const fs = require("fs").promises;
const ObjectID = require("bson-objectid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (id) => {
  try {
    const allContacts = await listContacts();
    const data = await allContacts.find((contact) => contact.id === id);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const i = allContacts.findIndex((item) => item.id === id);

  if (i === -1) {
    return null;
  }

  const [result] = allContacts.splice(i, 1);
  updateContacts(allContacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
