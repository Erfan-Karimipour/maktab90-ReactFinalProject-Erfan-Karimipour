import { Link } from 'react-router-dom'
import Logo from '../../../assets/Images/Logo.png'

export const AdminHeader = () => {
  return (
    <div className='flex mx-56'>
        <img src={Logo} alt="Logo" width={'50px'} className='opacity-90 my-2 ml-3'/>
        <div className='w-full grid grid-cols-3 content-center justify-between text-3xl text-gray-800 self-center'>
            <p>Computing Systems of</p>
            <p className='text-center'>صفحه ادمین</p>
            <Link to={`/`} className='text-lg text-red-500 text-end' onClick={() => document.cookie = `adminLoggedIn=true; expires=thu, 13 mar 2004 00:00:00 UTC; path=/;`}>خروج</Link>
        </div>
    </div>
  )
}
