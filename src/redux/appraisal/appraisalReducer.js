import { SET_LOADING, CLEAR_STATE } from "../GeneralTypes";
import {
  GET_OBJECTIVES_SUCCESS,
  GET_OBJECTIVES_FAILURE,
  GET_OBJECTIVE_SUCCESS,
  GET_OBJECTIVE_FAILURE,
  UPDATE_OBJECTIVE_SUCCESS,
  UPDATE_OBJECTIVE_FAILURE,
} from "./appraisalTypes";

const initialState = {
  loading: false,
  objectives: [],
  objective: {},
  error: false,
};

const objectiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_STATE:
      return {
        ...state,
        loading: false,
        objectives: [],
        objective: {},
        error: false,
      };
    case GET_OBJECTIVES_SUCCESS:
      return {
        ...state,
        loading: false,
        objectives: action.payload,
        error: "",
      };
    case GET_OBJECTIVES_FAILURE:
      return {
        ...state,
        loading: false,
        objectives: [],
        error: true,
      };
    case GET_OBJECTIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        objective: action.payload,
        error: "",
      };
    case GET_OBJECTIVE_FAILURE:
      return {
        ...state,
        loading: false,
        objectives: [],
        error: true,
      };
    case UPDATE_OBJECTIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        objective: action.payload,
        error: false,
      };
    case UPDATE_OBJECTIVE_FAILURE:
      return {
        ...state,
        loading: false,
        objective: {},
        error: true,
      };
    default:
      return state;
  }
};

export default objectiveReducer;
