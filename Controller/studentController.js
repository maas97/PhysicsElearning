const mongoose=require("mongoose");
require("../Model/studentModel");
const fs =require("fs") 
const bcrypt = require("bcryptjs");
const path = require("path");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

//getter
const studentSchema = mongoose.model("student");

exports.getAllstudents=(request,response)=>{
    studentSchema.find({}, {password: 0})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getStudentById=(request,response,next)=>{
        studentSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addStudent=(request,response,next)=>{
    new studentSchema({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        password: bcrypt.hashSync(request.body.password, salt),
        email:request.body.email,
        age:request.body.age,
        phoneNumber:request.body.phoneNumber,
        educationalLevel: request.body.educationalLevel,
        location:{
            governate: request.body.governate,
            city: request.body.city,
            area: request.body.area
        }
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateStudent=(request,response,next)=>{
    let password;
    // if(request.body.password){
    //     password = bcrypt.hashSync(request.body.password, salt);
    // }
    studentSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Student is not found");
        }   
        return studentSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                password: password,
                email:request.body.email,
                age:request.body.age,
                phoneNumber:request.body.phoneNumber
                // image:request.file?.filename ?? undefined//if no file posted, then make mongo put undefined  
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteStudent=(request,response,next)=>{
    studentSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
