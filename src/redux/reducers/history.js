const initialState = {
	historyList: [],
	isLoading: false,
	isFulfilled: false,
	isRejected: false
};

const historyBorrow = (state = initialState, action) => {
	switch (action.type) {
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
				historyList: action.payload.data.result
			};
		default:
			return state;
	}
};

export default historyBorrow;