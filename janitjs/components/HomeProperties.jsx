'use server'
import PropertyCard from './PropertyCard';
import {prisma} from '@/lib/prismadb';



const Homeproperties = async ()=>{
    const recentpropeties = await prisma.Property.findMany({
      orderBy:{createdAt:'asc'},
      take:3,
    });
    return(
     <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className='text-3xl font-bold text-center text-cyan-800 mb-8'>Recent properties</h2>
        {recentpropeties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentpropeties.map((property) => (
              <PropertyCard key={property.id} property={property}/>
            ))}
          </div>
        )}
      </div>
    </section>
    
);
}
export default Homeproperties;