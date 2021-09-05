import db from '../models';
import dotenv from 'dotenv';
dotenv.config();

export default {
    create: async (req, res)=>{
        const { nom,cotation,idClasse,titulaire,heure,datastus,createdon,modifiedby,deleteby } = req.body;
        try {
            const createCourse = await db.Cours.create({
                nom,
                cotation,
                idClasse,
                titulaire,
                heure,
                datastus: process.env.DB_DATASTATUS,
                createdon: createdAt,
                modifiedby: process.env.DB_UNACTIVE,
                deleteby: process.env.DB_UNACTIVE
            })
        } catch (error) {
            
        }
    }
}