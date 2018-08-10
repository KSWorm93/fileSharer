module.exports = {
    errorPage: sendToErrorPage
}

/**
 * Render error page
 * @param {*} response Response object 
 * @param {*} message Error message
 * @param {*} errorCode HTTP response code
 * @param {*} errorDescription HTTP response description
 */
function sendToErrorPage(response, message, errorCode, errorDescription) {
    response.render('error',
        {
            title: 'Error',
            message: message,
            code: errorCode,
            description: errorDescription
        })
}