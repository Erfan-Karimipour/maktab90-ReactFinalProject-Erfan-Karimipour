import { Link } from 'react-router-dom'
import { LoginInputs } from './LoginInputs/LoginInputs'
import LockAndKey from '../../assets/Images/LoginPage/Lockandkey.png'

export const AdminLogin = () => {
  return (
    <div className='bg-gray-300 w-screen h-screen flex justify-center items-center'>
      <div className=' bg-gray-100 rounded-md shadow-md border'>
        <p className='text-4xl mb-4 text-center py-6 mx-10 border-b border-gray-300'>ورود ادمین</p>
          <div className='grid grid-cols-2'>
          <div className='flex flex-col w-5/6 self-center m-auto'>
            <LoginInputs />
            <button type='submit' className='bg-red-500 text-white text-2xl font-bold rounded-md py-2'>ورود</button>
          </div>
          <img src={LockAndKey} alt="Lock and key" width={300} className='mx-20 my-5'/>
        </div>
      </div>
    </div>
  )
}
