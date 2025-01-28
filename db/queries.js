const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function findUser(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

async function findUserWithID(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

async function addUser(username, hashedPassword) {
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return user;
}

module.exports = {
  findUser,
  findUserWithID,
  addUser,
};
