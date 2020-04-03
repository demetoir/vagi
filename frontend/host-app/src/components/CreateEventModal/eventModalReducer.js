import {SET_ERROR_STATE, SET_PROPERTY} from "./eventModalActions.js";

const onSetProperty = (state, action) => ({...state, [action.property]: action.value});

const onSetErrorState = (state, action) => {
	const errorState = state.errorState;

	Object.assign(errorState, {[action.property]: action.value});

	return {...state, errorState};
};

const eventModalReducer = (state, action) => {
	const type = action.type;

	switch (type) {
		case SET_PROPERTY: {
			return onSetProperty(state, action);
		}
		case SET_ERROR_STATE: {
			return onSetErrorState(state, action);
		}
		default: {
			console.error(action);
			throw new Error(`unexpected action type: ${type}`);
		}
	}
};

export default eventModalReducer;
