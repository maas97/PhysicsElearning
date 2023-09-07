const { request } = require("express");
const mongoose=require("mongoose");
require("../Model/courseDetailsInfoModel");
require("../Model/contentOfCourseModel");
require("../Model/studentModel");

//getter
const courseDetailsSchema = mongoose.model("courseDetails");
const daySchema = mongoose.model("content");
const studentSchema = mongoose.model("student");

exports.getAllCoursesDetails=(request,response,next)=>{
    courseDetailsSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});      
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
        // semester:request.body.semester,
        month:request.body.month,
        price:request.body.price,
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}


exports.addDayToCourse = async (request,response,next)=>{

    let day = await daySchema.findOne({_id: request.body._id});

    
        // console.log("/////////////////////////////////////////////");
        // console.log(request.body._id);
        // console.log(day);
        // console.log(day.id);
      

    let course = await courseDetailsSchema.updateOne( {counter: request.body.counter},
        {$push: {currentCourseListContentId : day.id } }
      ).then(data=>{
        response.status(200).json({data});
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
                price:request.body.price,
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


// exports.courseSubscribe = (request,response,next)=>{
//     studentSchema.findOne({_id:request.body.id}).then(data=>{
//         return studentSchema.updateOne({_id: request.body.id}, { $set:{
//                 coursesSubscribedTo: request.params.counter
//             }
//         })
//     }).then(data=>{
//         response.status(200).json({data});
//     })
//     .catch(error=>next(error));
// }