import { Link } from 'react-router-dom'
import Logo from '../../../assets/Images/Logo.png'

export const AdminHeader = () => {
  return (
    <div className='flex mx-56'>
        <a href="/">
          <img src={Logo} alt="Logo" width={'50px'} className='opacity-90 my-2 ml-3'/>
        </a>  
        <div className='w-full flex content-center justify-between text-3xl text-gray-800 self-center'>
            <p>صفحه ادمین</p>
            <Link to={`/`} className='text-lg text-red-500 text-end self-center flex items-center' onClick={() => document.cookie = `adminLoggedIn=true; expires=thu, 13 mar 2004 00:00:00 UTC; path=/;`}>
              <p>خروج</p>
              <ion-icon name="exit-outline" class="text-2xl mr-1 align-middle"></ion-icon>
            </Link>
        </div>
    </div>
  )
}
