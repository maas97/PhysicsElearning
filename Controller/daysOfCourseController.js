const mongoose=require("mongoose");
require("../Model/daysOfCourseModel");

//getter
const daysOfCourseSchema = mongoose.model("dayOfCourse");

exports.getAlldaysOfCourses=(request,response)=>{
    daysOfCourseSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getDayOfCourseById=(request,response,next)=>{
    daysOfCourseSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addDayOfCourse=(request,response,next)=>{
    new daysOfCourseSchema({
        educationalLevel:request.body.educationalLevel,
        semester:request.body.semester,
        dayNumber:request.body.dayNumber,
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateDayofCourse=(request,response,next)=>{
    daysOfCourseSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Student is not found");
        }   
        return daysOfCourseSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                educationalLevel:request.body.educationalLevel,
                semester:request.body.semester,
                dayNumber:request.body.dayNumber,
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteDayOfCourse=(request,response,next)=>{
    daysOfCourseSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
