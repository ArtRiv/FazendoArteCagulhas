import { HttpRequest, RequestData } from "@/services"
import { ProductCart } from "@/types/product";

export function useBackend() {

    interface UserLoginData {
        id: string,
        name: string,
        email: string,
    }

    const handleUserLogin = async (userLoginData: UserLoginData) => {
        const requestData: RequestData = {
            url: `http://localhost:8080/user`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoginData)
        };
        const result = await HttpRequest<UserLoginData>(requestData);
        return result;
    }

    // const userUpdateDataMock: UserUpdateData = {
    //     id: 'teste',
    //     cart: [
    //         {
    //             id: 'produto1',
    //             image: 'link',
    //             price: 110.90,
    //             purchase_count: 2,
    //             quantity: 3,
    //             rating: 5,
    //             title: 'Frieren'
    //         },
    //     ],
    //     transaction: {
    //         id: 'transação',
    //         price: 120.90,
    //         shipping_label: {
    //             id: 'etiqueta de envio',
    //             price: 10.00,
    //             status: ShippingLabelStatus.COMPLETED,
    //         },
    //         status: TransactionStatus.COMPLETED,
    //     },
    //     address: {
    //         city: 'paioça',
    //         complement: '1007 A',
    //         district: 'Pgani',
    //         name: 'Arthur',
    //         number: '280',
    //         state_abbr: 'SC',
    //         street: 'Capri',
    //         zipCode: '88132229',
    //     }
    // }

    interface UserCartUpdateInterface {
        id: string,
        email: string,
        cart: ProductCart[],
    }

    const handleUserCartUpdate = async (userCartUpdateData: UserCartUpdateInterface) => {
        const requestData: RequestData = {
            url: `http://localhost:8080/user/cart`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCartUpdateData)
        };
        const result = await HttpRequest<UserCartUpdateInterface>(requestData);
        return result;
    }

    return {
        handleUserLogin,
        handleUserCartUpdate,
    }
}