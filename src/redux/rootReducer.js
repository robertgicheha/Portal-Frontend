import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import appraisalReducer from "./appraisal/appraisalReducer";
// room to include more reducers to handle different modules

const rootReducer = combineReducers({
  user: userReducer,
  appraisal: appraisalReducer,
});

export default rootReducer;
