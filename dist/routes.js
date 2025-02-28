"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("./controllers/productController");
const authController_1 = require("./controllers/authController");
const router = (0, express_1.Router)();
/**
 *
 */
router.get('/', (req, res) => {
    res.status(200).send('Welcome to the MENTS API');
});
// auth
router.post('/user/register', authController_1.registerUser);
router.post('/user/login', authController_1.loginUser);
// create
router.post('/products', authController_1.verifyToken, productController_1.createProduct);
// gets
router.get('/products', productController_1.getAllProducts);
router.get('/products/:id', productController_1.getProductById);
router.get('/products/query/:key/:val', productController_1.getProductsByQuery);
// update + delete
router.put('/products/:id', authController_1.verifyToken, productController_1.updateProductById);
router.delete('/products/:id', authController_1.verifyToken, productController_1.deleteProductById);
exports.default = router;
//# sourceMappingURL=routes.js.map