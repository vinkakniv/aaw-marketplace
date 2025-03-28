import { Request, Response, NextFunction } from 'express';
import * as Service from './services';
import { NotFoundError } from '../middleware/errorHandler';

export const getAllProductsV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Service.getAllProductsService();
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const getAllCategoryV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Service.getAllCategoriesService();
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await Service.getProductByIdService(id);
    if (!response.data) {
      throw new NotFoundError('Product not found');
    }
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const getManyProductDatasByIdV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Service.getManyProductDatasByIdService(req.body.product_ids);
    res.json({
      status: 'success',
      data: { products }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByCategoryV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_id } = req.params;
    const response = await Service.getProductByCategoryService(category_id);
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const createProductV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, quantity_available, category_id } = req.body;
    const response = await Service.createProductService(name, description, price, quantity_available, category_id);
    return res.status(201).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const createCategoryV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const response = await Service.createCategoryService(name);
    return res.status(201).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const editProductV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity_available, category_id } = req.body;
    const response = await Service.editProductService(id, name, description, price, quantity_available, category_id);
    if (!response.data) {
      throw new NotFoundError('Product not found');
    }
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const editCategoryV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_id } = req.params;
    const { name } = req.body;
    const response = await Service.editCategoryService(category_id, name);
    if (!response.data) {
      throw new NotFoundError('Category not found');
    }
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const deleteProductV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await Service.deleteProductService(id);
    if (!response.data) {
      throw new NotFoundError('Product not found');
    }
    return res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryV2Handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_id } = req.params;
    const response = await Service.deleteCategoryService(category_id);
    if (!response.data) {
      throw new NotFoundError('Category not found');
    }
    return res.status(200).send({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
}; 