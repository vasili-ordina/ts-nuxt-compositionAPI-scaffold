interface APIConfigInterface {
    baseURL: string
} 
interface PostObjInterface { 
    endpoint: string,
    payload?: object
}
interface APIBrokerCallbackInterface {
    commitkey: string,
    payload: object
}
import Axios from "axios";
export class APIBroker {
    config:APIConfigInterface;
    $axios:any = Axios;
    constructor (configobj:APIConfigInterface) {
        this.config = configobj;
    }
    async post(PostObj:PostObjInterface) {
        const url = this.config.baseURL + PostObj.endpoint;
        try {
            const response:any = await this.$axios
            .post(
            url,
            PostObj.payload || {},
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            })
            .then((r:any) => {
                return { commitkey: 'SET_RESPONSE', payload: r }
            })
            .catch((error:object) => {
                return { commitkey: 'SET_ERROR', payload: error };
            });

            if (response) {
                return response
            } else {
            throw ` - something went wrong with the response data... ${response}`
            }
        }
        catch(e) {
            throw ` - something went wrong with connection to the server: ${e}`
        }
    }
  };