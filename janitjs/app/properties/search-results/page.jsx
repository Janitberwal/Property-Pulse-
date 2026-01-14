import { prisma } from '@/lib/prismadb';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { FaArrowCircleLeft } from "react-icons/fa";
import SearchForm from '@/components/SearchForm';

const SearchResultPage = async ({ searchParams }) => {
  const location = searchParams?.location?.trim() || '';
  const propertyType = searchParams?.propertyType?.trim() || '';

  // Build dynamic filters
  const filters = [];

  if (location) {
    filters.push({
      OR: [
        {
          name: {
            contains: location,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: location,
            mode: 'insensitive',
          },
        },
        {
          street: {
            contains: location,
            mode: 'insensitive',
          },
        },
        {
          city: {
            contains: location,
            mode: 'insensitive',
          },
        },
        {
          state: {
            contains: location,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  if (propertyType && propertyType !== 'All') {
    filters.push({
      type: {
        equals: propertyType,
        mode: 'insensitive',
      },
    });
  }

  const properties = await prisma.property.findMany({
    where: {
      AND: filters,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
     <section className='bg-blue-700 py-4'>
  <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
    <SearchForm />
  </div>
</section>
    <section className='px-4 py-6'>
  <div className='container-xl lg:container m-auto px-4 py-6'>
    <Link
      href='/properties'
      className='flex items-center text-blue-500 hover:underline mb-3'
    >
      <FaArrowCircleLeft className='mr-2 mb-1' /> Back To Properties
    </Link>
    <h1 className='text-2xl mb-4'>Search Results</h1>

{properties.length === 0 ? (
  <p>No search results</p>
) : (
  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
    {properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
)}
  </div>
</section>
</>
  );
};

export default SearchResultPage;
