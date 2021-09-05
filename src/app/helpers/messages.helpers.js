// when we send the response we use one function of this

export const successMessages = {
    accountCreate : "Votre compte a été créé avec success !",
    courseCreate : "Le cours a été créée avec success !",
    roleCreate : "Le role a été créé avec success !",
    roleAssignedSuccess : "Le rôle a été attribué avec succès !",
    loginSuccess : "Connecté avec succès!",
    loggedOut : "Déconnecté avec succès!",
    approveEmailAddressToAdmin : "Félicitations !\n\nVotre maison a été ajoutée temporairement.!\n\nNous avons envoyé un e-mail à l\'administrateur système, veuillez attendre qu\'il valide votre maison.",
    recordFound : "Enregistrement récupéré avec succès !",
    updateSuccess : "Enregistrements mis à jour avec succès!",
    deleteRecordSuccess: "Enregistrement supprimé avec succès!",
    recordCreateSuccess : "Enregistrement créé avec succès !",
    disableHouse : "la maison a été désactivée avec success ! ",
    welcome : "Welcome to Immob Company API",
}

export const errorMessages ={
    accountFailedToCreate: 'Désolé !\nLe compte n\'a pas été créé, une erreur s\'est produite. Veuillez réessayer !',
    roleFailedCreate :'Désolé !\nLa carte n\'a pas été créée, une erreur s\'est produite. Veuillez réessayer !',
    userFailedToUpdate: 'Désolé !\nÉchec de la mise à jour de transaction ! Veuillez réessayer !',
    roleAssignmentFail: 'Désolé !\nL\'attribution de ce rôle à cet utilisateur a échoué, veuillez réessayer !',
    loginFail: 'Désolé !\nVous avez fourni un mauvais numero ou un mot de passe erroné, veuillez réessayer !',
    noRecordFound: 'Aucune données enregistrement n\'a été trouvé !',
    deleteRecordFail: 'Échec de la suppression de l\'enregistrement, réessayez !',
    roleCreateFail: 'Échec de la création de la cart, réessayez !',
    updateFail: 'Échec de la mise à jour de l\'enregistrement, veuillez réessayer !',
    recordCreateFail: 'Échec de la création de l\'enregistrement, veuillez réessayer !',
    passwordFail:'Mot de passe incorrect, veuillez réessayer !!',
    phoneFail: 'Désolé !\nVous avez fourni un mauvais numero, veuillez réessayer !',
    fieldValidation : 'Veuillez remplir tous les champs obligatoires',
    duplicatedPhone: 'le numero entrer a déjà été pris !',
    duplicatedCourse: 'le cous entrer existe déjà!',
    duplicatedEmail: 'l\'email entrer a déjà été pris !',
    interError: 'Une Erreur interne est survenue',
}