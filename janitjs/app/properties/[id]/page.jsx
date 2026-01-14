import PropertyHeaderImage from "@/components/PropertyHeadimage";
import { prisma } from "@/lib/prismadb";
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link'
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";

const propertyPage = async ({ params }) => {
  
  const propertyDetail = await prisma.Property.findUnique({
    where: { id: params.id },
  });

 
 
  return (
    <div classNameName="p-4">
      <PropertyHeaderImage image={propertyDetail.images[0]}/>
       <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft /> Back to Properties
        </Link>
      </div>
    </section>
    <section class="bg-blue-100">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        </div>
        <PropertyDetails property={propertyDetail}/>
         </div>
         </section>
         <PropertyImages images = {propertyDetail.images}/>
    </div>
  );
};

export default propertyPage;