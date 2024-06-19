import React, { useState } from "react";
import Imagen from '../assets/Login.jpg'
import ImageProfile from '../assets/Perfil.jpg'
import { appFirebase } from '../pages/firebase-config';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)

const Login = () => {

    const [registrando, setRegistrando ] = useState(false)

    const functAutenticacion = async (e) =>{
       e.preventDefault();
       const correo = e.target.email.value;
       const Contraseña = e.target.password.value;
       
       if(registrando){
        try{
            await createUserWithEmailAndPassword(auth, correo, Contraseña)
        } catch(error){
            if(Contraseña.length<8){
                alert ("Asegurese que la contraseña tenga mas de 8 caracteres")
            }
        }
       }
       else{
        try{
            await signInWithEmailAndPassword(auth, correo, Contraseña)
        } catch(error) {
            alert("El correo o la contraseña son incorrectos")
        }
       }

    }

    return (
        <div className="container">
            <div className="row">
                
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                        <img src={ImageProfile} alt="Profile" className="estilo-profile" />
                            <form onSubmit={functAutenticacion}>
                                <input type="text" placeholder="Ingresar Email" className="cajatexto" id="email" />
                                <input type="password" placeholder="Ingresar Contraseña" className="cajatexto" id="password" />
                                <button className="btnform">{registrando ? "Registrate" : "Inicia Sesion"}</button>
                            </form>
                            <h4 className="texto">{registrando ? "Si ya tienes cuenta " : "No tienes cuenta? "}<button className="btnswicth" onClick={()=> setRegistrando(!registrando)}>{registrando ? "Iniciar sesion" : "Registrate"}</button></h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <img src={Imagen} alt="" className="tamaño-imagen"/>        
                </div>
            </div>
        </div>
    )
}

export default Login