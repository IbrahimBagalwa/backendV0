import db from '../models';
import dotenv from 'dotenv';

dotenv.config();

export default {
    cotationParEleve: async (req, res)=>{
        const {idStudent, idCours, idClass, typeCotation,cotaion, periode } = req.body;

        try {
            const isCotation = await db.Cotation.create({
                idClass,
                idCours,
                idStudent,
                typeCotation,
                cotaion,
                periode
            })
        } catch (error) {
            
        }
    }
}