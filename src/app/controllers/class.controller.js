import db from '../models';
import dotenv from 'dotenv';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { errorCodes, successCodes } from '../helpers/statusCodes.helper';
import { errorMessages, successMessages } from '../helpers/messages.helpers';

dotenv.config();
const {created} = successCodes;
const {classCreate} = successMessages;

const {internalServerError, badRequest} = errorCodes;
const {interError, classCreateFail} = errorMessages;

export default {
    register: async (req, res)=>{
        const {nom, titulaire, createdon, datastatus, modifiedby, deleteby} = req.body;
        let now = new Date();
        try {
            const createCourse = db.Classes.create({
                nom,
                titulaire,
                createdon: now,
                datastatus: process.env.AP_DATASTATUS,
                modifiedby: process.env.AP_UNACTIVE,
                deleteby: process.env.AP_UNACTIVE
            })
            if(createCourse instanceof db.Classes)
                sendSuccessResponse(res, created, classCreate, null, createCourse);
            else
                sendErrorResponse(res, badRequest, classCreateFail);      
        } catch (error) {
            sendErrorResponse(res,internalServerError, interError);
        }
    }
}