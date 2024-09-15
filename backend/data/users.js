import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Vrush Chaube",
    email: "vrush@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Palsi Jadhav",
    email: "palsi@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;