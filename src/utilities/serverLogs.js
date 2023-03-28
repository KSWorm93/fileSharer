//TODO - make console logs for starting the server in a nice clear reading format

//Server start

//Server done setup

//...

var types = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    WARN: 'WARN'
}

function log(type, details) {
    // var filename = getLogFile(type);
    console.log({
        [types[type]]: 'errorfile',
        details: details
    })
    //append to file
}

function getLogFile(type) {
    //check file
    //file too big > create new
    //return file
}