import db from '../models';
import {Op} from 'sequelize';
import dotenv from 'dotenv';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/responses.helpers';
import { errorCodes, successCodes } from '../helpers/statusCodes.helper';
import { errorMessages, successMessages } from '../helpers/messages.helpers';

dotenv.config();
const {created, ok} = successCodes;
const {classCreate, updateSuccess,recordFound} = successMessages;

const {internalServerError, badRequest, notFound} = errorCodes;
const {interError, classCreateFail, updateFail,noRecordFound} = errorMessages;

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
    },
    all: async (req,res)=>{
        try {
           const allClass = await db.Classes.findAll({
                where: {
                    datastatus:process.env.AP_DATASTATUS,
                },
                include: ['Cours']
               
            })
            if(allClass)
                sendSuccessResponse(res, ok, recordFound, null, allClass)
            else
                sendErrorResponse(res,notFound, noRecordFound)
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    search: async (req,res)=>{
        const {query} = req.body;
        try {
            const classSearch = await db.Classes.findAll({
                where:{      
                    [Op.or]:[
                        {nom: {[Op.substring]: query}}
                    ]
                }
            });
            if(classSearch)
                sendSuccessResponse(res, ok, recordFound, null, classSearch );
            else 
                sendErrorResponse(res, notFound, noRecordFound);
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
        }
    }
}