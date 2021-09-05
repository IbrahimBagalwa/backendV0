import db from '../models';
import dotenv from 'dotenv';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { errorMessages, successMessages } from '../helpers/messages.helpers';
import {errorCodes, successCodes} from '../helpers/statusCodes.helper';
dotenv.config();

const {created} = successCodes;
const {courseCreate} = successMessages;
const {conflict,internalServerError} = errorCodes;
const {duplicatedCourse,interError} = errorMessages;
export default {
    create: async (req, res)=>{
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
                createdon: now,
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
    }
}