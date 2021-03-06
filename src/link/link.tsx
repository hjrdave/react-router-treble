/*
  Bindings for the Link Component
  - allows for prefetching dynamic imports and api routes.
*/
import React from 'react';
import { matchPath, Link as ReactRouterLink } from "react-router-dom";
import {useTreble} from "treble-gsm";
import {prefetch} from 'treble-fetch';


interface Props{
  to: string | any,
  prefetch?: string[],
  children: React.ReactNode,
  [key: string]: any
}

export default function Link(props: Props){
    const {to, prefetch: prefetchProp, children} = props;

    const [{trebleFetchRouteIndex, trebleFetchCache}, Store] = useTreble();

    //find the component attached to Route
    const findComponentForRoute = (path: string, routes: {path: string, exact: boolean, component: JSX.Element}[]) => {
      const matchingRoute = routes.find((route) =>
        matchPath(path, {
          path: route.path,
          exact: (route.exact !== undefined) ? route.exact : false
        })
      );
      return matchingRoute ? matchingRoute.component : null;
    };
    
    //preload Route chunk on mouseover
    const preloadRouteComponent = (path: string, globalCache: {path: string, exact: boolean, component: JSX.Element}[]) => {
      const component = findComponentForRoute(path, globalCache);
      if (component && (component as any).preload) {
        (component as any).preload();
      }
      
    };

    //prefetch specified api routes on mouseover
    const prefetchData = async (routeArray: string[]) => {
        
      //Compares cached routes to routeArray and returns false if no new routes are added
      let routeCheck = routeArray.map((route) => { 
        if(!(route in trebleFetchCache)){
          return true;
        }
        return false;
      }).includes(false);
      
      //if routeCheck is true it will continue the prefetching
      if(!(routeCheck)){
        //maps promises first and then resolves
        let cachedData = Promise.all(
          routeArray?.map(async (route: string) => {
            if(!(route in trebleFetchCache)){
              let prefetchedRoute = await prefetch(route);
              return {
                ...trebleFetchCache,
                [route]: prefetchedRoute
              }
            }
            return {
              ...trebleFetchCache
            }
          })
        );

        //waits for promises to resolve
        let resolvedRoutes = await cachedData;

        //update treble fetch cache in treble store
        Store.update('updateTrebleFetchCache', resolvedRoutes[0]);
      }
    }
    return(
        <>
            <ReactRouterLink onMouseEnter={() => {
              preloadRouteComponent(to, trebleFetchRouteIndex); 
              (prefetchProp) ? prefetchData(prefetchProp) : null;
            }} 
            {...props}
            >
              {children}
            </ReactRouterLink>
        </>
    )
}