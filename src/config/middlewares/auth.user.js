import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../../app/helpers/responses.helpers';
import db from '../../app/models';

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
            })
        }
    })
}