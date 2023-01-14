const fs = require("fs").promises;
const path = require("path");
const colors = require("colors");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);

  console.log("Contact list: ".bgGreen);
  console.table(contactList);
}
async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const gottenContact = contactList.filter((item) => item.id === contactId);

  console.log("Gotten Contact :".bgCyan);
  console.table(gottenContact);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const indexOfContact = contactList.findIndex(
    (contact) => contact.id === contactId
  );
  await contactList.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));

  console.log("Contact list after delete: ".bgGreen);
  console.table(contactList);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const id = uuidv4();
  const newContact = { id, name, email, phone };

  await contactList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");
}

module.exports = { listContacts, getContactById, removeContact, addContact };
