import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header = () => {

    // routing 
    // const router = useRouter(); no es necesaria puesto que ha sido reemplazada por location.href=('/') debido a que cuando subiamos un archivo y dabamos en el logo el state se limpiaba, pero no el dom, por tanto para evitar entrar con el dom a hacer movimientos simplemente limpiamos el state y recargamos, habrá una pequeña perdida en performance pero será la manera más simple

      // Extraer el Usuario autenticado del Storage 
    const AuthContext = useContext( authContext );
    const { usuario,  cerrarSesion, autenticado } = AuthContext;

      // Context de la aplicación
    const AppContext = useContext( appContext );
    const { limpiarState } = AppContext;

    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            const {cerrarSesion } = AuthContext
            const { limpiarState} = AppContext
            cerrarSesion()
            limpiarState()
        }else{
            const {usuarioAutenticado} = AuthContext
            usuarioAutenticado()
        }
    }, [autenticado]);

    const redireccionar = () => {
        location.href=('/')
    }

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Image 
                onClick={() => redireccionar() }
                className="w-64 mb-8 md:mb-0 cursor-pointer self-center" src="/fire.svg"
                width="220px"
                height="70px" 
                alt= "Logotipo"
            />
     


            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2 bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase">Hola {usuario.nombre}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={() =>{ cerrarSesion(), redireccionar()} }
                            >Cerrar Sesión</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                            </Link>
                            <Link href="/crearcuenta">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
                            </Link>
                        </>
                    )
                }

            </div>
        </header>
     );
}
 
export default Header;