import React, { useContext } from 'react'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousal/Carousal'
import { AuthContext } from '../../context/useContext/AuthContext'

function MatrimonyHome() {
  const{user}=useContext(AuthContext)
  console.log(user);
  return (
    <div>
        <Header/>
        <Carousel/>
    </div>
  )
}

export default MatrimonyHome