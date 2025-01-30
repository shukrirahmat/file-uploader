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

async function checkIfFolderExists(userId, name) {
  const folder = await prisma.folder.findUnique({
    where: {
      name,
      userId
    }
  })

  return !!folder;
}

async function createNewFolder(userId, name) {
  const folder = await prisma.folder.create({
    data: {
      name,
      userId
    }
  })

  return folder;
}

async function getAllFolders(userId) {
  const folders = await prisma.folder.findMany({
    where: {
      userId
    }
  })

  return folders;
}

module.exports = {
  findUser,
  findUserWithID,
  addUser,
  checkIfFolderExists,
  createNewFolder,
  getAllFolders
};
