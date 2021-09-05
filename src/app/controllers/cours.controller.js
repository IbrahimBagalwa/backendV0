import db from '../models';
import dotenv from 'dotenv';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { errorMessages, successMessages } from '../helpers/messages.helpers';
import {errorCodes, successCodes} from '../helpers/statusCodes.helper';
dotenv.config();

const {created} = successCodes;
const {courseCreate} = successMessages;
const {conflict} = errorCodes;
const {duplicatedCourse} = errorMessages;
export default {
    create: async (req, res)=>{
        const { nom,cotation,idClasse,titulaire,heure,datastus,createdon,modifiedby,deleteby } = req.body;
        try {
            const createCourse = await db.Cours.create({
                nom,
                cotation,
                idClasse,
                titulaire,
                heure,
                datastus: process.env.DB_DATASTATUS,
                createdon: createdAt,
                modifiedby: process.env.DB_UNACTIVE,
                deleteby: process.env.DB_UNACTIVE
            })
            if(createCourse instanceof Cours)
                sendSuccessResponse(res,created,courseCreate,null,createCourse);
            else sendSuccessResponse(res, conflict,duplicatedCourse,null,{nom, idClasse,titulaire})
            
        } catch (error) {
            sendSuccessResponse(res, internalServerError,interError,null,error);
        }
    }
}