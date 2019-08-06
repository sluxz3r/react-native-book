const initialState = {
    postList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};
//manage state 
const post = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'POST_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'POST_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                postList: [state.bookList, action.payload.data[0]]
            };
        default:
            return state;
    }
};

export default post;