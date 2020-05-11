/*
    Bindings for Route Component
*/

import React from 'react';
import {Route as ReactRouterRoute} from 'react-router-dom';

interface Props{
    children?: JSX.Element | JSX.Element[],
    path: string,
    exact?: boolean,
    render?: () => React.LazyExoticComponent<any>,
    component?: React.LazyExoticComponent<any>,
    [key: string]: any
}

export default function Route(props: Props){

    return(
        <>
            <ReactRouterRoute {...props}/>
        </>
    )
}