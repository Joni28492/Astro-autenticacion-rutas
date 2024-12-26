//no funciona por el nombre del archivo
//esto es una de las formas, es una demostracion

import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/protected']


export const onRequest = defineMiddleware(({url, request}, next) => {

    const authHeaders = request.headers.get('authorization') ?? '' //esta en base 64
    console.log(authHeaders);

    if( privateRoutes.includes( url.pathname ) ){
        return checkLocalAuth(authHeaders, next)
       
    }

    return next()

});



const checkLocalAuth = (authHeaders:string, next: MiddlewareNext) => {

    if(authHeaders){
        const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass'
        const decodeValue = atob(authValue).split(":")
        const [user, password] = decodeValue
    
        if(user === 'admin' && password==='admin'){
            return next()
        }
       
    }


    return new Response("Auth Required", {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic real="Secure Area"'
        }
    })

}