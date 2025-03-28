import { db } from '@src/db';
import { categories } from '@db/schema/categories';
import { products } from '@db/schema/products';
import { eq } from 'drizzle-orm';
import { ValidationError } from '@src/middleware/errorHandler';

export const getAllCategories = async () => {
  try {
    return await db.select().from(categories);
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
};

export const createCategory = async (data: {
  name: string;
  description?: string;
  tenant_id: string;
}) => {
  try {
    const [category] = await db.insert(categories).values(data).returning();
    return category;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};

export const updateCategory = async (id: string, data: Partial<{
  name: string;
  description: string;
}>) => {
  try {
    const [category] = await db
      .update(categories)
      .set({ ...data })
      .where(eq(categories.id, id))
      .returning();
    
    return category;
  } catch (error) {
    throw new Error('Failed to update category');
  }
};

export const deleteCategory = async (id: string) => {
  try {
    // Check if category has products
    const categoryProducts = await db.select().from(products).where(eq(products.category_id, id));
    if (categoryProducts.length > 0) {
      throw new ValidationError([{
        field: 'category',
        message: 'Cannot delete category with associated products'
      }]);
    }

    const [category] = await db.delete(categories).where(eq(categories.id, id)).returning();
    return category;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new Error('Failed to delete category');
  }
}; 