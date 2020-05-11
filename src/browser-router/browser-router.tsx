/*
    Bindings for Router Component
*/

import React from 'react';
import {BrowserRouter as ReactRouterBrowserRouter} from 'react-router-dom';

export default function BrowserRouter(props: any){

    return(
        <>
            <ReactRouterBrowserRouter>
                {props.children}
            </ReactRouterBrowserRouter>
        </>
    )
}