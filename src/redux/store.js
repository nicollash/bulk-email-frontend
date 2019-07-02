import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import startupMiddleware from './middlewares/startupMiddleware'
import authMiddleware from './middlewares/authMiddleware'
import auth from './reducers/authReducer'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    })
    : compose

const config = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  auth
})

const rootPersistReducer = combineReducers({
  auth
})

const appReducer = persistReducer(config, rootPersistReducer)

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      startupMiddleware,
      authMiddleware,
      thunk
    )
  )
)

const persistorStore = createStore(
  appReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      startupMiddleware,
      authMiddleware,
      thunk
    )
  )
)

export const persistor = persistStore(persistorStore)

export default store
