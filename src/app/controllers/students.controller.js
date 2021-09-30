import db from '../models';
import dotenv from 'dotenv';
import { encryptPassword, randomString } from '../helpers/passwordEncDec.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/responses.helpers';
import { generateToken } from '../helpers/token.helper';
import { errorCodes, successCodes } from '../helpers/statusCodes.helper';
import { errorMessages, successMessages } from '../helpers/messages.helpers';


dotenv.config();
const {ok, created} = successCodes;
const {badRequest, forbidden, notFound, internalServerError, unAuthorized } = errorCodes;

const {accountCreate, loginSucess, recordFound, updateSuccess } = successMessages;
const {accountFailedToCreate, loginFail, noRecordFound, updateFail, interError, fieldValidation} = errorMessages;

export default {
    register: async (req, res)=>{
        const {nom, postnom, prenom, email, sexe, age, etatCivil, idClass, nomCompletTutaire, emailTutaire, phoneTutaire} = req.body;
        console.log(req.body)
        const randPass = Math.round(Math.round() * (80000000) + 10000000);
        const password = await encryptPassword(randPass.toString());
        
        try {
            let filename = 'default.png';
            if(req.files && req.files.avatar){
                const img = req.files.avatar;
                const _ = img.name;
                const ext = _.substring(_.lastIndexOf(".")).toLowerCase();
                filename = randomString().concat(ext);
                img.mv('public/assets/'+ filename, err=>{
                    if(err) filename = 'default.png'
                })
            }
            const isCreated = await db.Students.create({
                nom, 
                postnom, 
                prenom, 
                email,
                password: password, 
                sexe, 
                age, 
                etatCivil, 
                avatar:filename,
                idClass, 
                nomCompletTutaire, 
                emailTutaire, 
                phoneTutaire,
                datastatus:process.env.AP_ACTIVE,
                createdon: process.env.AP_UNACTIVE,
                modifiedby: process.env.AP_UNACTIVE,
                deleteby: process.env.AP_UNACTIVE
            })
            console.log(isCreated)
            if(isCreated){
                console.log(randPass);
                isCreated.password = randPass;
                sendSuccessResponse(res, created, accountCreate, generateToken(JSON.stringify(isCreated.id)), isCreated)
            }else sendErrorResponse(res, badRequest, accountFailedToCreate)
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError)
            
        }
    },
    login: async (req,res)=>{
        const {password, phoneTutaire, email} = req.body;
        console.log(req.body)
        try {
            if(email || phoneTutaire && password){
                if(email){
                    const isLog = await db.Students.findOne({
                        where: {
                            email: email,
                            datastatus: process.env.AP_ACTIVE
                        }
                    })
                    if(isLog){
                        bcrypt.compare(password, isLog.password, (err, resultat)=>{
                            if(resultat) sendSuccessResponse(res, ok, loginSucess, generateToken(JSON.stringify(isLog.id)), isLog);
                            else sendSuccessResponse(res, unAuthorized, loginFail, null, {email: req.body.email, password: req.body.password});
                        })
                    }else sendSuccessResponse(res, forbidden, loginFail, null, {email: req.body.email, password: req.body.password})
                }else if(phoneTutaire){
                    const isLog =  await db.Students.findOne({
                        where:{
                            phoneTutaire: phoneTutaire,
                            datastatus: process.env.AP_ACTIVE
                        }
                    })
                    if(isLog){
                        bcrypt.compare(password, isLog.password, (err, result)=>{
                            if(result)sendSuccessResponse(res, ok, loginSucess, generateToken(JSON.stringify(isLog.id)), isLog);
                            else sendSuccessResponse(res, unAuthorized, loginFail, null, {phoneTutaire: req.body.phoneTutaire, password: req.body.password})
                        })
                    }else sendSuccessResponse(res, forbidden, loginFail, null, {phoneTutaire: req.body.phoneTutaire, password: req.body.password})
                }
            }else sendErrorResponse(res, forbidden, fieldValidation)
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError);
        }
    },
    getCurrent: async(req, res) =>{
        const user = req.user;
        sendSuccessResponse(res,ok,loginSuccess,null, user);
    },
    view: async (req, res)=>{
        try {
            const viewAll = await db.Students.findAll({
                where: {
                    datastatus: process.env.AP_ACTIVE
                },
                include: ['Classe']
            })
            if(viewAll){
                sendSuccessResponse(res, ok, recordFound, null, viewAll)
            }else{
                sendErrorResponse(res, notFound, noRecordFound)
            }
        } catch (error) {
            console.log(error)
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    update: async(req, res)=>{
        const id = req.params.id;
        const {nom, postnom, prenom, email, sexe, age, etatCivil, avatar, idClass, nomCompletTutaire, emailTutaire, phoneTutaire, datastatus} = req.body;
        try {
            const student =  await db.Students.findOne({
                where: {id: id}
            })
            const isUpdated = await student.update({
                nom: nom || student.nom,
                postnom: postnom || student.postnom,
                prenom: prenom || student.prenom,
                email: email || student.email,
                sexe: sexe || student.sexe,
                age: age || student.age,
                etatCivil: etatCivil || student.etatCivil,
                avatar: avatar || student.avatar,
                idClass: idClass || student.idClass,
                nomCompletTutaire: nomCompletTutaire || student.nomCompletTutaire,
                emailTutaire: emailTutaire || student.emailTutaire,
                phoneTutaire: phoneTutaire || student.phoneTutaire,
                datastatus: datastatus || student.datastatus
            })
            if(isUpdated) sendSuccessResponse(res, ok, updateSuccess, null, isUpdated);
            else sendErrorResponse(res, badRequest, updateFail)
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
        }
    },
    viewById: async(req, res)=>{
        const id = req.params.id;
        try {
            const isDone = await db.Students.findOne({
                where: {id:id}
            })
            if(isDone)sendSuccessResponse(res, ok, recordFound, null, isDone);
            else sendErrorResponse(res, notFound, noRecordFound);
        } catch (error) {
            sendErrorResponse(res, internalServerError, interError)
        }
    }
}