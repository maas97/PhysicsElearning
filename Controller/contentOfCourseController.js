const mongoose=require("mongoose");
require("../Model/contentOfCourseModel");
require("../Model/courseDetailsInfoModel");

//getter
const courseDetailsSchema = mongoose.model("courseDetails");
const contentSchema = mongoose.model("content");

exports.getAllDays=(request,response)=>{
    contentSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getDayById=(request,response,next)=>{
    contentSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(!data)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        })
        .catch ((error)=> {next(error)});
}




exports.addDayAPI = async (request,response,next)=>{
        new contentSchema({
            day:{
                dayNumber: request.body.day.dayNumber,
                educationalLevel: request.body.day.educationalLevel,
                eachContentInsideDay: [{
                    title: request.body.day.eachContentInsideDay[0].title,
                    description: request.body.day.eachContentInsideDay[0].description,
                    typeOfContent: request.body.day.eachContentInsideDay[0].typeOfContent,
                    LinkOfContent: request.body.day.eachContentInsideDay[0].LinkOfContent
                }]
            }  
        }).save().then(async data=>{
            // console.log(data)
            response.status(201).json({data}); 
            })
            .catch(error=>next(console.log(error)));
}



exports.addContentToDayAPI = async (request,response,next)=>{

    const newContent = await request.body.day.eachContentInsideDay; // Content to add
    // console.log(newContent);
    // console.log(request.body._id);
      
        try{
        const day = await contentSchema.findOne({_id:request.body._id});
        const result = await contentSchema.updateOne({//Use return because use of two query actions 
            _id:request.body._id
        },{
            $push:{"day.eachContentInsideDay": newContent}
                
        })
        // console.log("////////////////////////////////////////////")
        // console.log(day)
        // console.log(result)
        response.status(200).json({ message: 'Content added successfully', result });

        }catch{
            next(console.log(error))
        }
        
}




exports.updateDay=(request,response,next)=>{
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
                day:{
                    dayNumber: request.body.day.dayNumber,
                    eachContentInsideDay: [{
                        title: request.body.day.eachContentInsideDay[0].title,
                        description: request.body.day.eachContentInsideDay[0].description,
                        typeOfContent: request.body.day.eachContentInsideDay[0].typeOfContent,
                        LinkOfContent: request.body.day.eachContentInsideDay[0].LinkOfContent
                    }]
                }
                
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteDay=(request,response,next)=>{
    contentSchema.deleteOne({
        _id:request.body.id,
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}


exports.deleteContentOfDayAPI= async(request,response,next)=>{

    const documentIdToUpdate = request.body.dayId; // The ID of the document you want to update
    const objectIdToDelete = request.body.contentId; // The ID of the object you want to delete
    
    contentSchema.updateOne(
      { _id: documentIdToUpdate }, // Filter to find the document to update
      { $pull: { 'day.eachContentInsideDay': { _id: objectIdToDelete } } }, // Use $pull to remove the object by its ID
      (err, result) => {
        if (err) {
          console.error('Error updating document:', err);
          return;
        }
        console.log('Document updated successfully:', result);
        response.status(200).json({result});

      }
    );

    }
