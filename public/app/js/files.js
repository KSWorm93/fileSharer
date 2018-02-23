/**
 * On content loaded
 */
window.onload = function () {
    let title = document.title;
    console.log(title + " was loaded!")
    loadContent(title)
}