export class ResponseError extends Error {
    response: Response;

    constructor(message: string, res: Response) {
      super(message);
      this.response = res;
    }
  }
  
  export const myFetch =  async (url: string, options: RequestInit): Promise<any> => {
    const res = await fetch(
      url,
      options
      )
    if (!res.ok) {

      throw new ResponseError(`${res.status}: ${res.statusText} `, res);
    }
    const resBody = await res.json();
    return resBody
  }
