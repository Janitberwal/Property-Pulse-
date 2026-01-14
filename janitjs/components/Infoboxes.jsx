import Images from "next/image";
import Link from "next/link";
import Infobox from "@/components/Infobox"

const Infoboxes = ()=>{
    return(
       <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <Infobox  heading='For Rental' bagroundColor='bg-blue-100' buttonInfo={{
                text:'Brouse Property',
                link:'/Properties',
                backgroundColor:'bg-blue-700'
            }}>Find your dream rental property. Bookmark properties and contact owners.</Infobox>
            <Infobox heading='For property owner' bagroundColor='bg-blue-100'buttonInfo={{
                text:'Add Property',
                link:'/Properties/add',
                backgroundColor:'bg-blue-700'
            }}>List your properties and reach potential tenants. Rent as an
              airbnb or long term.</Infobox>
        </div>
      </div>
    </section>

    )
}
export default Infoboxes;