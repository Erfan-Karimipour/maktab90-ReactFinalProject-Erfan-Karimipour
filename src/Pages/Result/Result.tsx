import { Link, useParams }  from 'react-router-dom'
import successImg           from '../../assets/Images/ResultPage/SuccessImg.jpg'
import failImg              from '../../assets/Images/ResultPage/failImg.jpg'
import { Header } from '../../Layout/Header';
import { Footer } from '../../Layout/Footer';

export const Result = () => {

  let { result } = useParams<{result: string}>();

  return (
    <>
      <Header />
      <div className={`absolute flex flex-col text-center top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 ${result == 'success' ? 'border-green-500' : 'border-red-500'} rounded-xl`}>
        <img src={result == 'success' ? successImg : failImg} alt="Image" className='w-52 m-auto mt-10' />
        <p className='text-4xl p-10 pb-5'>
          {result == 'success' ? 'سفارش شما با موفقیت ثبت شد' : 'سفارش با موفقیت لغو شد'}
        </p>
        <Link to={'/ShoppingCart'} className='text-blue-500 mb-5'>
          بازگشت به سبد خرید
        </Link>
      </div>
      <div className='fixed bottom-0'>
        <Footer />
      </div>
    </>
  )
}
