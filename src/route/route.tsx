/*
    Bindings for Route Component
*/

import React from 'react';
import {Route as ReactRouterRoute} from 'react-router-dom';

export default function Route(props: any){
    return(
        <>
            <ReactRouterRoute {...props}/>
        </>
    )
}