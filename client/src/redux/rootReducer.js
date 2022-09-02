const initialState = {
    loading: false,
    cartItems: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {   
        case "ADD_TO_CART":
            return {
                ...state, cartItems: [...state.cartItems, action.payload]
            };
        case "UPDATE_CART":
            return {
                ...state, cartItems: state.cartItems.map(product => product._id === action.payload._id ? {...product, quantity: action.payload.quantity} : product)
            }
        default: return state;
    }
}

export default rootReducer;