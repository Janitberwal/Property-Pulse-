import PropertyAddForm from "@/components/PropertyAddForm";

const AddProperties = ()=> {
    return(
       <section className="bg-blue-100 py-24">
    <div className="container m-auto max-w-2xl">
      <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4">
        <PropertyAddForm />
      </div>
    </div>
  </section>
    )
}
export default AddProperties;