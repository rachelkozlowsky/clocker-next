import { Button } from "@chakra-ui/button";
import {firebaseClient} from '../../config/firebase/client';

export const Agenda = () => {

    const logout = () => firebaseClient.auth().signOut()
   
    return(
        
        <div>
        <Button onClick={()=>logout()}>Sair</Button>
            
        </div>
        
    )
}