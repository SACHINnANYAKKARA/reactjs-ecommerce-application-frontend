import {base_url} from "../../constants";
import {GET_PRODUCTS} from "./type";

export const getProducts = () => {
    return dispatch => {
        fetch(`${base_url}/products`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                // console.log(jsonResponse);
                dispatch({
                    type: GET_PRODUCTS,
                    products: jsonResponse
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}
