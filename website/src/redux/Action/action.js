import {ADDITEM,DELITEM,REMOVE} from '../Type'

export const addCart = (product) => {
    console.log(product);

    return {
        type: ADDITEM,
        payload: product
    };
};

// For Delete Item From Cart
export const delCart = (product) => {
    return {
        type: DELITEM,
        payload: product
    };
};
export const remCart = (product) => {
    return {
        type:REMOVE,
        payload: product
    };
};


  