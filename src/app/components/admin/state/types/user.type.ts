export interface User {
    _id : string,
    name : string,
    email : string,
    image : string,
    password : string
}


export interface UserState {
    users : ReadonlyArray<User>
    loading : boolean
    loaded : boolean
    error : any
}