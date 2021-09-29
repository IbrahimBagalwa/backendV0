import jwt from 'jsonwebtoken';
import { errorMessages } from '../../app/helpers/messages.helpers';
import { sendErrorResponse, sendSuccessResponse } from '../../app/helpers/responses.helpers';
import { errorCodes } from '../../app/helpers/statusCodes.helper';
import db from '../../app/models';

const {unAuthorized}= errorCodes;
const {currentUser, authorisationFail, roleAssignmentFail} = errorMessages;
export function checkToken(req, res, next){
    const token = req.headers['authtoken'];

    jwt.verify(token, process.env.JWT_KEY, async(err, payload)=>{
        if(err){
            console.log(err);
            console.log('token', token);
            sendErrorResponse(res, unAuthorized, currentUser);
        }else{
            const isConnect = await db.Student.findOne({
                where: {id: payload.id }
            });
            if(isConnect){
                req.user = user;
                next();
            }else{
                sendErrorResponse(res, unAuthorized, authorisationFail)
            }
        }
    })
}
export function checkIsAdmin(req, res, next){
    const isAdmin = req.user;
    if(isAdmin.role === 1){
        next()
    }else{
        sendErrorResponse(res, unAuthorized, roleAssignmentFail)
    }
};