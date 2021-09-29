import express from 'express';
import courseRoutes from './api/course.routes';
import classRoutes from './api/class.routes';
import studentRoutes from './api/student.routes';

const routes = express.Router()

routes
    .use('/course',courseRoutes)
    .use('/class', classRoutes)
    .use('/student', studentRoutes)

export default routes;