// endpoint.js
const GetApiEndPoint = () => {
    const state = process.env.NEXT_PUBLIC_STATE;
    switch (state) {
      case "DEV":
        return process.env.NEXT_PUBLIC_ENDPOINT_DEV;
      case "UAT":
        return process.env.NEXT_PUBLIC_ENDPOINT_UAT;
      case "PRD":
        return process.env.NEXT_PUBLIC_ENDPOINT_UAT;
      default:
        throw new Error(`Invalid state: ${state}`);
    }
  };
  
  export default GetApiEndPoint;
  