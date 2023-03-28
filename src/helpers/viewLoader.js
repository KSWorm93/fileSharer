var content = require('./contentLoader');

module.exports = {
    renderContent: renderContent,
    renderStream: renderStream
}

function renderContent(response, view, type, subType = false) {
    console.log('hello from renderView')
    console.log(type)
    console.log(subType)

    content.getContent(type, subType).then(function (contentObj) {
        response.render(view, contentObj);
    });
}

function renderStream(response, view, type, id) {
    console.log('hello from renderStream')
    console.log(type)
    console.log(id)
    content.getStream(type, id).then(function (streamObj) {
        response.render(view, streamObj);
    });
}