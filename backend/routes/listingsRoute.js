import express from 'express';
import listingsAndReviews from '../models/listingsModel';
// import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const location = req.query.location ? {
        "address.country": req.query.location
    } : {};
    const searchKeyword = req.query.searchByName ? {
        name: {
            $regex: req.query.searchByName,
            $options: 'i'
        }
    } : {};
    // const sortOrder = req.query.sortOrder ?
    //     (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
    //     :
    //     { _id: -1 };
    // const products = await Product.find({ ...location, ...searchKeyword }).sort(sortOrder);
    const query = { ...location, ...searchKeyword };
    let page = req.query.page;
    let skip = 20 * (page - 1)
    const limit = parseInt(req.query.listingsLimit);
    const length = await listingsAndReviews.countDocuments(query);
    const products = await listingsAndReviews.find(query).skip(skip).limit(limit);
    res.send({ products, length });
});

router.get("/locations", async (req, res) => {
    const location = await listingsAndReviews.distinct('address.country');
    res.send(location);
});

router.get("/filterType", async (req, res) => {
    const property_type = await listingsAndReviews.distinct('property_type');
    const type_of_place = await listingsAndReviews.distinct('room_type');
    const bed_type = await listingsAndReviews.distinct('bed_type');
    const cancellation_policy = await listingsAndReviews.distinct('cancellation_policy');

    res.send({ cancellation_policy, type_of_place, property_type, bed_type, });
});

router.get("/test", async (req, res) => {
    // const data = await listingsAndReviews.distinct('address.market');
    const data = await listingsAndReviews.find({ 'address.country': "Australia" }).distinct('address.street');

    res.send({ data });
});
// router.get("/:id", async (req, res) => {
//     const product = await Listings.findOne({ _id: req.params.id });
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: "Listings Not Found." });
//     }
// });

// router.put("/:id", isAuth, isAdmin, async (req, res) => {
//     const productId = req.params.id;
//     const product = await Listings.findById(productId);
//     if (product) {
//         product.name = req.body.name;
//         product.price = req.body.price;
//         product.image = req.body.image;
//         product.brand = req.body.brand;
//         product.category = req.body.category;
//         product.countInStock = req.body.countInStock;
//         product.description = req.body.description;
//         const updatedProduct = await product.save();
//         if (updatedProduct) {
//             return res.status(200).send({ message: 'Listings Updated', data: updatedProduct });
//         }
//     }
//     return res.status(500).send({ message: ' Error in Updating Listings.' });

// });

// router.delete("/:id", isAuth, isAdmin, async (req, res) => {
//     const deletedProduct = await Listings.findById(req.params.id);
//     if (deletedProduct) {
//         await deletedProduct.remove();
//         res.send({ message: "Listings Deleted" });
//     } else {
//         res.send("Error in Deletion.");
//     }
// });


// router.post("/", isAuth, isAdmin, async (req, res) => {
//     const product = new Listings({
//         name: req.body.name,
//         price: req.body.price,
//         image: req.body.image,
//         brand: req.body.brand,
//         category: req.body.category,
//         countInStock: req.body.countInStock,
//         description: req.body.description,
//         rating: req.body.rating,
//         numReviews: req.body.numReviews,
//     });
//     const newProduct = await product.save();
//     if (newProduct) {
//         return res.status(201).send({ message: 'New Listings Created', data: newProduct });
//     }
//     return res.status(500).send({ message: ' Error in Creating Listings.' });
// })


export default router;