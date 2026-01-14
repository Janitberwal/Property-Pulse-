import Link from "next/link";
const Infobox = ({heading,
    bagroundColor='bg-gray-100',
    textColor='bg-gray-800',
    buttonInfo,
    children})=>{
    return(
          <div className={`${bagroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor}text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor}mt-2 mb-4`}>
              {children}
            </p>
            <Link
              href={buttonInfo.link}
              className={`${buttonInfo.backgroundColor} inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
            >
              {buttonInfo.text}
            </Link>
          </div>
    )
}
export default Infobox;