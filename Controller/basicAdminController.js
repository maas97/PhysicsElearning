const mongoose=require("mongoose");
require("../Model/basicAdminModel");
const fs =require("fs") 
const bcrypt = require("bcryptjs");
const path = require("path");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);



//getter
const basicAdminSchema = mongoose.model("basicAdmin");


exports.getAllBasicAdmins=(request,response)=>{
    basicAdminSchema.find({}, )
    // {password: 0}
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getBasicAdminById=(request,response,next)=>{
        basicAdminSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addBasicAdmin=(request,response,next)=>{
    new basicAdminSchema({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        password: bcrypt.hashSync(request.body.password, salt),
        email:request.body.email,
        phoneNumber:request.body.phoneNumber
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateBasicAdmin=(request,response,next)=>{
    let password;
   
    basicAdminSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("basic Admin not found ts");
        }else{//for basicAdmin role
            
        }
        
        return basicAdminSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                password: password,
                email:request.body.email,
                phoneNumber:request.body.phoneNumber
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteBasicAdmin=(request,response,next)=>{
    basicAdminSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
