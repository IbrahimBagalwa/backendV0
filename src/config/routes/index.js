import express from 'express';
import courseRoutes from './api/course.routes';

const routes = express.Router()

routes
    .use('/course',courseRoutes)

export default routes;