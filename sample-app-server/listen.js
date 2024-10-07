module.exports = function (https,PORT,BUILD) {
    https.listen(PORT, () => {
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (BUILD === 'dev'){
        console.log('CORS enabled Server has been started at : ' + n + ':' + m + ' on port ' + PORT);
        }
    });
}
