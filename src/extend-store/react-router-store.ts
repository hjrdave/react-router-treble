import {createStore} from 'treble-gsm';

const ReactRouterStore = createStore([
    {
        action: 'updateReactRouterLocation',
        state: {
            reactRouterLocation: {}
        }
    },
    {
        action: 'updateReactRouterHistory',
        state: {
            reactRouterHistory: {}
        }
    },
    {
        action: 'updateReactRouterParams',
        state: {
            reactRouterParams: {}
        }
    }
]);

export default ReactRouterStore;