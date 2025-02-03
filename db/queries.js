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
  const folder = await prisma.folder.findFirst({
    where: {
      userId,
      name
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

async function getFolderFromId(folderId) {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId
    },
    include: {
      files: true
    }
  })
  
  return folder;
}

async function createFileData(name, size, uploadedAt, folderId, userId) {
  const file = await prisma.file.create({
    data: {
      name,
      size,
      uploadedAt,
      folderId,
      userId
    }
  })

  return file;
}

async function getFileFromId(id) {
  const file = await prisma.file.findUnique({
    where: {
      id
    }
  })

  return file;
}

module.exports = {
  findUser,
  findUserWithID,
  addUser,
  checkIfFolderExists,
  createNewFolder,
  getAllFolders,
  getFolderFromId,
  createFileData,
  getFileFromId
};
