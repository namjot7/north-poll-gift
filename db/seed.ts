import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";


async function main() {
    const prisma = new PrismaClient();

    // clear existing data
    await prisma.user.deleteMany();

    // seed the sample data
    await prisma.user.createMany({ data: sampleData.users })

    console.log('Database seeded with sample data.')
}
main();