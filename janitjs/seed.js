// seed.js using require() ✅
const { PrismaClient } = require('./app/generated/prisma');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync('./properties2.json', 'utf-8'));

  for (const property of data) {
    await prisma.property.create({
      data: {
        owner: property.owner,
        name: property.name,
        type: property.type,
        description: property.description,
        beds: property.beds,
        baths: property.baths,
        squareFeet: property.square_feet,
        isFeatured: property.is_featured,
        createdAt: new Date(property.createdAt),
        updatedAt: new Date(property.updatedAt),
        amenities: property.amenities,
        images: property.images,
    
        // Flattened location
        street: property.location.street,
        city: property.location.city,
        state: property.location.state,
        zipcode: property.location.zipcode,
    
        // Flattened rates
        nightly: property.rates.nightly ?? null,
        weekly: property.rates.weekly ?? null,
        monthly: property.rates.monthly ?? null,
    
        // Flattened seller info
        sellerName: property.seller_info.name,
        sellerEmail: property.seller_info.email,
        sellerPhone: property.seller_info.phone,
      }
    });
    
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });