import { User } from "../../admin/state/types/user.type"

export interface Profile {
    _id : string
    name : string
    email : string
    image : string
    password : string
}

export interface UserState {
    user : User
    loading : boolean
    loaded : boolean
    error : any
}