import db from '../models';
import dotenv from 'dotenv';
import { encryptPassword } from '../helpers/passwordEncDec.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/responses.helpers';
import { generateToken } from '../helpers/token.helper';
import { SendSuccessResponse } from '../../../../todo-app/src/app/helpers/response.helpers';
import { forbidden } from 'joi';

dotenv.config();

export default {
    register: async (req, res)=>{
        const {nom, postnom, prenom, email, sexe, age, etatCivil, avatar, idClass, nomCompletTutaire, emailTutaire, phoneTutaire} = req.body;
        const randPass = Math.round(Math.round() * (80000000) + 10000000);
        const password = await encryptPassword(randPass.toString());
        try {
            const isCreated = await db.Student.create({
                nom, 
                postnom, 
                prenom, 
                email,
                password: password, 
                sexe, 
                age, 
                etatCivil, 
                avatar,
                idClass, 
                nomCompletTutaire, 
                emailTutaire, 
                phoneTutaire,
                datastatus:process.env.AP_ACTIVE,
                createdon: process.env.AP_UNACTIVE,
                modifiedby: process.env.AP_UNACTIVE,
                deleteby: process.env.AP_UNACTIVE
            })
            if(isCreated){
                console.log(randPass);
                isCreated.password = randPass;
                sendSuccessResponse(res, created, accountCreate, generateToken(JSON.stringify(isCreated.id)), isCreated)
            }else sendErrorResponse(res, badRequest, accountFailedToCreate)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
            
        }
    },
    login: async (req,res)=>{
        const {password, phone, email} = req.body;
        try {
            if(email || phone && password){
                if(email){
                    const isLog = await db.Student.findOne({
                        where: {
                            email: email,
                            datastatus: process.env.AP_ACTIVE
                        }
                    })
                    if(isLog){
                        bcrypt.compare(password, isLog.password, (err, resultat)=>{
                            if(resultat) sendSuccessResponse(res, ok, loginSucess, generateToken(JSON.stringify(isLog.ID)), isLog);
                            else SendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password: req.body.password});
                        })
                    }
                }else if(phone){
                    const isLog =  await db.Student.findOne({
                        where:{
                            phone: phone,
                            datastatus: process.env.AP_ACTIVE
                        }
                    })
                    if(isLog){
                        bcrypt.compare(password, isLog.password, (err, result)=>{
                            if(result)SendSuccessResponse(res, ok, loginSucess, generateToken(JSON.stringify(isLog.id)), isLog);
                            else sendSuccessResponse(res, unAuthorized, loginFail, null, {phone: req.body.phone, password: req.body.password})
                        })
                    }else sendSuccessResponse(res, forbidden, loginFail, null, {email: req.body.email, password: req.body.password})
                }
            }else sendErrorResponse(res, forbidden, fielValidation)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError);
        }
    }
}