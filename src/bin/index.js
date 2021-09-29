import express from 'express';
import dotenv from 'dotenv';
import UploadedFile from 'express-fileupload';

dotenv.config();
const app = express();
import routes from '../config/routes/index.js'
import {sendSuccessResponse} from '../app/helpers/responses.helpers.js';
import {successCodes} from '../app/helpers/statusCodes.helper.js';
import {successMessages} from '../app/helpers/messages.helpers.js';


const {ok} = successCodes;
const {welcome} = successMessages;

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));
app.use(UploadedFile())

app.get('/resource/:resources', (req, res, next) => {
    const rss = (req.params['resources']);
    res
        .status(200)
        .sendFile(path.resolve(`/public/assets/${rss}`));
    // next();
})
app.use("/api", routes);

app.get('/', (req,res)=>{
    sendSuccessResponse(res, ok, welcome,null, null)
});

app.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
    });
});

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`the server run on port ${port} success`)
})