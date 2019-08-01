const initialState = {
	borrowedList: [],
	isLoading: false,
	isFulfilled: false,
	isRejected: false
};

const borrowed = (state = initialState, action) => {
	switch (action.type) {
		// GET ALL BOOKS
        case 'ALL_BORROWED_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'ALL_BORROWED_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'ALL_BORROWED_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                borrowedList : action.payload.data.result,
            };
		default:
			return state;
	}
};

export default borrowed;