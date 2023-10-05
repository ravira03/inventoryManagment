import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const saveProductSuccess = (data) => ({
  type: 'product/saveProductSuccess',
  payload: data,
});

const saveProductFailure = (error) => ({
  type: 'product/saveProductFailure',
  payload: error,
});

export const saveProduct = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/saveProduct', {
        ...productData,
        productData: new Date(),
      });
      if (response.status === 200) {
        alert("Saved Success!");
        dispatch(saveProductSuccess(response.data));
      }
      else {
        alert(response.status);
        dispatch(saveProductFailure("Error: Failed to save product"));
      }
    }
    catch (error) {
      alert(error);
      console.error('Error saving product:', error.message);
      dispatch(saveProductFailure("Error: Failed to save product"));
    }
  };
};

export const getProductDetails = (searchQuery, fromDate, toDate) => {
  console.log(searchQuery, fromDate, toDate)
  return async (dispatch) => {
    try {
      const params = new URLSearchParams();
      params.append('searchQuery', searchQuery);
      params.append('fromDate', fromDate);
      params.append('toDate', toDate);

      const response = await axios.get(`http://localhost:5000/api/getProducts?${params.toString()}`);

      if (response.status === 200) {
        alert("Request successful!");
        dispatch(saveProductSuccess(response.data));
      } else {
        alert(response.status);
        dispatch(saveProductFailure("Error: Failed to fetch products"));
      }
    } catch (error) {
      alert(error);
      console.error('Error fetching products:', error.message);
      dispatch(saveProductFailure("Error: Failed to fetch products"));
    }
  };
};


