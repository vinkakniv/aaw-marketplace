import { Router } from 'express';
import * as HandlerV2 from './product.handler.v2';
import { validateRequest } from '@src/middleware/validate';
import {
    getProductByIdSchemaV2,
    getManyProductDatasByIdSchemaV2,
    getProductByCategorySchemaV2,
    createProductSchemaV2,
    createCategorySchemaV2,
    editProductSchemaV2,
    editCategorySchemaV2,
    deleteProductSchemaV2,
    deleteCategorySchemaV2
} from './validation/v2';
import { verifyJWT } from '../middleware/verifyJWT';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyJWT);

// V2 Routes with validation
router.get('/products', HandlerV2.getAllProductsV2Handler);
router.post('/products/bulk', validateRequest({ body: getManyProductDatasByIdSchemaV2 }), HandlerV2.getManyProductDatasByIdV2Handler);
router.get('/products/:id', validateRequest({ params: getProductByIdSchemaV2 }), HandlerV2.getProductByIdV2Handler);
router.get('/products/categories/:category_id', validateRequest({ params: getProductByCategorySchemaV2 }), HandlerV2.getProductByCategoryV2Handler);
router.post('/products', validateRequest({ body: createProductSchemaV2 }), HandlerV2.createProductV2Handler);
router.put('/products/:id', validateRequest({ params: deleteProductSchemaV2, body: editProductSchemaV2 }), HandlerV2.editProductV2Handler);
router.delete('/products/:id', validateRequest({ params: deleteProductSchemaV2 }), HandlerV2.deleteProductV2Handler);

router.get('/categories', HandlerV2.getAllCategoryV2Handler);
router.post('/categories', validateRequest({ body: createCategorySchemaV2 }), HandlerV2.createCategoryV2Handler);
router.put('/categories/:category_id', validateRequest({ params: deleteCategorySchemaV2, body: editCategorySchemaV2 }), HandlerV2.editCategoryV2Handler);
router.delete('/categories/:category_id', validateRequest({ params: deleteCategorySchemaV2 }), HandlerV2.deleteCategoryV2Handler);

// Apply error handling middleware
router.use(errorHandler);

export default router;