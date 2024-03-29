import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';


import { Logo } from "../components/logo";

import { useAuth } from './../components/auth';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail Inválido').required('Preenchimento Obrigatório'),
  password: yup.string().required('Preenchimento Obrigatório'),
  username: yup.string().required('Preenchimento Obrigatório'), //implemnatar pesquisar se já existe
});

export default function Home() {

 
  const [auth,{signup}] = useAuth()  
  
  const router = useRouter()
  
  const {
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues:{
      email: '',
      username: '',
      password: '',
    }
  })

  useEffect(() => {
    auth.user && router.push('/agenda')
  },[auth.user])
 
  return (

    <Container centerContent p={4}>
      <Logo size={230} />
      <Box p={4} mt={8}>
        <Text> Crie sua agenda compartilhada </Text>
      </Box>
      <Box>
      <FormControl id="email" p={4} isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input size="lg"  type="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
        {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText> }
      </FormControl>
      <FormControl id="password" p={4} isRequired>
        <FormLabel>Senha</FormLabel>
        <Input size="lg"  type="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
        {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText> }
      </FormControl>

      <FormControl id="username" p={4} isRequired>
        <InputGroup size="lg">
          <InputLeftAddon children="agenda.kazuweb.com.br/" />
       <Input size="lg" type="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
       </InputGroup>
       {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText> }
      </FormControl>   
      
      <Box p={4} >
      <Button colorScheme="blue" width="100%" onClick={handleSubmit} isLoading={isSubmitting}> Entrar </Button>
      </Box>
      </Box>

      <Link href="/">Já tem uma conta? Acesse! </Link>
    </Container>


  )
}
