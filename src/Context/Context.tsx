import React, {ReactNode, createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

let Context = createContext({});

export function Providers ({children}: {children: ReactNode}){
    let [categories     , setCategories     ] = useState([]);
    let [subCategories  , setSubCategories  ] = useState([]);
    let [products       , setProducts       ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categories`).then((res) => {
            setCategories(res.data.data.categories);
        }) 
      }, [])
    
    return(
        <Context.Provider value={{categories, setCategories, subCategories, setSubCategories, products, setProducts}}>
            {children}
        </Context.Provider>
    )
}

export const useData = () => {
    return useContext(Context);
}