export const successCodes = {
    ok : 200, 
    created :201,
}

export const errorCodes = {
    badRequest: 400, // mauvaise Requette
    unAuthorized: 401, // aucune authorisation
    forbidden: 403, // interdit
    notFound: 404, // inexistant
    conflict: 409, // doublon
    internalServerError: 500, // erreur serveur
}