import { prop, getModelForClass } from '@typegoose/typegoose';


export class Post1{
    @prop()
    title: string

    @prop()
    content: string
}