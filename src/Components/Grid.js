import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/action";

const Grid = () => {

    const dispatch = useDispatch();
    const storedProducts = useSelector((state)=> state.product.storedProducts);

    useEffect(() => {
        dispatch(getProductDetails({}));
    },[dispatch]);

    return(
        <Paper elevation={3}>
            <h2>Stored Product Details</h2>
            {/* <Grid container spacing = {1}>
               {
                storedProducts.map((product,index) => (
                    <Grid item xs={12} key={index}>
                        <div>
                            <strong>Product {index + 1}:</strong>
                            <br />
                            {JSON.stringify(product,null,2)}
                        </div>
                    </Grid>
                ))}
            </Grid> */}

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Inhand Quantity</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Stock Out</TableCell>
                            <TableCell>Stock In</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {storedProducts.map((product,index) => (
                            <TableRow key={index}>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>${product.productPrice}</TableCell>
                                <TableCell>{product.inhandQty}</TableCell>
                                <TableCell>{product.productId}</TableCell>
                                <TableCell>{product.stockout}</TableCell>
                                <TableCell>{product.stockIn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

 
export default Grid;