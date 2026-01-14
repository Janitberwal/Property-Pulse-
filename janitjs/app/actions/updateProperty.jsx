'use server'
import {prisma} from '@/lib/prismadb';
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

const updateProperty = async (propertyId,formData, amenities)=>{
 const SessionUser = await getSessionUser();

 if(!SessionUser || !SessionUser.userId){
    throw new  Error('User Id is required')
 }
  const {userId} = SessionUser;
   
const existingProperty = await prisma.property.findUnique({
  where: { 
    id: propertyId
 },
});
 //verfiy user 
 if(existingProperty.owner.toString() !== userId){
    throw new Error('Property not found');
 }

 
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

   const updateProperty = await prisma .property.update({
    where:{
        id:propertyId,
    },
     data: property,
   })
   revalidatePath('/' + 'layout');
   redirect(`/properties/${updateProperty.id}`)
}

export default updateProperty;