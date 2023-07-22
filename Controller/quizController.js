const mongoose=require("mongoose");
require("../Model/quizModel");

//getter
const quizSchema = mongoose.model("quizzes");

exports.getAllQuizzes=(request,response)=>{
    quizSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getQuizById=(request,response,next)=>{
    quizSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}

exports.addQuiz=(request,response,next)=>{
    new quizSchema({
        quizName:request.body.quizName,
        quizType:request.body.quizType,
        quizDescription:request.body.quizDescription,
        noOfQuestions: request.body.noOfQuestions,
        educationalLevel: request.body.educationalLevel,
        semester: request.body.semester,
        
    }).save()// insertOne
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateQuiz=(request,response,next)=>{
    quizSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error("Student is not found");
        }   
        return quizSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                quizName:request.body.quizName,
                quizType:request.body.quizType,
                quizDescription:request.body.quizDescription,
                noOfQuestions: request.body.noOfQuestions,
                educationalLevel: request.body.educationalLevel,
                semester: request.body.semester,
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteQuiz=(request,response,next)=>{
    quizSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
