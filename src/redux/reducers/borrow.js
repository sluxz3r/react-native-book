const initialState = {
	borrowList: [],
	isLoading: false,
	isFulfilled: false,
	isRejected: false
};

const borrow = (state = initialState, action) => {
	switch (action.type) {
		// GET ALL BOOKS
        case 'ALL_BORROW_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'ALL_BORROW_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'ALL_BORROW_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                borrowList : action.payload.data.result,
            };

		case 'GET_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'GET_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'GET_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: action.payload.data.result
			};
		// USER BORROW
		case 'USER_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'USER_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'USER_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: action.payload.data.result
			};
		//post borrow
		case 'POST_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'POST_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'POST_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: [state.borrowList, action.payload.data[0]]
			};

		case 'UPDATE_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'UPDATE_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'UPDATE_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: [state.borrowList, action.payload.data[0]]
			};
		default:
			return state;
	}
};

export default borrow;