import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
import {sendSuccessResponse} from '../app/helpers/responses.helpers';
import {ok} from '../app/helpers/statusCodes.helper';
import {welcome} from '../app/helpers/messages.helpers';

const {ok} = successCodes;
const {welcome} = successMessages;

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