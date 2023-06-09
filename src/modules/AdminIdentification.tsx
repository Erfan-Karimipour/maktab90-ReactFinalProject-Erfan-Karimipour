import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const AdminIdentification = (e) => {
    e.preventDefault();
    let userName = e.target[0].value;
    let password = e.target[2].value;
   
    const formInfo = {
        method: 'post',
        url   : 'http://localhost:8000/api/auth/login',
        data: {
            "username": userName,
            "password": password
        },
    }

    axios(formInfo).then((res) => {
        if(res.data.status == 'success'){
            
            const now = new Date();
            const expireDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            
            document.cookie = `adminLoggedIn=true; expires=${expireDate.toUTCString()}; path=/`;
            
            window.location.replace(`./Admin`);
        }

        
    }).catch(() => {
        console.log(`A-Hole`);
        
    })

}
