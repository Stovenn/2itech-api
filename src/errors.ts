export class DomainError extends Error {
    public reason?: string
    public code: number
    public data?: {}

    constructor(message: string){
        super(message)
        
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotFoundError extends DomainError{
     constructor(ressource: string, reason?: string){
         super(`${ressource} was not found`)

         this.code = 404
         this.reason = reason
     }
}

export class InternalServerError extends DomainError{
    constructor(ressource: string, reason?: string){
        super('Internal server error')

        this.code = 500
        this.reason = reason
    }
}