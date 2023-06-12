import React from 'react'
import { Header } from '../../Layout/Header'
import { Main } from './Components/Main'
import { Footer } from '../../Layout/Footer'
import { useData } from '../../Context/Context'

export const HomaPage = () => {

  const {modal} = useData();

  return (
    <>
      <Header />
      
      <Main   />
      <Footer />
    </>
  )
}
