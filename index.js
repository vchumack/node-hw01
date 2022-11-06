const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
// invokeAction({
//   action: "remove",
//   id: "636750abe2e4cb4ac4c0cb1d",
// });
// invokeAction({ action: "list" });

// обработка запроса
// const PORT = 2222;
// const requestHandler = (request, response) => {
//   response.writeHead(200, { "Content-type": "text/html" });
//   response.end("<h1>Hello bitches</h1>");
// };

// const server = http.createServer(requestHandler);
// server.listen(PORT, (err) => {
//   if (err) {
//     console.error("Error", err);
//   }
//   console.log(`server works at port - ${PORT}`);
// });
