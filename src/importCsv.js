const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const csv = require('csv-parser');
// const moment = require('moment-hijri');

const prisma = new PrismaClient();

async function main() {
  await prisma.date.deleteMany();
  fs.createReadStream('/Users/majed/Desktop/hijri/src/data.csv') 
    .pipe(csv({ separator: ',' }))
    .on('data', async (row) => {
      const [gregorian, hijri] =  Object.values(row);
      const date = await prisma.date.create({
        data: {
            hijri, gregorian
        }
      })
      console.log('Inserted Date:', date);
    })
    .on('end', () => {
      prisma.$disconnect();
      console.log('CSV file successfully processed.');
    });
}

main().catch((error) => {
  console.error('An error occurred:', error);
});
