const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkIfUsernameExists(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const exist = !!user;

  return exist;
}

async function addUser(username, hashedPassword) {
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
}

module.exports = {
  checkIfUsernameExists,
  addUser,
};
