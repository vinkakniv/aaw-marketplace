import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns";
import { deleteCartItem } from "../dao/deleteCartItem.dao";
import { User } from "@type/user";
import { deleteCartItemByProductId } from "../dao/deleteCartItemByProductId.dao";

export const deleteCartItemService = async (
    user: User,
    product_id: string,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Tenant ID not found').generate();
        }

        if (!user.id) {
            return new NotFoundResponse('User not found').generate();
        }

        const cart = await deleteCartItemByProductId(SERVER_TENANT_ID, user.id, product_id);

        return {
            data: cart,
            status: 200,
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}