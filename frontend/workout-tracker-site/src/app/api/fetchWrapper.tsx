export class ResponseError extends Error {
    response: Response;

    constructor(message: string, res: Response) {
      super(message);
      this.response = res;
    }
  }
  
  export const myFetch =  async (url: string, options: RequestInit): Promise<any> => {
    const res = await fetch(url, options)
        // .then((response) => response.json())
    // console.log(res)
    if (!res.ok) {
        console.log(res)
      throw new ResponseError(`${res.status}: ${res.statusText} `, res);
    }
    return res.json();
  }
