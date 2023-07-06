import React, {useEffect} from 'react'
import BG from '../../assets/Images/PaymentBG.jpg'
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../Context/Context';
import axios from 'axios';
import { formatNumber } from '../../modules/formatNumber';

export const PaymentPage = () => {

  let { user } = useParams<{user: string}>();
  let {badge, setBadge} = useData()

  let total = JSON.parse(localStorage.getItem(`Price`));
  let info = JSON.parse(localStorage.getItem(`info`));
  let newOrder = JSON.parse(localStorage.getItem(`Order`));
  newOrder = {...newOrder, user: user};
  
  
  return (
    <div className={`w-screen h-screen bg-[url(assets/Images/PaymentBG.jpg)] bg-cover`}>
      <div className='absolute bottom-0 w-full h-24 flex justify-between'>
        <div className='flex'>
          <button className='text-2xl text-white bg-green-500 h-fit px-44 py-4 mt-2 mr-[27rem] rounded-full'  onClick={() => {
            axios.post(`http://localhost:8000/api/orders`, newOrder).then((res) => {
              window.open(`/Result/success`, '_self');
              localStorage.removeItem(`Carts`);
              setBadge(0);
            }).catch((err) => {
              console.log(err);
            })
          }}>پرداخت</button>
          <Link className='text-2xl text-white bg-yellow-300 h-fit px-12 py-4 mt-2 mr-2 rounded-full'      to={`/Result/failed`}>انصراف</Link>
        </div>
        <span className='text-4xl text-green-500 bg-white font-bold ml-28 pl-4 mt-5'>
          {formatNumber(total)}
        </span>
      </div>
    </div>
  )
}
