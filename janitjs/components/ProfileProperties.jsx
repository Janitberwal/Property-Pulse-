'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteProperty from "@/app/actions/delteProperty";
import {toast}  from 'react-toastify';

const ProfileProperties = ({properties:initialProperties}) => {
    const [properties,setProperties] = useState(initialProperties);

    const handleDelete = async (propertyId)=>{
      const confirmed = window.confirm('Are you sure you want to Delete property?');
    
    if(!confirmed) return;
   await DeleteProperty(propertyId);

    const updateProperties = properties.filter((property)=> property.id !== propertyId);
    setProperties(updateProperties);
    toast.success('Property Deleted');
    } 
    
    return properties.map((property)=>(
        <div key={property.id} className="mb-10">
                  <Link href={`/properties/${property.id}`}>
                    <Image
                      className="h-52 w-full rounded-md object-cover"
                      src={property.images[0]}
                      width={1000}
                      height={500}
                      alt="Property 1"
                    />
                  </Link>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{property.name}</p>
                    <p className="text-gray-600">{property.street},{property.city},{property.state}</p>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/properties/${property.id}/EditForm`}
                      className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      type="button"
                      onClick = {()=> handleDelete(property.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
    ));
}
 
export default ProfileProperties;