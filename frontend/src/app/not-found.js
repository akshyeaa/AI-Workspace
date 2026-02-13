import Link from 'next/link'
import { IoMdHome } from "react-icons/io";
 
export default function NotFound() {
  return (
    <>
     <div className="absolute inset-0 bg-[url('/images/nf.jpg')] bg-cover bg-center blur-sm -z-10"></div>
    <div className='flex justify-center items-center flex-col min-h-screen'>
      <div className='flex justify-center items-baseline-last'>
        <h2 className='flex text-6xl font-bold text-black font-[font9]'>404</h2>
        <h2 className='flex text-6xl font-bold text-black font-[font9]'>&nbsp;-&nbsp;Not Found</h2>
      </div>
      <p className='text-[#451847] font-[font10] tracking-widest mt-3'>Could'nt find requested resource</p>
      <Link href="/" className='flex items-center mt-8 font-[font10] text-black hover:text-[#e5ffec] border-2 py-2 px-3 rounded-full border-black hover:border-green-200 hover:shadow-2xl shadow-black'>Return Home <IoMdHome /></Link>
    </div>
    </>
  )
}