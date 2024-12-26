import { firebase } from "@firebase/config";
import { defineAction } from "astro:actions"
import {signOut} from 'firebase/auth'


export const logout =  defineAction({
    accept:'json', // para tener acceso al ctx.cookie

    handler: async (_,{cookies}) => {
        return await signOut(firebase.auth)  ;
    }
})