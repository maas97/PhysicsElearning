const mongoose=require("mongoose");
require("../Model/contentOfCourseModel");

//getter
const contentSchema = mongoose.model("content");

exports.getAllContent=(request,response)=>{
    contentSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getContentById=(request,response,next)=>{
    contentSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addContent=(request,response,next)=>{
    new contentSchema({
        title:request.body.title,
        description:request.body.description,
        typeOfContent:request.body.typeOfContent,
        LinkOfContent: request.body.LinkOfContent,
        dateOfPublishingContent: request.body.dateOfPublishingContent,
        courseDayId: request.body.courseDayId,
        
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateContent=(request,response,next)=>{
    contentSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Student is not found");
        }   
        return productSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                title:request.body.title,
                description:request.body.description,
                typeOfContent:request.body.typeOfContent,
                LinkOfContent: request.body.LinkOfContent,
                dateOfPublishingContent: request.body.dateOfPublishingContent,
                courseDayId: request.body.courseDayId,
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteContent=(request,response,next)=>{
    contentSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
