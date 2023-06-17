import { Link } from 'react-router-dom'
import { LoginInputs } from './LoginInputs/LoginInputs'
import LockAndKey from '../../assets/Images/LoginPage/Lockandkey.png'
import { AdminIdentification } from '../../modules/AdminIdentification'
import { useData } from '../../Context/Context'
import { useState } from 'react'


export const AdminLogin = () => {
  let {adminLoginError, setAdminLoginError} = useData()

  return (
    <div className='bg-gray-300 w-screen h-screen flex justify-center items-center'>
      <div className=' bg-gray-100 rounded-md shadow-md border'>
        <p className='text-4xl mb-4 text-center py-6 mx-10 border-b border-gray-300'>ورود ادمین</p>
          <div className='grid grid-cols-2'>
          <div className='flex flex-col w-5/6 self-center m-auto'>
            <form onSubmit={(e) => AdminIdentification(e, setAdminLoginError)}>
              <LoginInputs error={adminLoginError}/>
              <button type='submit' className='bg-red-500 text-white text-2xl font-bold rounded-md py-2 hover:bg-red-600 duration-100 w-full'>ورود</button>

            </form>
            <Link to={'/'} className='text-sm text-blue-700 self-start mt-1'>بازگشت به صفحه اصلی</Link>
          </div>
          <img src={LockAndKey} alt="Lock and key" width={300} className='mx-20 my-5'/>
        </div>
      </div>
    </div>
  )
}
