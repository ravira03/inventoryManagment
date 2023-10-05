import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import React, {  useState } from 'react'
import {  useDispatch } from 'react-redux';
import { saveProduct } from '../redux/action';

const ProductForm = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        productName: '',
        productCode: '',
        productCategory: '',
        productPrice: '',
        productTotalStockQtyInHand: '',
    });

    const handleChange = (e) => {
        const{name,value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        const price = parseFloat(formValues.productPrice);
        const stockQty = parseInt(formValues.productTotalStockQtyInHand, 10);

        if (isNaN(price) || isNaN(stockQty)) {
            alert('Product price and stock quantity must be numeric.');
            return;
        }
        dispatch(
            saveProduct(formValues)
        )
        console.log('Form values dispatched to Redux:', formValues);
        e.preventDefault();
    };

    return (
        <form>
            <Box m={2}>
                <TextField
                label="Product Name"
                name="productName"
                value={formValues.productName}
                onChange={handleChange}
                fullWidth
                />
            </Box>
            <Box m={2}>
                <TextField
                label="Product Code"
                name="productCode"
                value={formValues.productCode}
                onChange={handleChange}
                fullWidth
                />
            </Box>
            <Box m={2}>
                <FormControl fullWidth>
                <InputLabel>Product Category</InputLabel>
                <Select
                    name="productCategory"
                    value={formValues.productCategory}
                    onChange={handleChange}
                >
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                </Select>
                </FormControl>
            </Box>
            <Box m={2}>
                <TextField
                label="Product Price"
                name="productPrice"
                value={formValues.productPrice}
                onChange={handleChange}
                fullWidth
                />
            </Box>
            <Box m={2}>
                <TextField
                label="Product Total Stock Qty In Hand"
                name="productTotalStockQtyInHand"
                value={formValues.productTotalStockQtyInHand}
                onChange={handleChange}
                fullWidth
                />
            </Box>
            <Box m={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
                </Button>
            </Box>
    </form>
    );
}

export default ProductForm;