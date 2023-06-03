import { Link } from 'react-router-dom'
import Logo from '../assets/Images/Logo.png'

export const Header = () => {
  return (
    <div className='h-22 border-b fixed w-full top-0 backdrop-blur-md bg-white bg-opacity-50 z-20 border-gray-400'>
        <div className='mx-56 flex justify-between'>
            <div className='flex'>
                <img src={Logo} alt="Logo" width={'50px'} className='opacity-90 my-2 ml-3'/>
                <div className='w-full flex content-center h-full'>
                    <p className='text-3xl self-center text-gray-800'>Computing Systems of</p>
                </div>
            </div>
            <div className='flex text-xl gap-8 self-center'>
                <Link to='/AdminLogin'><button className='border-white border-b-2 hover:border-red-500 duration-100 px-1 rounded-sm'>ورود ادمین</button></Link>  
                <Link to='/ShoppingCart'><button className='border-white border-b-2 hover:border-red-500 duration-100 px-1 rounded-sm'>سبد خرید</button></Link>
            </div>
        </div>
    </div>
  )
}
