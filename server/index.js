const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const MONGO_URL = 'mongodb+srv://ravivarmara22:UbS44TKxGJoukUAB@cluster0.pi1tleg.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true,}).then(() => console.log('Successfully Connected to MongoDB')).catch((err) => console.error('Failed to connect to MongoDB:', err));

const productSchema = new mongoose.Schema({
    productName: String,
    productCode: String,
    productCategory: String,
    productPrice: Number,
    productTotalStockQtyInHand: Number,
    productDate: { type: Date, default: Date.now }
})

const Product = mongoose.model('Product',productSchema);

app.post('/api/saveProduct', async (req,res) => {
    try{
        const productData = req.body;
        const product = new Product(productData);
        await product.save();

        res.status(200).json({ message: 'Product saved successfully.' });
    }
    catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Error saving product.' });
      }
});

app.get('/api/productOptions',async (req,res) => {
    try{
        const products = await Product.find({}, 'productName');
        const productName = products.map(product => product.productName);
        res.json(productName);
    }catch(error){
        console.error('Error fetching product names:', error);
        res.status(500).json({ message: 'Error fetching product names.' });
    }
})


// app.get('/api/getProducts', async (req, res) => {
//     const {searchQuey, fromDate, toDate} = req.query;
//     const isValidDate = (dateString) => {
//         return !isNaN(Date.parse(dateString));
//     };

//     try{
//         let quey = {}
//         if(searchQuey){
//             query.productName = { $regex: new RegExp(searchQuery, 'i') };
//         }
//         if (fromDate && isValidDate(fromDate) && toDate && isValidDate(toDate)){
//             query.productDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
//         }
//         else{
//             res.status(400).json({ message: 'Invalid date format for fromDate.' });
//             return;
//         }
//         const products = await Product.find(query);
//         res.json(products);
//     }
//     catch(error){
//         console.error('Error fetching products:', error);
//         res.status(500).json({ message: 'Error fetching products.' });
//     }
// })


app.get('/api/getProducts', async (req, res) => {
    console.log(req.query);
    const { searchQuery, fromDate, toDate } = req.query;
    
    const isValidDate = (dateString) => {
        return !isNaN(Date.parse(dateString));
    };

    try {
        let query = {};

        if (searchQuery) {
            query.productName = { $regex: new RegExp(searchQuery, 'i') };
        }

        if (fromDate && toDate && isValidDate(fromDate) && isValidDate(toDate)) {
            query.productDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
        } else {
            res.status(400).json({ message: 'Invalid date format for fromDate or toDate.' });
            return;
        }

        const products = await Product.find(query);
        console.log(products);
        if (products.length === 0) {
            res.status(404).json({ message: 'No products found matching the criteria.' });
            return;
        }
        else{
            alert("Get Success")
            res.send(products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products.' });
    }
});

app.listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`);});


