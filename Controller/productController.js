const mongoose=require("mongoose");
require("../Model/productModel");

//getter
const productSchema = mongoose.model("product");

exports.getAllProducts=(request,response)=>{
    productSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getProductById=(request,response,next)=>{
    productSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addProduct=(request,response,next)=>{
    new productSchema({
        productName:request.body.productName,
        productPrice:request.body.productPrice,
        productDescription:request.body.productDescription,
        educationalLevel: request.body.educationalLevel,
        semester: request.body.semester,
        image: request.body.image,
        
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateProduct=(request,response,next)=>{
    productSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Student is not found");
        }   
        return productSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                productName:request.body.productName,
                productPrice:request.body.productPrice,
                productDescription:request.body.productDescription,
                educationalLevel: request.body.educationalLevel,
                semester: request.body.semester,
                image: request.body.image,
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteProduct=(request,response,next)=>{
    productSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
