import PropertyEditForm from "@/components/PropertyEditForm";
import {prisma} from '@/lib/prismadb'

const EditPage = async ({params})=>{
  
  const property = await prisma.property.findUnique({
    where:{
        id:params.id,
    }
  });
    if (!property) {
    return <p>Property not found</p>;
  }
    return (
        <section className ='bg-blue-100'>
        <div className ='container m-auto max-w-2xl py-24' >
          <div className="bg-white px-6 py-8 mb-8 shadow-md rounded-md border m-4 md-m:0">
            <PropertyEditForm property={property}/>
            </div>  
        </div>
        </section>
    )
}
export default EditPage;