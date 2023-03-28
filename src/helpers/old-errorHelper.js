module.exports = {
    errorPage: sendToErrorPage
}

/**
 * Render error page
 * @param {*} response Response object 
 * @param {*} message Error message
 * @param {*} errorCode HTTP response code
 * @param {*} errorDescription HTTP response description
 * @param {*} returnPath Return path - Default home
 */
function sendToErrorPage(response, message, errorCode, errorDescription, returnPath = 'home') {
    response.render('error',
        {
            title: 'Error',
            message: message,
            code: errorCode,
            description: errorDescription,
            returnPath: returnPath
        })
}