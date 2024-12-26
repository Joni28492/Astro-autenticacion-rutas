import { firebase } from "@firebase/config";
import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";


export const loginWithGoogle =  defineAction({
    accept: 'json',
    input: z.any(),

    handler: async (credntials) => {

        const credential = GoogleAuthProvider.credentialFromResult(credntials)
        if(!credential){
            throw new Error('Google SignIn Fallo')
        }
        await signInWithCredential(firebase.auth, credential!)
        //no importa lo que retornamos porque se inicia en el backend
        return {ok: true};
    }
})