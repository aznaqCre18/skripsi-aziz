import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['dataJadwalMapel']
}

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;