"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductsByQuery = getProductsByQuery;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
const productModel_1 = require("../models/productModel");
const database_1 = require("../repository/database");
// CRUD operations: Create, Read, Update, Delete
/**
 * Handles the creation of a new product.
 * Extracts data from the request body, saves it to the database, and returns the created product.
 * @param req - Express request object containing product details in the request body.
 * @param res - Express response object used to return the created product or an error message.
 */
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            yield (0, database_1.connect)();
            const product = new productModel_1.productModel(data);
            const result = yield product.save();
            res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send("Error creating product. Details: " + err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Retrieves all products from the database.
 * Sends back an array of products or an error message if retrieval fails.
 * @param req - Express request object.
 * @param res - Express response object used to return product data or an error message.
 */
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connect)();
            const result = yield productModel_1.productModel.find({});
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send("Error retrieving products. Details: " + err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Retrieves a single product by its ID.
 * Sends the product data if found, or an error message if not.
 * @param req - Express request object containing the product ID in the URL parameters.
 * @param res - Express response object used to return the product or an error message.
 */
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connect)();
            const id = req.params.id;
            const result = yield productModel_1.productModel.findById(id);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send("Error retrieving product by ID. Details: " + err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Searches for products based on a query key and value.
 * Uses case-insensitive regex matching to find relevant products.
 * @param req - Express request object containing query parameters (key and value).
 * @param res - Express response object used to return matching products or an error message.
 */
function getProductsByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = req.params.key;
        const val = req.params.val;
        try {
            yield (0, database_1.connect)();
            const result = yield productModel_1.productModel.find({ [key]: { $regex: val, $options: 'i' } });
            res.status(200).send(result);
        }
        catch (err) {
            res.status(500).send("Error retrieving products based on query. Details: " + err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Updates a product based on its ID.
 * Accepts updated product details in the request body and applies them to the specified product.
 * @param req - Express request object containing the product ID and updated data.
 * @param res - Express response object indicating success or failure of the update.
 */
function updateProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield (0, database_1.connect)();
            const result = yield productModel_1.productModel.findByIdAndUpdate(id, req.body);
            if (!result) {
                res.status(404).send('Product with ID=' + id + ' not found. Update failed.');
            }
            else {
                res.status(200).send('Product successfully updated.');
            }
        }
        catch (err) {
            res.status(500).send("Error updating product by ID. Details: " + err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
/**
 * Deletes a product by its ID.
 * Removes the product from the database and returns a success or failure message.
 * @param req - Express request object containing the product ID.
 * @param res - Express response object indicating whether the deletion was successful.
 */
function deleteProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield (0, database_1.connect)();
            const result = yield productModel_1.productModel.findByIdAndDelete(id);
            if (!result) {
                res.status(404).send('Product with ID=' + id + ' not found. Deletion failed.');
            }
            else {
                res.status(200).send('Product successfully deleted.');
            }
        }
        catch (err) {
            res.status(500).send("Error deleting product by ID. Details: " + err);
        }
        finally {
            yield (0, database_1.disconnect)();
        }
    });
}
//# sourceMappingURL=productController.js.map