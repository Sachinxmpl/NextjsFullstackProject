import { Message } from "../models/models";

export interface ApiResonseInterface{
    success : boolean , 
    message : string , 
    isAcceptingMessages? : boolean ,
    messages? : Array <Message>
}