import { db } from '@src/db';
import { products, Product } from '@db/schema/products';
import { eq, inArray } from 'drizzle-orm';
import { ServiceResponse } from '@src/types';

export const getAllProductsService = async (): Promise<ServiceResponse<Product[]>> => {
  try {
    const result = await db.select().from(products);
    return {
      status: 200,
      data: result
    };
  } catch (error) {
    console.error('Error in getAllProductsService:', error);
    throw error;
  }
};

export const getProductByIdService = async (id: string): Promise<ServiceResponse<Product | null>> => {
  try {
    const result = await db.select().from(products).where(eq(products.id, id));
    return {
      status: 200,
      data: result[0] || null
    };
  } catch (error) {
    console.error('Error in getProductByIdService:', error);
    throw error;
  }
};

export const getManyProductDatasByIdService = async (productIds: string[]): Promise<ServiceResponse<Product[]>> => {
  try {
    const result = await db.select().from(products).where(inArray(products.id, productIds));
    return {
      status: 200,
      data: result
    };
  } catch (error) {
    console.error('Error in getManyProductDatasByIdService:', error);
    throw error;
  }
};

export const getProductByCategoryService = async (categoryId: string): Promise<ServiceResponse<Product[]>> => {
  try {
    const result = await db.select().from(products).where(eq(products.category_id, categoryId));
    return {
      status: 200,
      data: result
    };
  } catch (error) {
    console.error('Error in getProductByCategoryService:', error);
    throw error;
  }
};

export const createProductService = async (
  name: string,
  description: string,
  price: number,
  quantityAvailable: number,
  categoryId: string
): Promise<ServiceResponse<Product>> => {
  try {
    const result = await db.insert(products).values({
      name,
      description,
      price,
      quantity_available: quantityAvailable,
      tenant_id: "default",
      category_id: categoryId
    }).returning();
    return {
      status: 201,
      data: result[0]
    };
  } catch (error) {
    console.error('Error in createProductService:', error);
    throw error;
  }
};

export const editProductService = async (
  id: string,
  name?: string,
  description?: string,
  price?: number,
  quantityAvailable?: number,
  categoryId?: string
): Promise<ServiceResponse<Product | null>> => {
  try {
    const updateData: Partial<Product> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (quantityAvailable) updateData.quantity_available = quantityAvailable;
    if (categoryId) updateData.category_id = categoryId;

    const result = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    return {
      status: 200,
      data: result[0] || null
    };
  } catch (error) {
    console.error('Error in editProductService:', error);
    throw error;
  }
};

export const deleteProductService = async (id: string): Promise<ServiceResponse<Product | null>> => {
  try {
    const result = await db.delete(products)
      .where(eq(products.id, id))
      .returning();
    return {
      status: 200,
      data: result[0] || null
    };
  } catch (error) {
    console.error('Error in deleteProductService:', error);
    throw error;
  }
}; 