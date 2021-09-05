import db from '../models';
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
        const { nom,cotation,idClasse,titulaire,heure,datastus,createdon,modifiedby,deleteby } = req.body;
        const now = new Date();
        // let creat = formatDate('yyyy-MM-dd hh:mm:ss', new Date());
        // let date = formatDate('yyyy-mm-dd-hh-MM-ss', new Date());
        try {
            const createCourse = await db.Cours.create({
                nom,
                cotation,
                idClasse,
                titulaire,
                heure:process.env.AP_UNACTIVE,
                datastus: process.env.AP_DATASTATUS,
                createdon: process.env.AP_UNACTIVE,
                modifiedby: process.env.AP_UNACTIVE,
                deleteby: process.env.AP_UNACTIVE
            })
            if(createCourse instanceof db.Cours)
                sendSuccessResponse(res,created,courseCreate,null,createCourse);
            else sendSuccessResponse(res, conflict,duplicatedCourse,null,{nom, idClasse,titulaire})
            
        } catch (error) {
            console.log(error)
            sendSuccessResponse(res, internalServerError,interError,null,error);
        }
    },
    update: async(req, res)=>{
        const id = req.params.id;
        try {
            await db.Cours.update(req.body, 
                { where:{id:id}}
            )
            .then((data)=>{
                sendSuccessResponse(res, ok, updateSuccess, null, data)
            })
            .catch((err)=>{
                sendErrorResponse(res, badRequest, updateFail)
            })
        } catch (error) {
           sendSuccessResponse(res, internalServerError, interError, null, error) 
        }
    },
    all: async(req, res)=>{
        try {
            await db.Cours.findAll({
                where: {
                    datastus: process.env.AP_DATASTATUS
                }
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
    }
}