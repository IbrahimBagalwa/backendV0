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
        const {nom, titulaire, createdon, datastatus, modifiedby, deleteby} = req.body;
        const id = req.params.id;
        try {
           const classes = await db.Classes.findOne({where: {id:id}});
           const updated = await classes.update({
                nom : nom || classes.nom,
                titulaire: titulaire || classes.titulaire
            })
            if(updated)
                sendSuccessResponse(res, ok, updateSuccess, null, updated);
            else
                sendErrorResponse(res, badRequest, updateFail);
        
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError);
        }
    }
}