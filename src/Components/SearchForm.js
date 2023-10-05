import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import React from "react";
import { getProductDetails } from "../redux/action";

const SearchForm = () => {
    const dispatch = useDispatch();
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/productOptions')
            .then(response => {
                setAutocompleteOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching options:', error);
            });
    }, []);

    const handleSearchChange = (event, value) => {
        setSearchQuery(value);
      };
    
      const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
      };
    
      const handleToDateChange = (event) => {
        setToDate(event.target.value);
      };
    
      const handleSearch = () => {
        dispatch(getProductDetails(searchQuery, fromDate, toDate));
      };
      const getOptionLabel = (option) => option;
    return (
        <div style={{ marginBottom: '20px' }}>
            <Autocomplete
                options={autocompleteOptions}
                getOptionLabel={(getOptionLabel)}
                value={searchQuery}
                onChange={handleSearchChange}
                renderInput={(params) => (
                    <TextField {...params} label="Search by Product Name or Product Code" variant="outlined" />
                )}
            />
            <TextField
                id="from-date"
                label="From Date"
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="to-date"
                label="To Date"
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export default SearchForm;