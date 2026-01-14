import Image from "next/image";
const PropertyHeaderImage = ({image}) => {
    console.log('recievedimage',image);

    return (  <section>
        <div class="container-xl m-auto">
          <div class="grid grid-cols-1">
            <Image
              src={image}
              alt=""
              class="object-cover h-[400px] w-full"
              width={600}
              height={600}
              size='100vw'
            />
          </div>
        </div>
      </section>);
}
 
export default PropertyHeaderImage;
