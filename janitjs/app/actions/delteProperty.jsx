'use server'
import cloudinary from "@/config/cloudinary";
import {prisma} from "@/lib/prismadb";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";


const DeleteProperty = async (propertyId)=>{
 const SessionUser = await getSessionUser();

 if(!SessionUser || !SessionUser.userId){
    throw new  Error('User Id is required')
 }
  const {userId} = SessionUser;

  const property = await prisma.property.findUnique({
    where: {
    id: propertyId,
  },
  });

  if(!property){
    throw new Error('Property not found');
  }
  //find authorisation 
  if(property.owner.toString() !== userId){
    throw new Error('User not authorised');
  }
  //extract public Id from urls
  const publicIds = property.images.map((imageUrl)=>{
       const part = imageUrl.split('/');
       return part.at(-1).split('.').at(0);
  })
  //delete from cloudinary 
 if(publicIds.length >= 0){
    for(let publicId of publicIds){
        await cloudinary.uploader.destroy('PropertyPulse/' + publicId);
    }
 }
 await prisma.property.delete({
    where: { 
        id : propertyId,
    }
 });

   revalidatePath('/' + 'layout');
   
}
export default DeleteProperty;