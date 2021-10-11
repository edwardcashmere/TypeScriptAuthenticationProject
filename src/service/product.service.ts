import Product,{ProductDocument} from "../models/product.model";
import { DocumentDefinition, FilterQuery, UpdateQuery,   QueryOptions} from "mongoose";
import {Omit} from "lodash";

export const createProduct = async (input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>)=>{

    return await Product.create(input)

}

export const getProduct = async(query: FilterQuery<ProductDocument>, options:   QueryOptions={lean:true})=>{

    return await Product.findOne(query, {},options)
    
}
export const updateProduct = async(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions)=>{

    return await Product.findOneAndUpdate(query, update,options)

}
export const deleteProduct = async(query: FilterQuery<ProductDocument>)=>{

    return await Product.deleteOne(query)

}