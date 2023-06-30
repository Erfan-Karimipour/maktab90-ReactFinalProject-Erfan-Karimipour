import React, {ReactNode, createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

let Context = createContext({});

export function Providers ({children}: {children: ReactNode}){
    let [categories     , setCategories     ] = useState([]);
    let [products       , setProducts       ] = useState([]);
    let [error          , setError          ] = useState(false);
    let [modal          , setModal          ] = useState(false);
    let [open           , setOpen           ] = useState(false);
    let [updateList     , setUpdateList     ] = useState(false);
    let [selectedSubCat , setSelectedSubCat ] = useState({});
    let [newOrder       , setNewOrder       ] = useState({
        user            : ``,
        products        : [],
        deliveryStatus  : false,
    });
    let [adminLoginError, setAdminLoginError] = useState({  

        userName: false,
        password: false
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categories`).then((res) => {
            setCategories(res.data.data.categories);
        })
      }, [])

    
    return(
        <Context.Provider value={{categories, setCategories, products, setProducts, error, setError, modal, setModal, adminLoginError, setAdminLoginError, open, setOpen, updateList, setUpdateList, selectedSubCat, setSelectedSubCat, newOrder, setNewOrder}}>
            {children}
        </Context.Provider>
    )
}

export const useData = () => {
    return useContext(Context);
}
