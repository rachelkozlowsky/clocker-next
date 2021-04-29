import { Container, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Agenda } from "../components/agenda";
import { Login } from "../components/login";
import firebase from '../config/firebase';

export default function Home(){

  const [auth, setAuth] = useState({
    loading: true,
    user: false
  })

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user =>{
      setAuth({
        loading: false,
        user
      })
    })
  },[])

  if (auth.loading){
    return(
      <Container p={4} centerContent>
      <Spinner />
      </Container>
    )
  }
  return(

    auth.user ? <Agenda/> : <Login />

  )
}