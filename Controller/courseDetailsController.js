const mongoose=require("mongoose");
require("../Model/courseDetailsModel");

//getter
const courseDetailsSchema = mongoose.model("courseDetails");

exports.getAllCoursesDetails=(request,response,next)=>{
    courseDetailsSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});
                    if(data){
                        console.log(data);
                        response.locals.courses = data;
                        next();
                    }        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getCourseDetailsById=(request,response,next)=>{
    courseDetailsSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addCourseDetails=(request,response,next)=>{
    new courseDetailsSchema({
        courseName:request.body.courseName,
        courseDescription:request.body.courseDescription,
        educationalLevel:request.body.educationalLevel,
        semester:request.body.semester,
        month:request.body.month,
        price:request.body.price
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateCourseDetails=(request,response,next)=>{
    courseDetailsSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Course is not found");
        }   
        return courseDetailsSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                courseName:request.body.courseName,
        courseDescription:request.body.courseDescription,
        educationalLevel:request.body.educationalLevel,
        semester:request.body.semester,
        month:request.body.month,
        price:request.body.price
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteCourseDetails=(request,response,next)=>{
    courseDetailsSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
