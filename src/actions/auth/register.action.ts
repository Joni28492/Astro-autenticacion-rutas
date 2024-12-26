


import { firebase } from "@firebase/config"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth"


export const registerUser =  defineAction({
    accept: 'form',
    input: z.object({
        name:z.string().min(2),
        email:z.string().email(),
        password:z.string().min(6),
        remember_me: z.boolean().optional(),
    }),

    handler: async ({name, email, password, remember_me}, {cookies}) => {


        // Cookies
        if(remember_me){
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
                path: '/',  // zona de validez de la cookie
            })
        }else{
            cookies.delete('email', {
                path: '/'
            })
        }

        //creacion usuario
        try {

            const user = await createUserWithEmailAndPassword( firebase.auth, email, password )
            // Actualizar el nombre (displayName)
            updateProfile(firebase.auth.currentUser!, {displayName: name});


            //verificar el correo electronico
            await sendEmailVerification(firebase.auth.currentUser!, {
                // url: `https:///protected?emailVerified=true`, //redireccion al hacer click en verificacion
                url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`, //redireccion al hacer click en verificacion
            })


            return {
                uid: user.user.uid,
                email: user.user.email
            };
        } catch (error) {
            const firebaseError = error as AuthError
            if(firebaseError.code === 'auth/email-already-in-use'){ //son errores de firebase
                throw new Error('El correo ya esta en uso')

            }
            throw new Error('Auxilio algo salio mal!!!')
        }



        return {ok:true, msg: 'Usuario creado' };
    }
})