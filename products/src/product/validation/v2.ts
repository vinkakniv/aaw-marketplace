import { z } from 'zod';

const uuidSchema = z.string().uuid('Invalid UUID format');

export const getProductByIdSchemaV2 = z.object({
  params: z.object({
    id: uuidSchema
  })
});

export const getManyProductDatasByIdSchemaV2 = z.object({
  body: z.object({
    product_ids: z.array(uuidSchema).min(1, 'At least one product ID is required')
  })
});

export const getProductByCategorySchemaV2 = z.object({
  params: z.object({
    categoryId: uuidSchema
  })
});

export const createProductSchemaV2 = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be positive'),
    category_id: uuidSchema,
    stock: z.number().int().min(0, 'Stock cannot be negative'),
    is_active: z.boolean().optional()
  })
});

export const createCategorySchemaV2 = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be less than 50 characters'),
    description: z.string().optional()
  })
});

export const editProductSchemaV2 = z.object({
  params: z.object({
    id: uuidSchema
  }),
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    price: z.number().positive('Price must be positive').optional(),
    category_id: uuidSchema.optional(),
    stock: z.number().int().min(0, 'Stock cannot be negative').optional(),
    is_active: z.boolean().optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  })
});

export const editCategorySchemaV2 = z.object({
  params: z.object({
    categoryId: uuidSchema
  }),
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be less than 50 characters').optional(),
    description: z.string().optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  })
});

export const deleteProductSchemaV2 = z.object({
  params: z.object({
    id: uuidSchema
  })
});

export const deleteCategorySchemaV2 = z.object({
  params: z.object({
    categoryId: uuidSchema
  })
}); 