import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';

// CRUD operations: Create, Read, Update, Delete

/**
 * Handles the creation of a new product.
 * Extracts data from the request body, saves it to the database, and returns the created product.
 * @param req - Express request object containing product details in the request body.
 * @param res - Express response object used to return the created product or an error message.
 */
export async function createProduct(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
        await connect();

        const product = new productModel(data);
        const result = await product.save();

        res.status(201).send(result);
    } catch (err) {
        res.status(500).send("Error creating product. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Retrieves all products from the database.
 * Sends back an array of products or an error message if retrieval fails.
 * @param req - Express request object.
 * @param res - Express response object used to return product data or an error message.
 */
export async function getAllProducts(req: Request, res: Response) {
    try {
        await connect();

        const result = await productModel.find({});

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving products. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Retrieves a single product by its ID.
 * Sends the product data if found, or an error message if not.
 * @param req - Express request object containing the product ID in the URL parameters.
 * @param res - Express response object used to return the product or an error message.
 */
export async function getProductById(req: Request, res: Response) {
    try {
        await connect();

        const id = req.params.id;
        const result = await productModel.findById(id);

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving product by ID. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Searches for products based on a query key and value.
 * Uses case-insensitive regex matching to find relevant products.
 * @param req - Express request object containing query parameters (key and value).
 * @param res - Express response object used to return matching products or an error message.
 */
export async function getProductsByQuery(req: Request, res: Response) {
    const key = req.params.key;
    const val = req.params.val;

    try {
        await connect();

        const result = await productModel.find({ [key]: { $regex: val, $options: 'i' } });

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send("Error retrieving products based on query. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Updates a product based on its ID.
 * Accepts updated product details in the request body and applies them to the specified product.
 * @param req - Express request object containing the product ID and updated data.
 * @param res - Express response object indicating success or failure of the update.
 */
export async function updateProductById(req: Request, res: Response) {
    const id = req.params.id;

    try {
        await connect();

        const result = await productModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send('Product with ID=' + id + ' not found. Update failed.');
        } else {
            res.status(200).send('Product successfully updated.');
        }
    } catch (err) {
        res.status(500).send("Error updating product by ID. Details: " + err);
    } finally {
        await disconnect();
    }
}

/**
 * Deletes a product by its ID.
 * Removes the product from the database and returns a success or failure message.
 * @param req - Express request object containing the product ID.
 * @param res - Express response object indicating whether the deletion was successful.
 */
export async function deleteProductById(req: Request, res: Response) {
    const id = req.params.id;

    try {
        await connect();

        const result = await productModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send('Product with ID=' + id + ' not found. Deletion failed.');
        } else {
            res.status(200).send('Product successfully deleted.');
        }
    } catch (err) {
        res.status(500).send("Error deleting product by ID. Details: " + err);
    } finally {
        await disconnect();
    }
}