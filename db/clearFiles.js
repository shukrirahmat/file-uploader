const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function clear() {
    const files = await prisma.file.deleteMany();
}

clear();