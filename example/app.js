var win = Ti.UI.createWindow();
var team = require('TeamworkPM');

if(!Ti.App.Properties.hasProperty('auth')){
    team.setAuth({
        apiKey:"YOUR-API-KEY", //Instructions: http://developer.teamworkpm.net/enabletheapiandgetyourkey
        callback:sampleFunction
    });
} else {
    sampleFunction();
}

function sampleFunction(){
    team.getPersonPermissions({
        id:"PROJECT_ID",
        alt_id:"PERSON_ID",
        onload:function(e){
            Ti.API.info(JSON.stringify(e));
            alert("Success: "+e);
        },
        onerror:function(e){
            Ti.API.error(e);
            alert("Error: "+e.status);
        }
    });
};

win.open();
