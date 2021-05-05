import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import { Button, Container, Box, IconButton, SimpleGrid, Spinner } from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import { addDays, subDays, format } from 'date-fns';
import axios from 'axios';
import {useFetch} from '@refetty/react';

import {useAuth} from './../components/auth';
import {Logo} from './../components/logo';
import {formatDate} from './../components/date';
import {TimeBlock} from './../components/timeBlock';



 const getSchedule = async (when) => axios ({
    method: 'get',
    url:'/api/schedule',
    params: {
        username: window.location.pathname.replace('/', ''),
        date: format(when, 'yyyy-MM-dd'),
    }
})

 

const Header = ({children}) =>(

    <Box p={4} display="flex" alignItems="center" justifyContent="space-between" >
        {children}
    </Box>

)



export default function Schedule() {

    const router = useRouter()
    
    const [auth, {logout}] = useAuth()
    

    const [when, setWhen] = useState(() => new Date())

    const [data, {loading, status, error}, fetch] = useFetch(getSchedule, {lazy: true})

 
   
    const adDay = () => setWhen(addDays(when, 1))

    const rmDay =  () => setWhen(subDays(when, 1))


   


/*     useEffect(() => {
        !auth.user && router.push('/')
      },[auth.user]) */
      

    useEffect(()=>{
        fetch(when)
    }, [when])  
  
   
    return(

        <Container>
          <Header>
              <Logo size={150}/>
            <Button onClick={()=>logout()}>Sair</Button>
          </Header>

          <Box mt={8} display="flex" alignItems="center" >
              <IconButton icon={<ChevronLeftIcon />} bg="transparent" onClick={rmDay} />
              <Box flex={1} textAlign="center" >{formatDate(when,'PPPP')}</Box>
              <IconButton icon={<ChevronRightIcon />} bg="transparent" onClick={adDay} />
          </Box>

            <SimpleGrid p={4} columns={2} spacing={4} >
                {loading && <Spinner tickness="4px" speed="0.065s" emptyColor="gray.200" color="blue.500" size="xl"/>}
                {data?.map(({time, isBlocked}) => <TimeBlock key={time} time={time} date={when} disabled={isBlocked}/>) }
            </SimpleGrid>

        </Container>
     
     
        
    )
}