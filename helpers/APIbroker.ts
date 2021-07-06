import Axios from 'axios'
interface APIConfigInterface {
    baseURL?: string, // mandatory but can be set after initialization (public parameter in config)
    authToken?: string | boolean // eighter bearer token or false (or omitted)
}
interface PostObjInterface {
    endpoint: string,
    method?: string, // if omitted, get is asumed
    payload?: object
}
export class APIBroker {
    config:APIConfigInterface;
    $axios:any = Axios;
    constructor (configobj:APIConfigInterface) {
      this.config = configobj
    }

    async ask (PostObj:PostObjInterface) {
      // const url = this.config.baseURL + PostObj.endpoint;
      const header = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
      if (this.config.authToken) { Object.assign(header, { Authorization: 'Bearer ' + this.config.authToken }) }
      try {
        const response:any = await this.$axios({
          baseURL: this.config.baseURL,
          url: PostObj.endpoint,
          method: PostObj.method,
          headers: header,
          params: {},
          data: PostObj.payload,
          timeout: 0, // default is `0` (no timeout)
          withCredentials: false // default
        })
          .then((r:any) => {
            return { commitkey: 'SET_RESPONSE', payload: r }
          })
          .catch((error:object) => {
            return { commitkey: 'SET_ERROR', payload: error }
          })

        if (response) {
          return response
        } else {
          throw ` - something went wrong with the response data... ${response}`
        }
      } catch (e) {
        throw ` - something went wrong with connection to the server: ${e}`
      }
    }
};
