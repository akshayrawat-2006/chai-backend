// if we do not use this then every API returns data in a different format 😵 so Solution: ApiResponse -> Create a standard format


class ApiResponse {
    constructor(statusCode,data,message="Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // bec 200 → Success,201 → Created,204 → Success All are:< 400 while >400 are errors
    }
}
