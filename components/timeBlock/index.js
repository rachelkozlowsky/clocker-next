import {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
 } from "@chakra-ui/react";

 import {Input} from './../input';
 import axios from 'axios';
import { format } from 'date-fns';


 const setSchedule = async ({date, ...data}) => axios ({
  method: 'post',
  url:'/api/schedule',
  data: {
    ...data,
    date: format(date, 'yyyy-MM-dd'),
    username: window.location.pathname.replace('/', ''), 
      
  }
})


const ModalTimeBlock = ({isOpen, onClose, onComplete, isSubmitting, children}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faça sua reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>
            {!isSubmitting && <Button variant="ghost" onClick={onClose}>Cancelar</Button>}
            <Button colorScheme="blue" mr={3} onClick={onComplete} isLoading={isSubmitting} >
              Reservar horário
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
)



export const TimeBlock = ({time, date, disabled }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(prevState => !prevState)

    const {values, handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting} = useFormik({
      onSubmit: async (values) => {
        try {
          await setSchedule({...values, time, date})
          toggle()
        } catch (error) {
          console.log(error)
        }
        
      },
      initialValues: {
          name: '',
          phone: '',
      },
      validationSchema: yup.object().shape({
          name: yup.string().required('Preenchimento Obrigatório'),
          phone: yup.string().required('Preenchimento Obrigatório')
      })
    })


    return (
        <Button p={8} bg="blue.500" color="white" onClick={toggle} disabled={disabled} >
            {time}
            {!disabled && <ModalTimeBlock 
              isOpen={isOpen} 
              onClose={toggle} 
              onComplete={handleSubmit} 
              isSubmitting={isSubmitting} 
            >
              <>
                <Input 
                    label = "Nome:"
                    placeholder="Digite seu nome" 
                    size="lg" mt={4} 
                    name="name" 
                    value={values.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name} 
                    touched={touched.name}
                    disabled={isSubmitting}
                />
                <Input 
                    label = "Telefone:"
                    placeholder="Digite seu telefone" 
                    size="lg" mt={4} 
                    name="phone" 
                    value={values.phone} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="(99) 9 9999-9999"
                    error={errors.phone} 
                    disabled={isSubmitting}
                />
              </>
              </ModalTimeBlock>}
        </Button>
    )
}