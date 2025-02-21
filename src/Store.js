import {applyMiddleware,createStore} from 'redux';
import RootReducer from './Redux/Reducer/RootReducer';
import RootSaga from './Redux/SagaMiddleware/RootSaga';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const Store = createStore(RootReducer, applyMiddleware(sagaMiddleware))


sagaMiddleware.run(RootSaga)


export default Store;