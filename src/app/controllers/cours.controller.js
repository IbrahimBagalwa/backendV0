import db from '../models';
import {Op} from 'sequelize';
import dotenv from 'dotenv';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { errorMessages, successMessages } from '../helpers/messages.helpers';
import {errorCodes, successCodes} from '../helpers/statusCodes.helper';
dotenv.config();

const {created, ok} = successCodes;
const {courseCreate,updateSuccess,recordFound} = successMessages;

const {conflict,internalServerError,badRequest,notFound} = errorCodes;
const {duplicatedCourse,interError,updateFail,noRecordFound} = errorMessages;
export default {
    register: async (req, res)=>{
        const { nom,cotation,ClassId,titulaire,heure,datastatus,createdon,modifiedby,deleteby } = req.body;
        const now = new Date();
        // let creat = formatDate('yyyy-MM-dd hh:mm:ss', new Date());
        // let date = formatDate('yyyy-mm-dd-hh-MM-ss', new Date());
        try {
            const createCourse = await db.Cours.create({
                nom,
                cotation,
                ClassId,
                titulaire,
                heure:process.env.AP_UNACTIVE,
                datastatus: process.env.AP_DATASTATUS,
                createdon: process.env.AP_UNACTIVE,
                modifiedby: process.env.AP_UNACTIVE,
                deleteby: process.env.AP_UNACTIVE
            })
            if(createCourse instanceof db.Cours)
                sendSuccessResponse(res,created,courseCreate,null,createCourse);
            else sendSuccessResponse(res, conflict,duplicatedCourse,null,{nom, ClassId,titulaire})
            
        } catch (error) {
            console.log(error)
            sendSuccessResponse(res, internalServerError,interError,null,error);
        }
    },
    update: async(req, res)=>{
        const id = req.params.id;
        const { nom,cotation,ClassId,titulaire,heure,datastatus,createdon,modifiedby,deleteby } = req.body;
        try {
            const course = await db.Cours.findOne({where: {id:id}});
            const updated = await course.update({
                nom:nom || course.nom,
                titulaire: titulaire || course.titulaire,
                cotation : cotation || course.cotation,
                ClassId : ClassId || course.ClassId,
                heure : heure || course.heure
            })
            if(updated)
                sendSuccessResponse(res, ok, updateSuccess, null, data)
            else
                sendErrorResponse(res, badRequest, updateFail)
           
        } catch (error) {
           sendSuccessResponse(res, internalServerError, interError, null, error) 
        }
    },
    all: async(req, res)=>{
        try {
            await db.Cours.findAll({
                where: {
                    datastatus: process.env.AP_DATASTATUS
                    
                },
                include: ['Class']
            })
            .then((data)=>{
                sendSuccessResponse(res,ok,recordFound,null, data)
            }) 
            .catch((err)=>{
                sendErrorResponse(res,notFound,noRecordFound)
            }) 
        } catch (error) {
            sendSuccessResponse(res,internalServerError, interError,null, error)
        }
    },
    getCourseByClass: async(req,res)=>{
        const ClassId = req.params.ClassId;
      try {
        const courses = await db.Cours.findAll({
            where: {ClassId: ClassId}
        })
        if(courses){
            sendSuccessResponse(res, ok, recordFound, null, courses)
        }else{
            sendErrorResponse(res,notFound,noRecordFound)
        }
      } catch (error) {
        sendErrorResponse(res, internalServerError, interError)
      }
    },
    search : async (req,res)=>{
        const { query } = req.body;
        try {
            const searchCourse = await db.Cours.findAll({
                where:{
                    [Op.or]:[
                        {nom: {[Op.substring]: query}}
                    ]
                }
            });
            if(searchCourse){
                sendSuccessResponse(res,ok, recordFound, null, searchCourse);
            }else{
                sendErrorResponse(res, notFound, noRecordFound);
            }

        } catch (error) {
            // console.log(error)
            sendErrorResponse(res,internalServerError,interError)
        }
    }
}