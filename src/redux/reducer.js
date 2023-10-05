import { createSlice } from '@reduxjs/toolkit'
import { getProductDetails } from './action';

const initialState = {
    productData: null,
    storedProducts: [],
    loading: false,
    error: null,
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        saveProductSuccess: (state, action) => {
            state.productData = action.payload;
            state.loading = false;
            state.error = null;
        },
        saveProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.storedProducts = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { saveProduct } = productSlice.actions;
export default productSlice;