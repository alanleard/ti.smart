/**
 * Provides a Titanium wrapper around calls to the TeamworkPM APIs.
 * API set documentation: http://developer.teamworkpm.net/introduction
 */
var teamApi = (function() {
    // +-----------------------+
    // | Private members.      |
    // +-----------------------+
    
    var urlRoot = 'http://appcelerator.teamworkpm.net/';
    var responseType = '.json';

    var API = {
        getAccount :{url:'account',type:'POST'},
        authenticate :{url:'authenticate',type:'GET'},
        getLatestActivity :{url:'latestActivity',type:'GET'},
        getLatestProjectActivity :{url:'projects/{id}/latestActivity',type:'GET'},
        createCategory :{url:'projects/{id}/messageCategories//POST',type:'PUT'},
        getCategory :{url:'messageCategories/{id}',type:'DELETE'},
        getCategories :{url:'projects/{id}/messageCategories',type:'POST'},
        getRecentComments:{url:'{id}/{alt_id}/comments',type:'PUT'},
        getComment:{url:'comments/{id}',type:'DELETE'},
        createComment:{url:'/{id}/{alt_id}/comments',type:'GET'},
        updateComment:{url:'comments/{id}//PUT',type:'GET'},
        deleteComment:{url:'comments/{id}//DELETE',type:'GET'},
        createCompany:{url:'companies',type:'GET'},
        updateCompany:{url:'companies/{id}//PUT',type:'GET'},
        deleteCompany:{url:'companies/{id}//DELETE',type:'GET'},
        getCompany:{url:'companies/{id}',type:'GET'},
        getAllCompanies:{url:'companies',type:'GET'},
        getProjectCompanies :{url:'projects/{id}/companies',type:'GET'},
        getAllFiles:{url:'projects/{id}/files',type:'GET'},
        getFile:{url:'files/{id}',type:'GET'},
        addFile:{url:'projects/{id}/files',type:'POST'},
        deleteFiles:{url:'files/{id}',type:'DELTE'},
        uploadFile:{url:'pendingfiles',type:'POST'},
        createMessage:{url:'projects/{id}/post',type:'POST'},
        getMessage:{url:'posts/{id}',type:'GET'},
        getLatestMessages:{url:'projects/{id}/posts',type:'GET'},
        getAllCategoryMessages:{url:'projects/{id}/cat/{alt_id}/posts',type:'GET'},
        updateMessage:{url:'posts/{id}',type:'PUT'},
        getArchivedMessages:{url:'projects/{id}/posts/archive',type:'GET'},
        getArchivedCategoryMessages:{url:'projects/{id}/cat/{alt_id}/posts/archive',type:'GET'},
        archiveMessage:{url:'messages/{id}/archive',type:'GET'},
        unarchiveMessage:{url:'messages/{id}/unarchive',type:'GET'},
        deleteMessage:{url:'posts/{id}',type:'DELETE'},
        createMessageReply:{url:'messages/{id}/messageReplies',type:'POST'},
        getMessageReply:{url:'messageReplies/{id}',type:'GET'},
        getMessageReplies:{url:'messages/{id}/replies',type:'GET'},
        updateMessageReply:{url:'messageReplies/{id}',type:'PUT'},
        deleteMessageReply:{url:'messageReplies/{id}',type:'DELETE'},
        getAllMilestones:{url:'milestones',type:'GET'},
        getProjectMilestones:{url:'projects/{id}/milestones',type:'GET'},
        getMilestone:{url:'milestones/{id}',type:'GET'},
        markMilestoneComplete:{url:'milestones/{id}/complete',type:'PUT'},
        markMilestoneUncomplete:{url:'milestones/{id}/uncomplete',type:'PUT'},
        createMilestone:{url:'projects/{id}/milestones',type:'POST'},
        updateMilestone:{url:'milestones/{id}',type:'PUT'},
        deleteMilestone:{url:'milestones/{id}',type:'DELETE'},
        getAllNotebooks:{url:'notebooks',type:'GET'},
        getProjectNotebooks:{url:'projects/{id}/notebooks',type:'GET'},
        getNotebook:{url:'notebooks/{id}',type:'GET'},
        createNotebook:{url:'projects/{id}/notebooks',type:'POST'},
        updateNotebook:{url:'notebooks/{id}',type:'PUT'},
        lockNotebook:{url:'notebooks/{id}/lock',type:'PUT'},
        unloackNotebook:{url:'notebooks/{id}/unlock',type:'PUT'},
        deleteNotebook:{url:'notebooks/{id}',type:'DELETE'},
        addUser:{url:'people',type:'POST'},
        editUser:{url:'people/{id}',type:'PUT'},
        deleteUser:{url:'people/{id}',type:'DELETE'},
        getUser:{url:'me',type:'GET'},
        getPeople:{url:'people',type:'GET'},
        getAllPeople:{url:'projects/{id}/people',type:'GET'},
        getPersonPermissions:{url:'projects/{id}/people/{alt_id}',type:'GET'},
        getCompanyPeople:{url:'companies/{id}/people',type:'GET'},
        getPerson:{url:'people/{id}',type:'GET'},
        getAPIKeys:{url:'people/APIKeys',type:'GET'},
        createMyStatus:{url:'me/status',type:'POST'},
        createStatus:{url:'people/{id}/status',type:'POST'},
        updateMyStatus:{url:'me/status/{id}',type:'PUT'},
        updateStatus:{url:'people/status/{id}',type:'PUT'},
        delteMyStatus:{url:'me/status/{id}',type:'DELETE'},
        deleteStatus:{url:'people/status/{id}',type:'DELETE'},
        getMyStatus:{url:'me/status',type:'GET'},
        getStatus:{url:'people/{id}/statuses',type:'GET'},
        getEveryonesStatus:{url:'people/status',type:'GET'},
        addProjectUser:{url:'projects/{id}/people/{id}',type:'POST'},
        removeProjectUser:{url:'projects/{id}/people/{id}',type:'DELETE'},
        getUserProjectPermissions:{url:'projects/{id}/people/{id}',type:'GET'},
        updateUserProjectPermissions:{url:'projects/{id}/people/{id}',type:'PUT'},
        createProject:{url:'projects',type:'POST'},
        updateProject:{url:'projects/{id}',type:'PUT'},
        deleteProject:{url:'projects/{id}',type:'DELETE'},
        getAllProjects:{url:'projects',type:'GET'},
        getProject:{url:'projects/{id}',type:'GET'},
        getStarredProjects:{url:'projects/starred',type:'GET'},
        starProject:{url:'projects/{id}/star',type:'PUT'},
        unstarProject:{url:'projects/{id}/unstar',type:'PUT'},
        getAllLinks:{url:'links',type:'GET'},
        getProjectLinks:{url:'projects/{id}/links',type:'GET'},
        getLink:{url:'links/{id}',type:'GET'},
        createLink:{url:'projects/{id}/links',type:'POST'},
        updateLink:{url:'links/{id}',type:'PUT'},
        deleteLink:{url:'links/{id}',type:'DELETE'},
        getAllTime:{url:'time_entries',type:'GET'},
        getAllProjectTime:{url:'projects/{id}/time_entries',type:'GET'},
        getTaskTime:{url:'todo_items/{id}/time_entries',type:'GET'},
        createTime:{url:'projects/{id}/time_entries',type:'POST'},
        createTaskTime:{url:'todo_items/{id}/time_entries',type:'POST'},
        getTime:{url:'time_entries/{id}',type:'GET'},
        updateTime:{url:'time_entries/{id}',type:'PUT'},
        deleteTime:{url:'time_entries/{id}',type:'DELETE'},
        getAllTaskLists :{url:'projects/{id}/todo_lists',type:'GET'},
        getTaskList :{url:'todo_lists/{id}',type:'GET'},
        updateTaskList :{url:'todo_lists/{id}',type:'PUT'},
        createTaskList :{url:'projects/{id}/todo_lists',type:'POST'},
        deleteTaskList :{url:'todo_lists/{id}',type:'DELETE'},
        reorderTaskLists :{url:'projects/{id}/todo_lists/reorder',type:'GET'},
        getAllTasks :{url:'todo_lists/{id}/tasks',type:'GET'},
        getTask :{url:'todo_items/{id}',type:'GET'},
        markTaskComplete :{url:'todo_items/{id}/complete',type:'PUT'},
        markTaskUncomplete :{url:'todo_items/{id}/uncomplete',type:'PUT'},
        addTask :{url:'todo_lists/{id}/todo_items',type:'POST'},
        editTask :{url:'todo_items/{id}',type:'PUT'},
        deleteTask :{url:'todo_items/{id}',type:'DELETE'},
        reorderTasks :{url:'todo_lists/{id}/todo_items/reorder',type:'GET'},
        getEvents:{url:'events',type:'GET'},
    };    
    
    var fetch = function(params) {
        
       if(Ti.App.Properties.hasProperty('auth')){
            
            var url = encodeURI(urlRoot + params.url + responseType);
            var body = params.body || null;
            var type = params.type?params.type:"GET";
            var onload = params.onload || null;
            var onerror = params.onerror || null;
            var xhr = Ti.Network.createHTTPClient();
            Ti.API.info("Teamwork Request: "+url)
            xhr.onload = function(e) {
                e.status = this.status;
                if (this.status == 200 || this.status == 201) {
                    Ti.API.info("Teamwork Response: "+this.responseText);
                    onload && onload(JSON.parse(this.responseText));
                } else if(this.status === 204){
                    Ti.API.info("Teamwork Response: NO CONTENT");
                    onload && onload("No Available Content");
                    
                } else{
                    Ti.API.error("Teamwork Error: "+this.status+"("+e+")");
                    this.onerror(e);
                }
            };
            
            xhr.onerror = function(e) {
                Ti.API.info("Teamwork Request Error: "+this.status);
                e.status = this.status;
                onerror && onerror(e);
            };
            
            xhr.open(type, url);
            
            xhr.setRequestHeader('Authorization', Ti.App.Properties.getString('auth'));
            
            xhr.send(body);
            
        } else {
            Ti.API.error("User must  set your TeamworkPM API Key first.");
        }
    };
    
    // +-----------------------+
    // | Public members.       |
    // +-----------------------+
          
    /* Teamwork API Set.
     *  params:{
     *          id:         The primary id of the object request
     *          alt_id:     Some API's require a second ID
     *          body:       JSON body to pass with "POST" or "PUT" sample format: '{"todo-list":{"name":"Test","private":true,"pinned":true,"tracked":true,"description":"Test"}}'
     *          onload:     The onload callback, returns single parameter as parsed JSON
     *          onerror:    The onerror callback, returns single parameter as error response
     *  }
     */
    var setAuth = function(params){
        if(params && params!="clear"){
            if(params.apiKey){
                 Ti.App.Properties.setString('auth','Basic ' + Titanium.Utils.base64encode(params.apiKey + ':password'));
                 Ti.API.info("Teamwork API Key Set");
                 params.callback();
            }
        } 
    };
    var getAccount = function(params){
        params.url = API.getAccount.url; 
        params.type =API.getAccount.type; 
        fetch(params);
    };
    var authenticate = function(params){
        params.url = API.authenticate.url; 
        params.type =API.authenticate.type; 
        fetch(params);
    };
    var getLatestActivity = function(params){
        params.url = API.getLatestActivity.url; 
        params.type =API.getLatestActivity.type; 
        fetch(params);
    };
    var getLatestProjectActivity = function(params){
        if (params && params.id) {
            params.url = API.getLatestProjectActivity.url.replace('{id}',params.id);
        } 
        params.type =API.getLatestProjectActivity.type; 
        fetch(params);
    };
    var createCategory = function(params){
        if (params && params.id) {
            params.url = API.createCategory.url.replace('{id}',params.id);
        } 
        params.type =API.createCategory.type; 
        fetch(params);
    };
    var getCategory = function(params){
        if (params && params.id) {
            params.url = API.getCategory.url.replace('{id}',params.id);
        } 
        params.type =API.getCategory.type; 
        fetch(params);
    };
    var getCategories = function(params){
        if (params && params.id) {
            params.url = API.getCategories.url.replace('{id}',params.id);
        } 
        params.type =API.getCategories.type; 
        fetch(params);
    };
    var getRecentComments = function(params){
        if (params && params.id) {
            params.url = API.getRecentComments.url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
        } 
        params.type =API.getRecentComments.type; 
        fetch(params);
    };
    var getComment = function(params){
        if (params && params.id) {
            params.url = API.getComment.url.replace('{id}',params.id);
        } 
        params.type =API.getComment.type; 
        fetch(params);
    };
    var createComment = function(params){
        if (params && params.id) {
            params.url = API.createComment.url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
        } 
        params.type =API.createComment.type; 
        fetch(params);
    };
    var updateComment = function(params){
        if (params && params.id) {
            params.url = API.updateComment.url.replace('{id}',params.id);
        } 
        params.type =API.updateComment.type; 
        fetch(params);
    };
    var deleteComment = function(params){
        if (params && params.id) {
            params.url = API.deleteComment.url.replace('{id}',params.id);
        } 
        params.type =API.deleteComment.type; 
        fetch(params);
    };
    var createCompany = function(params){
        params.url = API.createCompany.url; 
        params.type =API.createCompany.type; 
        fetch(params);
    };
    var updateCompany = function(params){
        if (params && params.id) {
            params.url = API.updateCompany.url.replace('{id}',params.id);
        } 
        params.type =API.updateCompany.type; 
        fetch(params);
    };
    var deleteCompany = function(params){
        if (params && params.id) {
            params.url = API.deleteCompany.url.replace('{id}',params.id);
        } 
        params.type =API.deleteCompany.type; 
        fetch(params);
    };
    var getCompany = function(params){
        if (params && params.id) {
            params.url = API.getCompany.url.replace('{id}',params.id);
        } 
        params.type =API.getCompany.type; 
        fetch(params);
    };
    var getAllCompanies = function(params){
        params.url = API.getAllCompanies.url; 
        params.type =API.getAllCompanies.type; 
        fetch(params);
    };
    var getProjectCompanies = function(params){
        if (params && params.id) {
            params.url = API.getProjectCompanies.url.replace('{id}',params.id);
        } 
        params.type =API.getProjectCompanies.type; 
        fetch(params);
    };
    var getAllFiles = function(params){
        if (params && params.id) {
            params.url = API.getAllFiles.url.replace('{id}',params.id);
        } 
        params.type =API.getAllFiles.type; 
        fetch(params);
    };
    var getFile = function(params){
        if (params && params.id) {
            params.url = API.getFile.url.replace('{id}',params.id);
        } 
        params.type =API.getFile.type; 
        fetch(params);
    };
    var addFile = function(params){
        if (params && params.id) {
            params.url = API.addFile.url.replace('{id}',params.id);
        } 
        params.type =API.addFile.type; 
        fetch(params);
    };
    var deleteFiles = function(params){
        if (params && params.id) {
            params.url = API.deleteFiles.url.replace('{id}',params.id);
        } 
        params.type =API.deleteFiles.type; 
        fetch(params);
    };
    var uploadFile = function(params){
        params.url = API.uploadFile.url; 
        params.type =API.uploadFile.type; 
        fetch(params);
    };
    var createMessage = function(params){
        if (params && params.id) {
            params.url = API.createMessage.url.replace('{id}',params.id);
        } 
        params.type =API.createMessage.type; 
        fetch(params);
    };
    var getMessage = function(params){
        if (params && params.id) {
            params.url = API.getMessage.url.replace('{id}',params.id);
        } 
        params.type =API.getMessage.type; 
        fetch(params);
    };
    var getLatestMessages = function(params){
        if (params && params.id) {
            params.url = API.getLatestMessages.url.replace('{id}',params.id);
        } 
        params.type =API.getLatestMessages.type; 
        fetch(params);
    };
    var getAllCategoryMessages = function(params){
        if (params && params.id) {
            params.url = API.getAllCategoryMessages.url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
        } 
        params.type =API.getAllCategoryMessages.type; 
        fetch(params);
    };
    var updateMessage = function(params){
        if (params && params.id) {
            params.url = API.updateMessage.url.replace('{id}',params.id);
        } 
        params.type =API.updateMessage.type; 
        fetch(params);
    };
    var getArchivedMessages = function(params){
        if (params && params.id) {
            params.url = API.getArchivedMessages.url.replace('{id}',params.id);
        } 
        params.type =API.getArchivedMessages.type; 
        fetch(params);
    };
    var getArchivedCategoryMessages = function(params){
        if (params && params.id) {
            params.url = API.getArchivedCategoryMessages.url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
        } 
        params.type =API.getArchivedCategoryMessages.type; 
        fetch(params);
    };
    var archiveMessage = function(params){
        if (params && params.id) {
            params.url = API.archiveMessage.url.replace('{id}',params.id);
        } 
        params.type =API.archiveMessage.type; 
        fetch(params);
    };
    var unarchiveMessage = function(params){
        if (params && params.id) {
            params.url = API.unarchiveMessage.url.replace('{id}',params.id);
        } 
        params.type =API.unarchiveMessage.type; 
        fetch(params);
    };
    var deleteMessage = function(params){
        if (params && params.id) {
            params.url = API.deleteMessage.url.replace('{id}',params.id);
        } 
        params.type =API.deleteMessage.type; 
        fetch(params);
    };
    var createMessageReply = function(params){
        if (params && params.id) {
            params.url = API.createMessageReply.url.replace('{id}',params.id);
        } 
        params.type =API.createMessageReply.type; 
        fetch(params);
    };
    var getMessageReply = function(params){
        if (params && params.id) {
            params.url = API.getMessageReply.url.replace('{id}',params.id);
        } 
        params.type =API.getMessageReply.type; 
        fetch(params);
    };
    var getMessageReplies = function(params){
        if (params && params.id) {
            params.url = API.getMessageReplies.url.replace('{id}',params.id);
        } 
        params.type =API.getMessageReplies.type; 
        fetch(params);
    };
    var updateMessageReply = function(params){
        if (params && params.id) {
            params.url = API.updateMessageReply.url.replace('{id}',params.id);
        } 
        params.type =API.updateMessageReply.type; 
        fetch(params);
    };
    var deleteMessageReply = function(params){
        if (params && params.id) {
            params.url = API.deleteMessageReply.url.replace('{id}',params.id);
        } 
        params.type =API.deleteMessageReply.type; 
        fetch(params);
    };
    var getAllMilestones = function(params){
        params.url = API.getAllMilestones.url; 
        params.type =API.getAllMilestones.type; 
        fetch(params);
    };
    var getProjectMilestones = function(params){
        if (params && params.id) {
            params.url = API.getProjectMilestones.url.replace('{id}',params.id);
        } 
        params.type =API.getProjectMilestones.type; 
        fetch(params);
    };
    var getMilestone = function(params){
        if (params && params.id) {
            params.url = API.getMilestone.url.replace('{id}',params.id);
        } 
        params.type =API.getMilestone.type; 
        fetch(params);
    };
    var markMilestoneComplete = function(params){
        if (params && params.id) {
            params.url = API.markMilestoneComplete.url.replace('{id}',params.id);
        } 
        params.type =API.markMilestoneComplete.type; 
        fetch(params);
    };
    var markMilestoneUncomplete = function(params){
        if (params && params.id) {
            params.url = API.markMilestoneUncomplete.url.replace('{id}',params.id);
        } 
        params.type =API.markMilestoneUncomplete.type; 
        fetch(params);
    };
    var createMilestone = function(params){
        if (params && params.id) {
            params.url = API.createMilestone.url.replace('{id}',params.id);
        } 
        params.type =API.createMilestone.type; 
        fetch(params);
    };
    var updateMilestone = function(params){
        if (params && params.id) {
            params.url = API.updateMilestone.url.replace('{id}',params.id);
        } 
        params.type =API.updateMilestone.type; 
        fetch(params);
    };
    var deleteMilestone = function(params){
        if (params && params.id) {
            params.url = API.deleteMilestone.url.replace('{id}',params.id);
        } 
        params.type =API.deleteMilestone.type; 
        fetch(params);
    };
    var getAllNotebooks = function(params){
        params.url = API.getAllNotebooks.url; 
        params.type =API.getAllNotebooks.type; 
        fetch(params);
    };
    var getProjectNotebooks = function(params){
        if (params && params.id) {
            params.url = API.getProjectNotebooks.url.replace('{id}',params.id);
        } 
        params.type =API.getProjectNotebooks.type; 
        fetch(params);
    };
    var getNotebook = function(params){
        if (params && params.id) {
            params.url = API.getNotebook.url.replace('{id}',params.id);
        } 
        params.type =API.getNotebook.type; 
        fetch(params);
    };
    var createNotebook = function(params){
        if (params && params.id) {
            params.url = API.createNotebook.url.replace('{id}',params.id);
        } 
        params.type =API.createNotebook.type; 
        fetch(params);
    };
    var updateNotebook = function(params){
        if (params && params.id) {
            params.url = API.updateNotebook.url.replace('{id}',params.id);
        } 
        params.type =API.updateNotebook.type; 
        fetch(params);
    };
    var lockNotebook = function(params){
        if (params && params.id) {
            params.url = API.lockNotebook.url.replace('{id}',params.id);
        } 
        params.type =API.lockNotebook.type; 
        fetch(params);
    };
    var unloackNotebook = function(params){
        if (params && params.id) {
            params.url = API.unloackNotebook.url.replace('{id}',params.id);
        } 
        params.type =API.unloackNotebook.type; 
        fetch(params);
    };
    var deleteNotebook = function(params){
        if (params && params.id) {
            params.url = API.deleteNotebook.url.replace('{id}',params.id);
        } 
        params.type =API.deleteNotebook.type; 
        fetch(params);
    };
    var addUser = function(params){
        params.url = API.addUser.url; 
        params.type =API.addUser.type; 
        fetch(params);
    };
    var editUser = function(params){
        if (params && params.id) {
            params.url = API.editUser.url.replace('{id}',params.id);
        } 
        params.type =API.editUser.type; 
        fetch(params);
    };
    var deleteUser = function(params){
        if (params && params.id) {
            params.url = API.deleteUser.url.replace('{id}',params.id);
        } 
        params.type =API.deleteUser.type; 
        fetch(params);
    };
    var getUser = function(params){
        params.url = API.getUser.url; 
        params.type =API.getUser.type; 
        fetch(params);
    };
    var getPeople = function(params){
        params.url = API.getPeople.url; 
        params.type =API.getPeople.type; 
        fetch(params);
    };
    var getAllPeople = function(params){
        if (params && params.id) {
            params.url = API.getAllPeople.url.replace('{id}',params.id);
        } 
        params.type =API.getAllPeople.type; 
        fetch(params);
    };
    var getPersonPermissions = function(params){
        if (params && params.id) {
            params.url = API.getPersonPermissions.url.replace('{id}',params.id).replace('{alt_id}',params.alt_id);
            
        } 
        params.type =API.getPersonPermissions.type; 
        fetch(params);
    };
    var getCompanyPeople = function(params){
        if (params && params.id) {
            params.url = API.getCompanyPeople.url.replace('{id}',params.id);
        } 
        params.type =API.getCompanyPeople.type; 
        fetch(params);
    };
    var getPerson = function(params){
        if (params && params.id) {
            params.url = API.getPerson.url.replace('{id}',params.id);
        } 
        params.type =API.getPerson.type; 
        fetch(params);
    };
    var getAPIKeys = function(params){
        params.url = API.getAPIKeys.url; 
        params.type =API.getAPIKeys.type; 
        fetch(params);
    };
    var createMyStatus = function(params){
        params.url = API.createMyStatus.url; 
        params.type =API.createMyStatus.type; 
        fetch(params);
    };
    var createStatus = function(params){
        if (params && params.id) {
            params.url = API.createStatus.url.replace('{id}',params.id);
        } 
        params.type =API.createStatus.type; 
        fetch(params);
    };
    var updateMyStatus = function(params){
        if (params && params.id) {
            params.url = API.updateMyStatus.url.replace('{id}',params.id);
        } 
        params.type =API.updateMyStatus.type; 
        fetch(params);
    };
    var updateStatus = function(params){
        if (params && params.id) {
            params.url = API.updateStatus.url.replace('{id}',params.id);
        } 
        params.type =API.updateStatus.type; 
        fetch(params);
    };
    var delteMyStatus = function(params){
        if (params && params.id) {
            params.url = API.delteMyStatus.url.replace('{id}',params.id);
        } 
        params.type =API.delteMyStatus.type; 
        fetch(params);
    };
    var deleteStatus = function(params){
        if (params && params.id) {
            params.url = API.deleteStatus.url.replace('{id}',params.id);
        } 
        params.type =API.deleteStatus.type; 
        fetch(params);
    };
    var getMyStatus = function(params){
        params.url = API.getMyStatus.url; 
        params.type =API.getMyStatus.type; 
        fetch(params);
    };
    var getStatus = function(params){
        if (params && params.id) {
            params.url = API.getStatus.url.replace('{id}',params.id);
        } 
        params.type =API.getStatus.type; 
        fetch(params);
    };
    var getEveryonesStatus = function(params){
        params.url = API.getEveryonesStatus.url; 
        params.type =API.getEveryonesStatus.type; 
        fetch(params);
    };
    var addProjectUser = function(params){
        if (params && params.id) {
            params.url = API.addProjectUser.url.replace('{id}',params.id);
        } 
        params.type =API.addProjectUser.type; 
        fetch(params);
    };
    var removeProjectUser = function(params){
        if (params && params.id) {
            params.url = API.removeProjectUser.url.replace('{id}',params.id);
        } 
        params.type =API.removeProjectUser.type; 
        fetch(params);
    };
    var getUserProjectPermissions = function(params){
        if (params && params.id) {
            params.url = API.getUserProjectPermissions.url.replace('{id}',params.id);
        } 
        params.type =API.getUserProjectPermissions.type; 
        fetch(params);
    };
    var updateUserProjectPermissions = function(params){
        if (params && params.id) {
            params.url = API.updateUserProjectPermissions.url.replace('{id}',params.id);
        } 
        params.type =API.updateUserProjectPermissions.type; 
        fetch(params);
    };
    var createProject = function(params){
        params.url = API.createProject.url; 
        params.type =API.createProject.type; 
        fetch(params);
    };
    var updateProject = function(params){
        if (params && params.id) {
            params.url = API.updateProject.url.replace('{id}',params.id);
        } 
        params.type =API.updateProject.type; 
        fetch(params);
    };
    var deleteProject = function(params){
        if (params && params.id) {
            params.url = API.deleteProject.url.replace('{id}',params.id);
        } 
        params.type =API.deleteProject.type; 
        fetch(params);
    };
    var getAllProjects = function(params){
        params.url = API.getAllProjects.url; 
        params.type =API.getAllProjects.type; 
        fetch(params);
    };
    var getProject = function(params){
        if (params && params.id) {
            params.url = API.getProject.url.replace('{id}',params.id);
        } 
        params.type =API.getProject.type; 
        fetch(params);
    };
    var getStarredProjects = function(params){
        params.url = API.getStarredProjects.url; 
        params.type =API.getStarredProjects.type; 
        fetch(params);
    };
    var starProject = function(params){
        if (params && params.id) {
            params.url = API.starProject.url.replace('{id}',params.id);
        } 
        params.type =API.starProject.type; 
        fetch(params);
    };
    var unstarProject = function(params){
        if (params && params.id) {
            params.url = API.unstarProject.url.replace('{id}',params.id);
        } 
        params.type =API.unstarProject.type; 
        fetch(params);
    };
    var getAllLinks = function(params){
        params.url = API.getAllLinks.url; 
        params.type =API.getAllLinks.type; 
        fetch(params);
    };
    var getProjectLinks = function(params){
        if (params && params.id) {
            params.url = API.getProjectLinks.url.replace('{id}',params.id);
        } 
        params.type =API.getProjectLinks.type; 
        fetch(params);
    };
    var getLink = function(params){
        if (params && params.id) {
            params.url = API.getLink.url.replace('{id}',params.id);
        } 
        params.type =API.getLink.type; 
        fetch(params);
    };
    var createLink = function(params){
        if (params && params.id) {
            params.url = API.createLink.url.replace('{id}',params.id);
        } 
        params.type =API.createLink.type; 
        fetch(params);
    };
    var updateLink = function(params){
        if (params && params.id) {
            params.url = API.updateLink.url.replace('{id}',params.id);
        } 
        params.type =API.updateLink.type; 
        fetch(params);
    };
    var deleteLink = function(params){
        if (params && params.id) {
            params.url = API.deleteLink.url.replace('{id}',params.id);
        } 
        params.type =API.deleteLink.type; 
        fetch(params);
    };
    var getAllTime = function(params){
        params.url = API.getAllTime.url; 
        params.type =API.getAllTime.type; 
        fetch(params);
    };
    var getAllProjectTime = function(params){
        if (params && params.id) {
            params.url = API.getAllProjectTime.url.replace('{id}',params.id);
        } 
        params.type =API.getAllProjectTime.type; 
        fetch(params);
    };
    var getTaskTime = function(params){
        if (params && params.id) {
            params.url = API.getTaskTime.url.replace('{id}',params.id);
        } 
        params.type =API.getTaskTime.type; 
        fetch(params);
    };
    var createTime = function(params){
        if (params && params.id) {
            params.url = API.createTime.url.replace('{id}',params.id);
        } 
        params.type =API.createTime.type; 
        fetch(params);
    };
    var createTaskTime = function(params){
        if (params && params.id) {
            params.url = API.createTaskTime.url.replace('{id}',params.id);
        } 
        params.type =API.createTaskTime.type; 
        fetch(params);
    };
    var getTime = function(params){
        if (params && params.id) {
            params.url = API.getTime.url.replace('{id}',params.id);
        } 
        params.type =API.getTime.type; 
        fetch(params);
    };
    var updateTime = function(params){
        if (params && params.id) {
            params.url = API.updateTime.url.replace('{id}',params.id);
        } 
        params.type =API.updateTime.type; 
        fetch(params);
    };
    var deleteTime = function(params){
        if (params && params.id) {
            params.url = API.deleteTime.url.replace('{id}',params.id);
        } 
        params.type =API.deleteTime.type; 
        fetch(params);
    };
    var getAllTaskLists = function(params){
        if (params && params.id) {
            params.url = API.getAllTaskLists.url.replace('{id}',params.id);
        } 
        params.type =API.getAllTaskLists.type; 
        fetch(params);
    };
    var getTaskList = function(params){
        if (params && params.id) {
            params.url = API.getTaskList.url.replace('{id}',params.id);
        } 
        params.type =API.getTaskList.type; 
        fetch(params);
    };
    var updateTaskList = function(params){
        if (params && params.id) {
            params.url = API.updateTaskList.url.replace('{id}',params.id);
        } 
        params.type =API.updateTaskList.type; 
        fetch(params);
    };
    var createTaskList = function(params){
        if (params && params.id) {
            params.url = API.createTaskList.url.replace('{id}',params.id);
        } 
        params.type =API.createTaskList.type; 
        fetch(params);
    };
    var deleteTaskList = function(params){
        if (params && params.id) {
            params.url = API.deleteTaskList.url.replace('{id}',params.id);
        } 
        params.type =API.deleteTaskList.type; 
        fetch(params);
    };
    var reorderTaskLists = function(params){
        if (params && params.id) {
            params.url = API.reorderTaskLists.url.replace('{id}',params.id);
        } 
        params.type =API.reorderTaskLists.type; 
        fetch(params);
    };
    var getAllTasks = function(params){
        if (params && params.id) {
            params.url = API.getAllTasks.url.replace('{id}',params.id);
        } 
        params.type =API.getAllTasks.type; 
        fetch(params);
    };
    var getTask = function(params){
        if (params && params.id) {
            params.url = API.getTask.url.replace('{id}',params.id);
        } 
        params.type =API.getTask.type; 
        fetch(params);
    };
    var markTaskComplete = function(params){
        if (params && params.id) {
            params.url = API.markTaskComplete.url.replace('{id}',params.id);
        } 
        params.type =API.markTaskComplete.type; 
        fetch(params);
    };
    var markTaskUncomplete = function(params){
        if (params && params.id) {
            params.url = API.markTaskUncomplete.url.replace('{id}',params.id);
        } 
        params.type =API.markTaskUncomplete.type; 
        fetch(params);
    };
    var addTask = function(params){
        if (params && params.id) {
            params.url = API.addTask.url.replace('{id}',params.id);
        } 
        params.type =API.addTask.type; 
        fetch(params);
    };
    var editTask = function(params){
        if (params && params.id) {
            params.url = API.editTask.url.replace('{id}',params.id);
        } 
        params.type =API.editTask.type; 
        fetch(params);
    };
    var deleteTask = function(params){
        if (params && params.id) {
            params.url = API.deleteTask.url.replace('{id}',params.id);
        } 
        params.type =API.deleteTask.type; 
        fetch(params);
    };
    var reorderTasks = function(params){
        if (params && params.id) {
            params.url = API.reorderTasks.url.replace('{id}',params.id);
        } 
        params.type =API.reorderTasks.type; 
        fetch(params);
    };
    var getEvents = function(params){
        params.url = API.getEvents.url; 
        params.type =API.getEvents.type; 
        fetch(params);
    };
   
    return {
        setAuth : setAuth,
        getAccount : getAccount ,
        authenticate : authenticate ,
        getLatestActivity : getLatestActivity ,
        getLatestProjectActivity : getLatestProjectActivity ,
        createCategory : createCategory ,
        getCategory : getCategory ,
        getCategories : getCategories ,
        getRecentComments: getRecentComments,
        getComment: getComment,
        createComment: createComment,
        updateComment: updateComment,
        deleteComment: deleteComment,
        createCompany: createCompany,
        updateCompany: updateCompany,
        deleteCompany: deleteCompany,
        getCompany: getCompany,
        getAllCompanies: getAllCompanies,
        getProjectCompanies : getProjectCompanies ,
        getAllFiles: getAllFiles,
        getFile: getFile,
        addFile: addFile,
        deleteFiles: deleteFiles,
        uploadFile: uploadFile,
        createMessage: createMessage,
        getMessage: getMessage,
        getLatestMessages: getLatestMessages,
        getAllCategoryMessages: getAllCategoryMessages,
        updateMessage: updateMessage,
        getArchivedMessages: getArchivedMessages,
        getArchivedCategoryMessages: getArchivedCategoryMessages,
        archiveMessage: archiveMessage,
        unarchiveMessage: unarchiveMessage,
        deleteMessage: deleteMessage,
        createMessageReply: createMessageReply,
        getMessageReply: getMessageReply,
        getMessageReplies: getMessageReplies,
        updateMessageReply: updateMessageReply,
        deleteMessageReply: deleteMessageReply,
        getAllMilestones: getAllMilestones,
        getProjectMilestones: getProjectMilestones,
        getMilestone: getMilestone,
        markMilestoneComplete: markMilestoneComplete,
        markMilestoneUncomplete: markMilestoneUncomplete,
        createMilestone: createMilestone,
        updateMilestone: updateMilestone,
        deleteMilestone: deleteMilestone,
        getAllNotebooks: getAllNotebooks,
        getProjectNotebooks: getProjectNotebooks,
        getNotebook: getNotebook,
        createNotebook: createNotebook,
        updateNotebook: updateNotebook,
        lockNotebook: lockNotebook,
        unloackNotebook: unloackNotebook,
        deleteNotebook: deleteNotebook,
        addUser: addUser,
        editUser: editUser,
        deleteUser: deleteUser,
        getUser: getUser,
        getPeople: getPeople,
        getAllPeople: getAllPeople,
        getPersonPermissions: getPersonPermissions,
        getCompanyPeople: getCompanyPeople,
        getPerson: getPerson,
        getAPIKeys: getAPIKeys,
        createMyStatus: createMyStatus,
        createStatus: createStatus,
        updateMyStatus: updateMyStatus,
        updateStatus: updateStatus,
        delteMyStatus: delteMyStatus,
        deleteStatus: deleteStatus,
        getMyStatus: getMyStatus,
        getStatus: getStatus,
        getEveryonesStatus: getEveryonesStatus,
        addProjectUser: addProjectUser,
        removeProjectUser: removeProjectUser,
        getUserProjectPermissions: getUserProjectPermissions,
        updateUserProjectPermissions: updateUserProjectPermissions,
        createProject: createProject,
        updateProject: updateProject,
        deleteProject: deleteProject,
        getAllProjects: getAllProjects,
        getProject: getProject,
        getStarredProjects: getStarredProjects,
        starProject: starProject,
        unstarProject: unstarProject,
        getAllLinks: getAllLinks,
        getProjectLinks: getProjectLinks,
        getLink: getLink,
        createLink: createLink,
        updateLink: updateLink,
        deleteLink: deleteLink,
        getAllTime: getAllTime,
        getAllProjectTime: getAllProjectTime,
        getTaskTime: getTaskTime,
        createTime: createTime,
        createTaskTime: createTaskTime,
        getTime: getTime,
        updateTime: updateTime,
        deleteTime: deleteTime,
        getAllTaskLists : getAllTaskLists ,
        getTaskList : getTaskList ,
        updateTaskList : updateTaskList ,
        createTaskList : createTaskList ,
        deleteTaskList : deleteTaskList ,
        reorderTaskLists : reorderTaskLists ,
        getAllTasks : getAllTasks ,
        getTask : getTask ,
        markTaskComplete : markTaskComplete ,
        markTaskUncomplete : markTaskUncomplete ,
        addTask : addTask ,
        editTask : editTask ,
        deleteTask : deleteTask ,
        reorderTasks : reorderTasks ,
        getEvents: getEvents
    };
})();

module.exports = teamApi;