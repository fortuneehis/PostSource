

class CustomHTTPError extends Error {

    status: number
    errors: string[]|undefined
    constructor(name: string, status: number, message: string, errors?:string[]) {
        super(message) // Error breaks the prototype chain
        Object.setPrototypeOf(this, new.target.prototype) //Restore the prototype chain :)
        this.name = name
        this.status = status
        this.message = message
        this.errors = errors
    }

    getErrors() {
            return {
                status: this.status,
                message: this.name === "ValidationError" ? this.errors : this.message
            }
    }
}


export default CustomHTTPError