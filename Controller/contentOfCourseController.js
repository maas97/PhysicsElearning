const mongoose=require("mongoose");
require("../Model/contentOfCourseModel");
require("../Model/courseDetailsInfoModel");

//getter
const courseDetailsSchema = mongoose.model("courseDetails");
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




exports.addContent = async (request,response,next)=>{

    try{
        const {courseId, unitNumber, title, description, typeOfContent, LinkOfContent} = request.body;
        // console.log("/////////////////////////////////////////////");
        // const courseId = request.body.unit[0].eachContentInsideCourse[0].courseId;
        // console.log(request.body.unit[0].eachContentInsideCourse[0]);
        // console.log(description);
        
        new contentSchema({
            unit:{
                unitNumber: request.body.unit[0].unitNumber,
                eachContentInsideCourse: {
                    title: request.body.unit[0].eachContentInsideCourse[0].title,
                    description: request.body.unit[0].eachContentInsideCourse[0].description,
                    typeOfContent: request.body.unit[0].eachContentInsideCourse[0].typeOfContent,
                    LinkOfContent: request.body.unit[0].eachContentInsideCourse[0].LinkOfContent
                }
            }
            
        }).save().then(async data=>{
            // console.log("/////////////////////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$////////////////////////");
            // console.log(data._id);
            // console.log("/////////////////////////////////////////////");
            // console.log(newContent);
            await courseDetailsSchema.findByIdAndUpdate(courseId, { $push: { 
                currentCourseListContentId: data._id
             } });
        })

        
         contentSchema.find({}).then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
        // response.status(201).json({ message: 'New content added to this course successfully' });
    }catch{
        // response.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateContent=(request,response,next)=>{
    contentSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Student is not found");
        }   
        return contentSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                unit:{
                        unitNumber: request.body.unit[0].unitNumber,
                        eachContentInsideCourse: {
                            title: request.body.unit[0].eachContentInsideCourse[0].title,
                            description: request.body.unit[0].eachContentInsideCourse[0].description,
                            typeOfContent: request.body.unit[0].eachContentInsideCourse[0].typeOfContent,
                            LinkOfContent: request.body.unit[0].eachContentInsideCourse[0].LinkOfContent
                    }
                }
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
