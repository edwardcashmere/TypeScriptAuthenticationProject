import { Request, Response} from "express";
import { createProduct, getProduct, updateProduct, deleteProduct } from "../service/product.service";
import { CreateProductInput,UpdateProductInput,DeleteProductInput, ReadproductInput} from "../utils/product.schema"

export const createProductHandler = async(req: Request<{}, {}, CreateProductInput["body"]>, res: Response)=>{

    const userId = res.locals.user._id

    const body = req.body;

    try{
        const product = await createProduct({...body, user: userId});

        return res.status(201).json(product.toJSON())

    }catch(e: any){
        return res.status(500).json({message: "Internal Server Error"})
    }


}
export const getProductHandler = async(req: Request<ReadproductInput["params"]>, res: Response)=>{

    const productId = req.params.productId;

    try{

        const product = await getProduct({productId});

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        return res.status(200).json(product)

    }catch(e: any){
        return res.status(500).json({message: "Internal Server Error"})
    }


}
export const updateProductHandler = async(req: Request<UpdateProductInput["params"]>, res: Response)=>{

    const update = req.body;

    const productId = req.params.productId

    const userId = res.locals.user._id

    try{
        const product = await getProduct({ productId});

        if(!product){
            return res.status(404).json({message: "product does not exist"})
        }

        if(String(product.user) !==userId){
            return res.status(403).json({message: "Forbidden to alter this Product"})
        } 

        const newProduct = await updateProduct({productId}, update, {new: true});

        return res.status(200).json(newProduct)

    }catch(e:any){
        return res.status(500).json({message: "Internal Server Error"})

    }


}
export const deleteProductHandler = async(req: Request<DeleteProductInput["params"]>, res: Response)=>{

    const productId = req.params.productId

    const userId = res.locals.user._id

    try{
        const product = await getProduct({ productId});

        if(!product){
            return res.status(404).json({message: "product does not exist"})
        }

        if(String(product.user) !==userId){
            return res.status(403).json({message: "Forbidden to alter this Product"})
        } 

        await deleteProduct({productId})
        return res.sendStatus(204)

    }catch(e:any){
        return res.status(500).json({message: "Internal Server Error"})

    }




}