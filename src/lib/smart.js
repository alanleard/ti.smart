/**
 * Provides a Titanium wrapper around calls to the SmartThings APIs.
 */
var smartApi = (function() {
    // +-----------------------+
    // | Private members.      |
    // +-----------------------+

    var urlRoot = 'https://graph.api.smartthings.com/api/';
    var publicMethods = {};
    var logLevel = 'debug';
     
    var API = {
            getEvents : {url:'smartapps/installations/{id}/events/',type:'GET'},
            showSmartappInstallation : {url:'smartapps/installations/{id}/',type:'GET'},
            getSmartappInstallations : {url:'smartapps/installations/',type:'GET'},
            showSmartappEditable : {url:'smartapps/editable/{id}/',type:'GET'},
            getSmartappEditable : {url:'smartapps/editable/',type:'GET'},
            showSmartappApprovalRequest : {url:'smartapps/approvalrequests/{id}/',type:'GET'},
            getSmartappApprovalRequests : {url:'smartapps/approvalrequests/',type:'GET'},
            showSmartappVersion : {url:'smartapps/{id}/versions/{alt_id}/',type:'GET'},
            getSmartappVersions : {url:'smartapps/{id}/versions/',type:'GET'},
            showSmartapp : {url:'smartapps/{id}/',type:'GET'},
            getSmartapps : {url:'smartapps/',type:'GET'},
            showSmartappCategory : {url:'smartappcategories/{id}/',type:'GET'},
            getSmartappCategories : {url:'smartappcategories/',type:'GET'},
            showLocationOrder : {url:'locations/order/',type:'GET'},
            getLocationImages : {url:'locations/images/',type:'GET'},
            showLocationDeviceOrder : {url:'locations/devices/order/',type:'GET'},
            getLocationSmartapps : {url:'locations/{id}/smartapps/',type:'GET'},
            getLocationRoles : {url:'locations/{id}/roles/',type:'GET'},
            showLocationMode : {url:'locations/{id}/modes/{alt_id}/',type:'GET'},
            getLocationModes : {url:'locations/{id}/modes/',type:'GET'},
            sendLocationModeChange : {url:'locations/{id}/modeChanges/{alt_id}/',type:'GET'},
            postHubClaim : {url:'locations/{id}/hubs/claim/',type:'GET'},
            getLocationHubs : {url:'locations/{id}/hubs/',type:'GET'},
            getLocationGroups : {url:'locations/{id}/groups/',type:'GET'},
            getLocationEvents : {url:'locations/{id}/events/',type:'GET'},
            getLocationDevices : {url:'locations/{id}/devices/',type:'GET'},
            showLocation : {url:'locations/{id}/',type:'GET'},
            getLocations : {url:'locations/',type:'GET'},
            getHubRoles : {url:'hubs/{id}/roles/',type:'GET'},
            getHubEvents : {url:'hubs/{id}/events/',type:'GET'},
            getHubDevices : {url:'hubs/{id}/devices/',type:'GET'},
            sendHubCommand : {url:'hubs/{id}/command/',type:'GET'},
            showHub : {url:'hubs/{id}/',type:'GET'},
            getHubs : {url:'hubs/',type:'GET'},
            getGroupRoles : {url:'groups/{id}/roles/',type:'GET'},
            getGroupEvents : {url:'groups/{id}/events/',type:'GET'},
            showGroupDevice : {url:'groups/{id}/devices/{alt_id}/',type:'GET'},
            getGroupDevices : {url:'groups/{id}/devices/',type:'GET'},
            showGroup : {url:'groups/{id}/',type:'GET'},
            getGroups : {url:'groups/',type:'GET'},
            showDeviceType : {url:'devicetypes/{id}/',type:'GET'},
            getDeviceTypes : {url:'devicetypes/',type:'GET'},
            showDeviceIcon : {url:'devices/icons/{id}/',type:'GET'},
            getDeviceIcons : {url:'devices/icons/',type:'GET'},
            showDeviceStateOverride : {url:'devices/{id}/stateOverrides/{alt_id}/',type:'GET'},
            getDeviceStateOverrides : {url:'devices/{id}/stateOverrides/',type:'GET'},
            getDeviceRoles : {url:'devices/{id}/roles/',type:'GET'},
            getDeviceEvents : {url:'devices/{id}/events/',type:'GET'},
            sendDeviceCommand : {url:'devices/{id}/commands/',type:'GET'},
            showDevice : {url:'devices/{id}/',type:'GET'},
            getDevices : {url:'devices/',type:'GET'},
            showClient : {url:'clients/{id}/',type:'GET'},
            getRoles : {url:'accounts/{id}/roles/',type:'GET'},
            showAccount : {url:'accounts/{id}/',type:'GET'},
            getAccounts : {url:'accounts/',type:'GET'},
            createAccount : {url:'accounts/',type:'POST'},
            addDevice : {url:'groups/{id}/devices/',type:'POST'},
            removeDevice : {url:'groups/{id}/devices/',type:'DELETE'},
            createGroup : {url:'groups/',type:'POST'},
            createClient : {url:'clients/',type:'POST'},
            createHub : {url:'hubs/',type:'POST'},
            postHubsManufactured : {url:'hubs/manufactured/',type:'POST'},
            createLocation : {url:'locations/',type:'POST'},
            createLocationMode : {url:'locations/{id}/modes/',type:'POST'},
            addLocationSmartApp : {url:'locations/{id}/smartapps/',type:'POST'},
            installSmartApp : {url:'smartapps/installations/',type:'POST'},
            createSmartApp : {url:'smartapps/',type:'POST'},
            createApprovalRequest : {url:'smartapps/approvalrequests/',type:'POST'}
            
    };
      
    var log = {
        info: function(params){
            if(logLevel == 'info'){
                Ti.API.info(params);
            } else if (logLevel == 'debug'){
                Ti.API.debug(params);
            }
        },
        debug: function(params){
            if(logLevel == 'info'){
                Ti.API.info(params);
            } else if (logLevel == 'debug'){
                Ti.API.debug(params);
            }
    
        },
        error: function(params){
            if(logLevel == 'info'){
                Ti.API.info(params);
            } else if (logLevel == 'debug'){
                Ti.API.error(params);
            }
            
        }      
    };
    var properties = {
        username:null,
        password:null
    };

    var getAuth = function(){
        if(properties.username && properties.password){
            return {
                username:Titanium.Utils.base64decode(properties.username),
                password:Titanium.Utils.base64decode(properties.password)
            }
        } else {
            
            return null;
        }
    };
    
    var fetch = function(params) {
        
        var auth = getAuth();
        
        if(auth){
            var url_params = "?"+params.url_params || "";
            var url = encodeURI(urlRoot + params.url + url_params);
            var body = params.body || null;
            var type = params.type?params.type:"GET";
            var onload = params.onload || null;
            var onerror = params.onerror || null;
            var xhr = Ti.Network.createHTTPClient();
            
            xhr.username = auth.username;
            xhr.password = auth.password;
            
            log.debug("SmartThings Request: "+url);
            
            xhr.onload = function(e) {
                e.status = this.status;
                if (this.status == 200 || this.status == 201) {
                        onload && onload(JSON.parse(this.responseText));
                        log.debug("SmartThings Response: "+this.responseText);
                   
                } else if(this.status === 204){
                    log.debug("SmartThings Response: NO CONTENT");
                    onload && onload("No Available Content");
                    
                } else{
                    log.debug("SmartThings Error: "+this.status+"("+e+")");
                    this.onerror(e);
                }
            };
            
            xhr.onerror = function(e) {
                log.debug("SmartThings Request Error: "+this.status);
                e.status = this.status;
                onerror && onerror(e);
            };
            
            xhr.open(type, url);
            
            xhr.send(body);
            
        } else {
            log.error("SmartThings Authorization Required.");
        }
    };
    
    // +-----------------------+
    // | Public members.       |
    // +-----------------------+
   
    /*Admin functions available
    * 
    */
    publicMethods.checkAuth = false;
    
    publicMethods.setLogging = function(params){
        if(params == "debug" || params == "info"){
            logLevel = params;
        } else {
            log.debug("MODULE ti.smart setLogging only accepts 'info' or 'debug' as valid parameters.");
        }
    };
    publicMethods.setAuth = function(params){
        if(params && params!="clear"){
            if(params.username){
                 properties.username = Titanium.Utils.base64encode(params.username);
            }
            if(params.password){
                properties.password = Titanium.Utils.base64encode(params.password);
                publicMethods.checkAuth = true;
            }
        } else if(params == "clear"){
            properties.username = null;
            properties.password = null;
            publicMethods.checkAuth = false;
        }
    };
          
    /* SmartThings API Set.
     *  params:{
     *      id: The primary id of the object request
     *      alt_id: Some API's require a second ID
     *      type: "GET"/"POST"/"PUT"/"DELETE"
     *      body: JSON body to pass with "POST" or "PUT"
     *      onload: The onload callback, returns single parameter as parsed JSON
     *      onerror: The onerror callback, returns single parameter as error response
     *  }
     */
    
    //Generate public API methods
    for(var method in API){
        createMethod(method)
    }
    
    function createMethod(_method){
        if(API[_method].url.indexOf("{id}")!=-1 && API[_method].url.indexOf("{alt_id}")!=-1){
            
             publicMethods[_method] = function(params){
                if (params && params.id && params.alt_id) {
                    params.url = API[_method].url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
                    params.type =API[_method].type;
                    fetch(params);
                } else if(params && !params.id){
                    log.error("MODULE ti.smart: Missing required parameter 'alt_id' for "+_method);
                } else if(params && !params.alt_id){
                    log.error("MODULE ti.smart: Missing required parameter 'id' for "+_method);
                } else {
                    log.error("MODULE ti.smart: Missing parameters for "+_method);
                }
            };
             
        } else if (API[_method].url.indexOf("{id}")!=-1){
             
             publicMethods[_method] = function(params){
                if (params && params.id) {
                    params.url = API[_method].url.replace('{id}',params.id);
                    params.type =API[_method].type; 
                    fetch(params);
                } else if(params && !params.id){
                    log.error("MODULE ti.smart: Missing required parameter 'id' for "+_method);
                } else {
                    log.error("MODULE ti.smart: Missing parameters for "+_method);
                }
             };
             
        } else {
             
             publicMethods[_method] = function(params){
                params.url = API[_method].url; 
                params.type =API[_method].type; 
                fetch(params);
            };
             
        }
    };
   
    return publicMethods = {};
})();

module.exports = smartApi;