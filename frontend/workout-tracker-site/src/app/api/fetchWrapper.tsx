export class ResponseError extends Error {
    response: Response;

    constructor(message: string, res: Response) {
      super(message);
      this.response = res;
    }
  }
  
  export const myFetch =  async (url: string, options: RequestInit): Promise<any> => {
    // console.log(options)
    const res = await fetch(
      url,
      options
      )
        // .then((response) => response.json())
    // console.log(res)
    if (!res.ok) {
        // console.log(res)
        // add more sophisticated error handling for other situations later

      throw new ResponseError(`${res.status}: ${res.statusText} `, res);
    }
    return res.json();
  }
