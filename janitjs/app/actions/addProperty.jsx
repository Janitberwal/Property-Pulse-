'use server';

import { prisma } from '@/lib/prismadb';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    console.log("❌ User not logged in or userId missing");
    return null;
  }

  const { userId } = sessionUser;
  console.log("✅ Logged in user:", userId);

  const amenities = formData.getAll('amenities');
  const images = formData.getAll('images').filter((image) => image.name !== '');

  const property = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    street: formData.get('location.street'),
    city: formData.get('location.city'),
    state: formData.get('location.state'),
    zipcode: formData.get('location.zipcode'),
    beds: parseInt(formData.get('beds')),
    baths: parseInt(formData.get('baths')),
    squareFeet: parseInt(formData.get('square_feet')),
    amenities,
    nightly: parseInt(formData.get('rates.nightly')) || null,
    weekly: parseInt(formData.get('rates.weekly')) || null,
    monthly: parseInt(formData.get('rates.monthly')) || null,
    sellerName: formData.get('seller_info.name'),
    sellerEmail: formData.get('seller_info.email'),
    sellerPhone: formData.get('seller_info.phone'),
    isFeatured: false,
  };

  const imageUrls = [];

  for (const imageFile of images) {
    try {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');
      console.log("📤 Uploading image to Cloudinary...");

      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
        folder: 'PropertyPulse',
      });

      console.log("✅ Uploaded image:", result.secure_url);
      imageUrls.push(result.secure_url);
    } catch (cloudErr) {
      console.error("❌ Cloudinary upload failed:", cloudErr);
    }
  }

  property.images = imageUrls;

  console.log("📝 Creating property in database...");
  const newProperty = await prisma.property.create({
    data: property,
  });

  console.log("✅ Property created:", newProperty.id);

  redirect(`/properties/${newProperty.id}`);
}

export default addProperty;