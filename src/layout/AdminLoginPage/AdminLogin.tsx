import { Link } from 'react-router-dom'
import { LoginInputs } from './LoginInputs/LoginInputs'
import LoginBG from '../../assets/Images/LoginBG.png'

export const AdminLogin = () => {
  return (
    <>
      <div className="w-screen h-screen bg-cover blur-sm" style={{backgroundImage: `url(${LoginBG})`}}>
      </div>
      <form className='border border-gray-600 rounded-lg shadow-xl flex flex-col bg-white absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]'>
        <p className='text-2xl text-red-600 p-4 bg-black font-bold rounded-t-lg'>هشدار: این صفحه مخصوص افراد دارای صلاحیت است</p>
        <div className='m-4'>
          <LoginInputs />
        </div>
        <button type='submit' className='text-2xl  bg-[#1fa812] text-[#fafafa] font-bold py-2 mx-4 rounded-sm shadow-md border border-gray-500 mb-4'>ورود</button>
        <button className='text-blue-600 font-bold text-sm mb-2'><Link to='/'>بازگشت به صفحه اصلی</Link></button>
      </form>
    </>
  )
}
