/*
    Bindings for Switch Component
    - Allows for React Fragment support
        - https://github.com/ReactTraining/react-router/issues/5785
    - Creates a RouteIndex and saves to Treble Store
*/

import React, { Fragment, Suspense, useEffect } from 'react';
import { Switch as ReactRouterSwitch, useHistory, useLocation, useParams } from 'react-router-dom';
import { useTreble } from 'treble-gsm';

const flatten = (target: any, children: any) => {
  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === Fragment) {
        flatten(target, (child.props as any).children);
      } else {
        target.push(child);
      }
    }
  });
}

function FragmentSupportingSwitch(props: any) {
  const flattenedChildren: any = [];
  flatten(flattenedChildren, props.children);
  return React.createElement.apply(React, [ReactRouterSwitch, null].concat(flattenedChildren) as any);
}

interface Props {
  lazy?: boolean,
  children: any,
  [key: string]: any
}
export default function Switch(props: Props) {
  const [{ }, dispatch, Store] = useTreble();

  //creates a routeIndex for Link prefetching
  const routeIndex = props.children.map((child: any) => {
    const { path, exact, prefetch, children } = child.props;
    return {
      path: path || null,
      exact: exact || null,
      component: children.type || prefetch.comp || null,
      prefetch: prefetch || null
    }

  })

  //save routeIndex to Store
  useEffect(() => {
    Store.update('updateTrebleFetchRouteIndex', routeIndex);
  }, []);

  //save React Router data to global state
  const location = useLocation();
  const history = useHistory();
  //const params = useParams();

  //Location
  useEffect(() => {
    Store.update('updateReactRouterLocation', location);
  }, [location]);

  //History
  useEffect(() => {
    Store.update('updateReactRouterHistory', history);
  }, [location]);

  //Params
  // useEffect(() => {
  //   const params = useParams();
  //   updateStore('updateReactRouterParams', params, dispatch);
  // }, [location]);

  return (
    <>
      {
        <Suspense fallback={''}>
          <FragmentSupportingSwitch {...props} />
        </Suspense>
      }
    </>
  )
}

