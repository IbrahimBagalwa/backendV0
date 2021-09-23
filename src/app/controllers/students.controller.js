import db from '../models';
import dotenv from 'dotenv';
import { encryptPassword } from '../helpers/passwordEncDec.helper';

dotenv.config();

export default {
    register: async (req, res)=>{
        const {nom, postnom, prenom, email, sexe, age, etatCivil, avatar, nomCompletTutaire, emailTutaire, phoneTutaire} = req.body;
        const randPass = Math.round(Math.round() * (80000000) + 10000000);
        const password = await encryptPassword(randPass.toString());
        try {
            const isCreated = await db.User.create({
                nom, 
                postnom, 
                prenom, 
                email,
                password: password, 
                sexe, 
                age, 
                etatCivil, 
                avatar, 
                nomCompletTutaire, 
                emailTutaire, 
                phoneTutaire,
                datastatus:process.env.AP_ACTIVE,
                createdon: process.env.AP_UNACTIVE,
                modifiedby: process.env.AP_UNACTIVE,
                deleteby: process.env.AP_UNACTIVE
            })
        } catch (error) {
            
        }
    }
}