/*
    Bindings for Switch Component
    - Allows for React Fragment support
        - https://github.com/ReactTraining/react-router/issues/5785
*/

import React, {Fragment} from 'react';
import { Switch } from 'react-router-dom';

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

export default function FragmentSupportingSwitch({children}: {children: any}) {
  const flattenedChildren: any = [];
  flatten(flattenedChildren, children);
  return React.createElement.apply(React, [Switch, null].concat(flattenedChildren) as any);
}

