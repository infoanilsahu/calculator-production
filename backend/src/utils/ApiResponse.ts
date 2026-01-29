class ApiResponse {
    statuscode: number;
    data: any;
    message: string;             

    constructor(statuscode: number,data:any,message: string = "success") {
    this.statuscode = statuscode;
    this.data = data;
    this.message = message; 
    }                                 
}


export {ApiResponse};