import express from 'express';
import { validate } from '@src/shared/middleware/validate';
import { verifyJWT } from '@src/shared/middleware/verifyJWT';
import * as Validation from './validation';
import * as Handler from './tenant.handler';

const router = express.Router();

router.get('/:tenant_id', verifyJWT, validate(Validation.getTenantSchema), Handler.getTenantHandler);
router.post('', verifyJWT, validate(Validation.createTenantSchema), Handler.createTenantHandler);
router.put('/:old_tenant_id', verifyJWT, validate(Validation.editTenantSchema), Handler.editTenantHandler);
router.delete('', verifyJWT, validate(Validation.deleteTenantSchema), Handler.deleteTenantHandler);

export default router;
