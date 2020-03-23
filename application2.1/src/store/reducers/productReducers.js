import {GET_PRODUCTS} from "../actions/type";

const initState = {
    products: []
}

const productReducers = (state = initState, actions) => {

    switch (actions.type) {
        case GET_PRODUCTS:
            console.log(actions.products);
            state = {
                ...state,
                products: actions.products
            }
            break;
        default:
            break;
    }
    return state;
}

export default productReducers;
