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

    interface UserCartUpdateInterface {
        id: string,
        email: string,
        cart: ProductCart[],
    }

    const handleUserCartUpdate = async (userCartUpdateData: UserCartUpdateInterface) => {
        if(!userCartUpdateData.cart) { return };
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

    interface UserAddressUpdateInterface {
        id:          string
        email:       string
        name:        string
        street:      string
        number:      string
        complement:  string
        district:    string
        city:        string
        state_abbr:  string
        postal_code: string
    }

    const handleUserAddressUpdate = async (userAddressUpdateData: UserAddressUpdateInterface) => {
        const isEmpty = Object.values(userAddressUpdateData).some(x => x !== null && x !== '');
        if(isEmpty) { return };
        const requestData: RequestData = {
            url: `http://localhost:8080/user/address`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userAddressUpdateData)
        };
        const result = await HttpRequest<UserAddressUpdateInterface>(requestData);
        return result;
    }

    return {
        handleUserLogin,
        handleUserCartUpdate,
        handleUserAddressUpdate,
    }
}