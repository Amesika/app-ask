import AsyncStorage from '@react-native-async-storage/async-storage';
import setArrayPokemonCaptured from './arrayPokemonCaptureReducer'
import { combineReducers, createStore } from 'redux'
import { persistReducer } from 'redux-persist';
import setCurrentUserID from './userIDReducer';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    arrayPokemonCaptured: setArrayPokemonCaptured,
    userIDStore: setCurrentUserID
});

export default createStore(persistReducer(rootPersistConfig, rootReducer))