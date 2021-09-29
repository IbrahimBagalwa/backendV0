import joi from 'joi';
import { sendErrorResponse } from '../../app/helpers/responses.helpers';
import db from '../../app/models';

const studentValidation = {
    register : async(req,res, next)=>{
        const schema = joi.object({
            nom: joi.string().min(3).max(60).required(), 
            postnom: joi.string().min(3).max(60).required(), 
            prenom: joi.string().min(3).max(25), 
            email: joi.string().min(13).max(100).required(),
            sexe: joi.string().min(3).max(8).required(), 
            age: joi.string().min(10).max(10).required(), 
            etatCivil: joi.string().min(6).max(15), 
            avatar: joi.string().max(100),
            idClass: joi.string().max(50).required(), 
            nomCompletTutaire: joi.string().min(15).max(60).required(), 
            emailTutaire: joi.string().min(13).max(100).required(), 
            phoneTutaire:joi.number().min(10).max(10),
        });
        const {error} = schema.validate(req.body);
        if(error){
            return sendErrorResponse(res, badRequest, `${error.details[0].message}`)
        }
        const checkIdentity = await db.Student.findOne({
            where: {
                nom: req.body.nom,
                postnom: req.body.postnom,
                prenom: req.body.prenom
            }
        }).then().catch(er=>console.log(er));
        if(checkIdentity){
            return sendErrorResponse(res, conflict, duplicatedStudent)
        }else{
            return next();
        }
    }
}

export default studentValidation;