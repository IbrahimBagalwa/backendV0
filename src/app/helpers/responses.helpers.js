export const sendSuccessResponse = (
    res,
    code,
    message,
    token,
    data
) =>res.status(code).json({
    status: code,
    message,
    token,
    data
});

export const sendErrorResponse = (
    res,
    code,
    error
    
)=>res.status(code).json({
    status : code,
    error
});