import db from '../models';
import dotenv from 'dotenv';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { errorCodes, successCodes } from '../helpers/statusCodes.helper';
import { errorMessages, successMessages } from '../helpers/messages.helpers';

dotenv.config();
const {created, ok} = successCodes;
const {classCreate, updateSuccess} = successMessages;

const {internalServerError, badRequest} = errorCodes;
const {interError, classCreateFail, updateFail} = errorMessages;

export default {
    register: async (req, res)=>{
        const {nom, titulaire, createdon, datastatus, modifiedby, deleteby} = req.body;
        let now = new Date();
        try {
            const createCourse = db.Classes.create({
                nom,
                titulaire,
                createdon: process.env.AP_UNACTIVE,
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
    },
    update: async (req,res) =>{
        const id = req.params.id;
        try {
            await db.Classes.update(req.body, {
                where: {id:id}
            })
            .then((data)=>{
                sendSuccessResponse(res, ok, updateSuccess, null, data);
            })
            .catch((err)=>{
                sendErrorResponse(res, badRequest, updateFail);
            })
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    }
}