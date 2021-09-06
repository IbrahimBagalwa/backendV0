import joi from 'joi';
import { errorMessages } from '../../app/helpers/messages.helpers';
import { sendErrorResponse } from '../../app/helpers/responses.helpers';
import { errorCodes } from '../../app/helpers/statusCodes.helper';
import db  from '../../app/models';

const {conflict, badRequest} = errorCodes;
const {duplicatedClass} = errorMessages;

const classValidation ={
    register : async (req, res, next)=>{
        const schema = joi.object({
            nom:joi.string().min(3).max(60).required(),
            titulaire:joi.string().min(3).max(50)
        });
        const {error} = schema.validate(req.body);
        if (error) {
            return sendErrorResponse(res,badRequest,`${error.details[0].message}`)
        }
        const checkNom = await db.Classes.findOne({
            where:{
                nom:req.body.nom
            }
        }).then().catch(er=>console.error(er));
        if(checkNom){
            return sendErrorResponse(res,conflict,duplicatedClass)
        }else {
            return next();
        }
    }
}
export default classValidation;