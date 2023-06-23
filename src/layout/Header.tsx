import { Link } from 'react-router-dom'
import Logo from '../assets/Images/Logo.png'
import { useState } from 'react'
import { useData } from '../Context/Context'

export const Header = () => {

    let {modal, setModal} = useData(); 
    console.log(modal);
    

  return (
    <>
        <div className={modal == true ? 'h-22 border-b fixed w-full top-0 backdrop-blur-md bg-black bg-opacity-50 z-20 border-gray-400 duration-100' : 'h-22 border-b fixed w-full top-0 backdrop-blur-md bg-white bg-opacity-50 z-20 border-gray-400 duration-100'}  >
            
            <div className={modal == true ? 'mx-56 flex justify-between pointer-events-none' :  'mx-56 flex justify-between'}>
                <a className='flex w-56' href='/'>
                    <img src={Logo} alt="Logo" width={'100px'} className='opacity-90 my-2 ml-3'/>
                    <div className='w-full flex content-center h-full'>
                    </div>
                </a>

                <div className={modal == true ? 'bg-gray-100 flex h-fit self-center border-black border-2 rounded-xl rounded-b-md z-50 duration-100' : 'bg-gray-100 bg-opacity-60 flex h-fit self-center border-white shadow-sm shadow-gray-400 border-2 rounded-xl z-50 duration-100'}  >
                    <div className='flex p-2 w-96 justify-between'>
                        <input type="search" placeholder='در CSE جست و جو کنید!' className='text-lg outline-none w-full bg-white bg-opacity-0 placeholder:text-gray-600' onFocus={() => setModal(true)} onBlur={() => setModal(false)}/>
                        <ion-icon name="search-outline" class="text-gray-700 text-2xl"></ion-icon>
                    </div>
                </div>

                <div className='flex text-xl gap-8 self-center w-56'>
                    <Link to='/AdminLogin'><button className='border-opacity-0 border-b-2 border-red-500 hover:border-opacity-100 duration-100 px-1 rounded-sm'>ورود ادمین</button></Link>  
                    <Link to='/ShoppingCart'><button className='border-opacity-0 border-b-2 border-red-500 hover:border-opacity-100 duration-100 px-1 rounded-sm'>سبد خرید</button></Link>
                </div>
            </div>
            <div className= {modal == true ? 'bg-black fixed h-screen w-screen z-40 opacity-50 duration-100' : 'bg-black absolute top-0 bottom-0 right-0 left-0 z-40 opacity-0 pointer-events-none duration-100'}></div> 
        </div>
    </>
  )
}
