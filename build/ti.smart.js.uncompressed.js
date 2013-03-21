/**
 * Provides a Titanium wrapper around calls to the SmartThings APIs.
 */
var smartApi = (function() {
    // +-----------------------+
    // | Private members.      |
    // +-----------------------+

    var urlRoot = 'https://graph.api.smartthings.com/api/';

    var urls = {
            getEvents : urlRoot + 'smartapps/installations/{id}/events/',
            showSmartappInstallation : urlRoot + 'smartapps/installations/{id}/',
            getSmartappInstallations : urlRoot + 'smartapps/installations/',
            showSmartappEditable : urlRoot + 'smartapps/editable/{id}/',
            getSmartappEditable : urlRoot + 'smartapps/editable/',
            showSmartappApprovalRequest : urlRoot + 'smartapps/approvalrequests/{id}/',
            getSmartappApprovalRequests : urlRoot + 'smartapps/approvalrequests/',
            showSmartappVersion : urlRoot + 'smartapps/{id}/versions/{alt_id}/',
            getSmartappVersions : urlRoot + 'smartapps/{id}/versions',
            showSmartapp : urlRoot + 'smartapps/{id}',
            getSmartapps : urlRoot + 'smartapps',
            showSmartappCategory : urlRoot + 'smartappcategories/{id}',
            getSmartappCategories : urlRoot + 'smartappcategories',
            showLocationOrder : urlRoot + 'locations/order',
            getLocationImages : urlRoot + 'locations/images',
            showLocationDeviceOrder : urlRoot + 'locations/devices/order',
            getLocationSmartapps : urlRoot + 'locations/{id}/smartapps',
            getLocationRoles : urlRoot + 'locations/{id}/roles',
            showLocationMode : urlRoot + 'locations/{id}/modes/{alt_id}',
            getLocationModes : urlRoot + 'locations/{id}/modes',
            sendLocationModeChange : urlRoot + 'locations/{id}/modeChanges/{alt_id}',
            postHubClaim : urlRoot + 'locations/{id}/hubs/claim',
            getLocationHubs : urlRoot + 'locations/{id}/hubs',
            getLocationGroups : urlRoot + 'locations/{id}/groups',
            getLocationEvents : urlRoot + 'locations/{id}/events',
            getLocationDevices : urlRoot + 'locations/{id}/devices',
            showLocation : urlRoot + 'locations/{id}',
            getLocations : urlRoot + 'locations',
            getHubRoles : urlRoot + 'hubs/{id}/roles',
            getHubEvents : urlRoot + 'hubs/{id}/events',
            getHubDevices : urlRoot + 'hubs/{id}/devices',
            sendHubCommand : urlRoot + 'hubs/{id}/command/',
            showHub : urlRoot + 'hubs/{id}',
            getHubs : urlRoot + 'hubs',
            getGroupRoles : urlRoot + 'groups/{id}/roles',
            getGroupEvents : urlRoot + 'groups/{id}/events',
            showGroupDevice : urlRoot + 'groups/{id}/devices/{alt_id}',
            getGroupDevices : urlRoot + 'groups/{id}/devices',
            showGroup : urlRoot + 'groups/{id}',
            getGroups : urlRoot + 'groups',
            showDeviceType : urlRoot + 'devicetypes/{id}',
            getDeviceTypes : urlRoot + 'devicetypes/',
            showDeviceIcon : urlRoot + 'devices/icons/{id}',
            getDeviceIcons : urlRoot + 'devices/icons',
            showDeviceStateOverride : urlRoot + 'devices/{id}/stateOverrides/{alt_id}',
            getDeviceStateOverrides : urlRoot + 'devices/{id}/stateOverrides',
            getDeviceRoles : urlRoot + 'devices/{id}/roles',
            getDeviceEvents : urlRoot + 'devices/{id}/events',
            sendDeviceCommand : urlRoot + 'devices/{id}/commands/',
            showDevice : urlRoot + 'devices/{id}',
            getDevices : urlRoot + 'devices',
            showClient : urlRoot + 'clients/{id}',
            getRoles : urlRoot + 'accounts/{id}/roles',
            showAccount : urlRoot + 'accounts/{id}',
            getAccounts : urlRoot + 'accounts',
            createAccount : urlRoot + 'accounts',//POST
            addDevice : urlRoot + 'groups/{id}/devices',//POST
            removeDevice : urlRoot + 'groups/{id}/devices',//DELETE
            createGroup : urlRoot + 'groups',//POST
            createClient : urlRoot + 'clients',//POST
            createHub : urlRoot + 'hubs',//POST
            postHubsManufactured : urlRoot + 'hubs/manufactured',//POST
            createLocation : urlRoot + 'locations',//POST
            createLocationMode : urlRoot + 'locations/{id}/modes',//POST
            addLocationSmartApp : urlRoot + 'locations/{id}/smartapps',//POST
            installSmartApp : urlRoot + 'smartapps/installations',//POST
            createSmartApp : urlRoot + 'smartapps',//POST
            createApprovalRequest : urlRoot + 'smartapps/approvalrequests' //POST
            
    };    
    
    var properties = {
        username:null,
        password:null,
        logging:true
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
            var url = encodeURI(params.url);
            var body = params.body || null;
            var type = params.type?params.type:"GET";
            var onload = params.onload || null;
            var onerror = params.onerror || null;
            var xhr = Ti.Network.createHTTPClient();
            
            if(properties.logging){
                Ti.API.info("SmartThings API: "+url);
            }

            xhr.username = auth.username;
            xhr.password = auth.password;
       
            xhr.onload = function(e) {
                
                if (this.status === 200 || this.status === 201) {
                    if(properties.logging){
                        Ti.API.info("SmartThings Response: "+this.responseText);
                    }
                    onload && onload(JSON.parse(this.responseText));

                } else if(this.status === 204){
                    if(properties.logging){
                        Ti.API.info("SmartThings Response: NO CONTENT");
                    }
                    onload && onload("No Available Content");
                    
                } else{
                    if(properties.logging){
                        Ti.API.error("SmartThings Error: "+e);
                    }
                    this.onerror(e);

                }
            };
            
            xhr.onerror = function(e) {
                onerror && onerror(e);
            };
            
            xhr.open(type, url);
            
            xhr.send(body);
            
        } else {
            alert("Please Login to SmartThings");
            return
        }
    };
    
    
    // +-----------------------+
    // | Public members.       |
    // +-----------------------+
   
    /*Admin functions available
    * 
    */
    var checkAuth = false;
    
    var setLogging = function(params){
        properties.logging = params;
    };
    var setAuth = function(params){
        if(params && params!="clear"){
            if(params.username){
                 properties.username = Titanium.Utils.base64encode(params.username);
            }
            if(params.password){
                properties.password = Titanium.Utils.base64encode(params.password);
                checkAuth = true;
            }
        } else if(params == "clear"){
            properties.username = null;
            properties.password = null;
            checkAuth = false;
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
    
    var getEvents = function(params){
        if (params && params.id) {
            params.url = urls.getEvents.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showSmartappInstallation = function(params){
        if (params && params.id) {
            params.url = urls.showSmartappInstallation.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getSmartappInstallations = function(params){
            params.url = urls.getSmartappInstallations;
            fetch(params);
    };
    var showSmartappEditable = function(params){
        if (params && params.id) {
            params.url = urls.showSmartappEditable.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getSmartappEditable = function(params){
            params.url = urls.getSmartappEditable;
            fetch(params);
    };
    var showSmartappApprovalRequest = function(params){
        if (params && params.id) {
            params.url = urls.showSmartappApprovalRequest.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getSmartappApprovalRequests = function(params){
            params.url = urls.getSmartappApprovalRequests;
            fetch(params);
    };
    var showSmartappVersion = function(params){
        if (params && params.id && params.versions_id){
            params.url = urls.showSmartappVersion.replace('{id}',params.id).replace("{alt_id}",params.versions_id);
            fetch(params);
        }
    };
    var getSmartappVersions = function(params){
        if (params && params.id) {
            params.url = urls.getSmartappVersions.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showSmartapp = function(params){
        if (params && params.id) {
            params.url = urls.showSmartapp.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getSmartapps = function(params){
            params.url = urls.getSmartapps;
            fetch(params);
    };
    var showSmartappCategory = function(params){
        if (params && params.id) {
            params.url = urls.showSmartappCategory.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getSmartappCategories = function(params){
            params.url = urls.getSmartappCategories;
            fetch(params);
    };
    var showLocationOrder = function(params){
            params.url = urls.showLocationOrder;
            fetch(params);
    };
    var getLocationImages = function(params){
            params.url = urls.getLocationImages;
            fetch(params);
    };
    var showLocationDeviceOrder = function(params){
            params.url = urls.showLocationDeviceOrder;
            fetch(params);
    };
    var getLocationSmartapps = function(params){
        if (params && params.id) {
            params.url = urls.getLocationSmartapps.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getLocationRoles = function(params){
        if (params && params.id) {
            params.url = urls.getLocationRoles.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showLocationMode = function(params){
        if (params && params.id && params.mode_id){
            params.url = urls.showLocationMode.replace('{id}',params.id).replace("{alt_id}", params.mode_id);
            fetch(params);
        }
    };
    var getLocationModes = function(params){
        if (params && params.id) {
            params.url = urls.getLocationModes.replace('{id}',params.id);
            fetch(params);
        }
    };
    var sendLocationModeChange = function(params){
        if (params && params.id && params.modeChanges_id){
            params.url = urls.sendLocationModeChange.replace('{id}',params.id).replace("{alt_id}", params.modeChanges_id);
            fetch(params);
        }
    };
    var postHubClaim = function(params){
        if (params && params.id) {
            params.url = urls.postHubClaim.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getLocationHubs = function(params){
        if (params && params.id) {
            params.url = urls.getLocationHubs.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getLocationGroups = function(params){
        if (params && params.id) {
            params.url = urls.getLocationGroups.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getLocationEvents = function(params){
        if (params && params.id) {
            params.url = urls.getLocationEvents.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getLocationDevices = function(params){
        if (params && params.id) {
            params.url = urls.getLocationDevices.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showLocation = function(params){
        if (params && params.id) {
            params.url = urls.showLocation.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getLocations = function(params){
            params.url = urls.getLocations;
            fetch(params);
    };
    var showHubsManufactured = function(params){
            params.url = urls.showHubsManufactured;
            fetch(params);
    };
    var getHubRoles = function(params){
        if (params && params.id) {
            params.url = urls.getHubRoles.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getHubEvents = function(params){
        if (params && params.id) {
            params.url = urls.getHubEvents.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getHubDevices = function(params){
        if (params && params.id) {
            params.url = urls.getHubDevices.replace('{id}',params.id);
            fetch(params);
        }
    };
    var sendHubCommand = function(params){
        if (params && params.id) {
            params.url = urls.sendHubCommand.replace('{id}',params.id);
            params.type = "POST";
            fetch(params);
        }
    };
    var showHub = function(params){
        if (params && params.id) {
            params.url = urls.showHub.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getHubs = function(params){
            params.url = urls.getHubs;
            fetch(params);
    };
    var getGroupRoles = function(params){
        if (params && params.id) {
            params.url = urls.getGroupRoles.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getGroupEvents = function(params){
        if (params && params.id) {
            params.url = urls.getGroupEvents.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showGroupDevice = function(params){
        if (params && params.id && params.device_id){
            params.url = urls.showGroupDevice.replace('{id}',params.id).replace("{alt_id}",params.device_id);
            fetch(params);
        }
    };
    var getGroupDevices = function(params){
        if (params && params.id) {
            params.url = urls.getGroupDevices.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showGroup = function(params){
        if (params && params.id) {
            params.url = urls.showGroup.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getGroups = function(params){
            params.url = urls.getGroups;
            fetch(params);
    };
    var showDeviceType = function(params){
        if (params && params.id) {
            params.url = urls.showDeviceType.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getDeviceTypes = function(params){
            params.url = urls.getDeviceTypes;
            fetch(params);
    };
    var showDeviceIcon = function(params){
        if (params && params.id) {
            params.url = urls.showDeviceIcon.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getDeviceIcons = function(params){
            params.url = urls.getDeviceIcons;
            fetch(params);

    };
    var showDeviceStateOverride = function(params){
        if (params && params.id && params.stateOverrides_id) {
            params.url = urls.showDeviceStateOverride.replace('{id}',params.id).replace("{alt_id}",params.stateOverrides_id);
            fetch(params);
        }
    };
    var getDeviceStateOverrides = function(params){
        if (params && params.id) {
            params.url = urls.getDeviceStateOverrides.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getDeviceRoles = function(params){
        if (params && params.id) {
            params.url = urls.getDeviceRoles.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getDeviceEvents = function(params){
        if (params && params.id) {
            params.url = urls.getDeviceEvents.replace('{id}',params.id);
            fetch(params);
        }
    };
    var sendDeviceCommand = function(params){
        if (params && params.id) {
            params.url = urls.sendDeviceCommand.replace('{id}',params.id);
            params.type = "POST";
            fetch(params);
        }
    };
    var showDevice = function(params){
        if (params && params.id) {
            params.url = urls.showDevice.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getDevices = function(params){
            params.url = urls.getDevices;
            fetch(params);
    };
    var showClient = function(params){
        if (params && params.id) {
            params.url = urls.showClient.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getClients = function(params){
            params.url = urls.getClients;
            fetch(params);
    };
    var getRoles = function(params){
        if (params && params.id) {
            params.url = urls.getRoles.replace('{id}',params.id);
            fetch(params);
        }
    };
    var showAccount = function(params){
        if (params && params.id) {
            params.url = urls.showAccount.replace('{id}',params.id);
            fetch(params);
        }
    };
    var getAccounts = function(params){
            params.url = urls.getAccounts;
            fetch(params);
    };
    
    var createAccount = function(params){
            params.url = urls.createAccount;
            params.type = "POST";
            fetch(params);
    };
    var addDevice = function(params){
        if (params && params.id) {
            params.url = urls.addDevice.replace('{id}',params.id);
            params.type = "POST";
            fetch(params);
        }
    };
    var removeDevice = function(params){
        if (params && params.id) {
            params.url = urls.removeDevice.replace('{id}',params.id);
            params.type = "DELTE";
            fetch(params);
        }
    };
    var createGroup = function(params){
            params.url = urls.createGroup;
            params.type = "POST";
            fetch(params);
    };
    var createClient = function(params){
            params.url = urls.createClient;
            params.type = "POST";
            fetch(params);
    }; 
    var createHub = function(params){
            params.url = urls.createHub;
            params.type = "POST";
            fetch(params);
    };
    var postHubsManufactured = function(params){
            params.url = urls.postHubsManufactured;
            params.type = "POST";
            fetch(params);
    }; 
    var createLocation = function(params){
            params.url = urls.createLocation;
            params.type = "POST";
            fetch(params);
    }; 
    var createLocationMode = function(params){
        if (params && params.id) {
            params.url = urls.createLocationMode.replace('{id}',params.id);
            params.type = "POST";
            fetch(params);
        }
    };
    var addLocationSmartApp = function(params){
        if (params && params.id) {
            params.url = urls.addLocationSmartApp.replace('{id}',params.id);
            params.type = "POST";
            fetch(params);
        }
    };
    var installSmartApp = function(params){
            params.url = urls.installSmartApp;
            params.type = "POST";
            fetch(params);
    }; 
    var createSmartApp = function(params){
            params.url = urls.createSmartApp;
            params.type = "POST";
            fetch(params);
    };
    var createApprovalRequest = function(params){
            params.url = urls.createApprovalRequest;
            params.type = "POST";
            fetch(params);
    };
   
    return {
        setLogging : setLogging,
        checkAuth : checkAuth,
        setAuth : setAuth,
        getEvents : getEvents,
        showSmartappInstallation : showSmartappInstallation,
        getSmartappInstallations : getSmartappInstallations,
        showSmartappEditable : showSmartappEditable,
        getSmartappEditable : getSmartappEditable,
        showSmartappApprovalRequest : showSmartappApprovalRequest,
        getSmartappApprovalRequests : getSmartappApprovalRequests,
        showSmartappVersion : showSmartappVersion,
        getSmartappVersions : getSmartappVersions,
        showSmartapp : showSmartapp,
        getSmartapps : getSmartapps,
        showSmartappCategory : showSmartappCategory,
        getSmartappCategories : getSmartappCategories,
        showLocationOrder : showLocationOrder,
        getLocationImages : getLocationImages,
        showLocationDeviceOrder : showLocationDeviceOrder,
        getLocationSmartapps : getLocationSmartapps,
        getLocationRoles : getLocationRoles,
        showLocationMode : showLocationMode,
        getLocationModes : getLocationModes,
        sendLocationModeChange : sendLocationModeChange,
        postHubClaim : postHubClaim,
        getLocationHubs : getLocationHubs,
        getLocationGroups : getLocationGroups,
        getLocationEvents : getLocationEvents,
        getLocationDevices : getLocationDevices,
        showLocation : showLocation,
        getLocations : getLocations,
        showHubsManufactured : showHubsManufactured,
        getHubRoles : getHubRoles,
        getHubEvents : getHubEvents,
        getHubDevices : getHubDevices,
        sendHubCommand : sendHubCommand,
        showHub : showHub,
        getHubs : getHubs,
        getGroupRoles : getGroupRoles,
        getGroupEvents : getGroupEvents,
        showGroupDevice : showGroupDevice,
        getGroupDevices : getGroupDevices,
        showGroup : showGroup,
        getGroups : getGroups,
        showDeviceType : showDeviceType,
        getDeviceTypes : getDeviceTypes,
        showDeviceIcon : showDeviceIcon,
        getDeviceIcons : getDeviceIcons,
        showDeviceStateOverride : showDeviceStateOverride,
        getDeviceStateOverrides : getDeviceStateOverrides,
        getDeviceRoles : getDeviceRoles,
        getDeviceEvents : getDeviceEvents,
        sendDeviceCommand : sendDeviceCommand,
        showDevice : showDevice,
        getDevices : getDevices,
        showClient : showClient,
        getClients : getClients,
        getRoles : getRoles,
        showAccount : showAccount,
        getAccounts : getAccounts,
        createAccount : createAccount,
        addDevice : addDevice,
        removeDevice : removeDevice,
        createGroup : createGroup,
        createClient : createClient,
        createHub : createHub,
        postHubsManufactured : postHubsManufactured,
        createLocation : createLocation,
        createLocationMode : createLocationMode,
        addLocationSmartApp : addLocationSmartApp,
        installSmartApp : installSmartApp,
        createSmartApp : createSmartApp,
        createApprovalRequest : createApprovalRequest
    };
})();

module.exports = smartApi;