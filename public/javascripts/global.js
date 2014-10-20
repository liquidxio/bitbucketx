// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);    

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {
	
	
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // Populate the global variable userListData with the data retrieved from MongoDB
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.user.username + '" title="Show Details">' + this.user.username + '</a></td>';
            tableContent += '<td>' + this.user.first_name + " " + this.user.last_name + '</td>';
            tableContent += '<td>' + this.usingOauth + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        
        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
        
        
    });    
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.user.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];    
    
    
    // Clearing the form data from the previous user ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    $('#repoScm').text('');
	$('#repoWiki').text('');
    $('#repoLastUpdated').text('');
    $('#repoForks').text('');
    $('#repoCreatedOn').text('');
    $('#repoOwner').text('');
    $('#repoLogo').text('');
    $('#repoEmailMailingList').text('');
    $('#repoIsMq').text('');
    $('#repoSize').text('');
    $('#repoReadOnly').text('');
    $('#repoForkOf').text('');
    $('#repoMqOf').text('');
    $('#repoState').text('');
    $('#repoUtcCreatedOn').text('');
    $('#repoWebSite').text('');
    $('#repoDescription').text('');
    $('#repoHasIssues').text('');
    $('#repoIsFork').text('');
    $('#repoSlug').text('');
    $('#repoIsPrivate').text('');
    $('#repoName').text('');
    $('#repoLanguage').text('');
    $('#repoUtcLastUpdated').text('');
    $('#repoEmailWriters').text('');
    $('#repoPublicForks').text('');
    $('#repoCreator').text('');
    $('#repoRecoureURI').text('');
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    
    //Populate Outcomes Profile Box
    $('#userNumRepos').text(thisUserObject.numRepos);
    $('#userName').text(thisUserObject.user.first_name + " " + thisUserObject.user.last_name);
    $('#userStaff').text(thisUserObject.user.is_staff);
    $('#userAvatar').text(thisUserObject.user.avatar);
    $('#userTeam').text(thisUserObject.user.is_team);
    $('#userSource').text(thisUserObject.source);
    
    // Populate Repositories Info Box from the repositories array
    for (var i = 0; i < thisUserObject.repositories.length; i++) {
    	
    	// If no more items in array, do not add a line break
    	if((i+1) == thisUserObject.repositories.length) {
    		$('#repoScm').append((i+1) + ') ' + thisUserObject.repositories[i].scm);
	    	$('#repoWiki').append((i+1) + ') ' + thisUserObject.repositories[i].has_wiki);
	        $('#repoLastUpdated').append((i+1) + ') ' + thisUserObject.repositories[i].last_updated);
	        $('#repoForks').append((i+1) + ') ' + !thisUserObject.repositories[i].no_forks);
	        $('#repoCreatedOn').append((i+1) + ') ' + thisUserObject.repositories[i].created_on);
	        $('#repoOwner').append((i+1) + ') ' + thisUserObject.repositories[i].owner);
	        $('#repoLogo').append((i+1) + ') ' + thisUserObject.repositories[i].logo);
	        $('#repoEmailMailingList').append((i+1) + ') ' + thisUserObject.repositories[i].email_mailinglist);
	        $('#repoIsMq').append((i+1) + ') ' + thisUserObject.repositories[i].is_mq);
	        $('#repoSize').append((i+1) + ') ' + parseFloat((thisUserObject.repositories[i].size / 1000)).toFixed(0) + ' KB');
	        $('#repoReadOnly').append((i+1) + ') ' + thisUserObject.repositories[i].read_only);
	        $('#repoForkOf').append((i+1) + ') ' + JSON.stringify(thisUserObject.repositories[i].fork_of));
	        $('#repoMqOf').append((i+1) + ') ' + JSON.stringify(thisUserObject.repositories[i].mq_of));
	        $('#repoState').append((i+1) + ') ' + thisUserObject.repositories[i].state);
	        $('#repoUtcCreatedOn').append((i+1) + ') ' + thisUserObject.repositories[i].utc_created_on);
	        $('#repoWebSite').append((i+1) + ') ' + thisUserObject.repositories[i].website);
	        $('#repoDescription').append((i+1) + ') ' + thisUserObject.repositories[i].description);
	        $('#repoHasIssues').append((i+1) + ') ' + thisUserObject.repositories[i].has_issues);
	        $('#repoIsFork').append((i+1) + ') ' + thisUserObject.repositories[i].is_fork);
	        $('#repoSlug').append((i+1) + ') ' + thisUserObject.repositories[i].slug);
	        $('#repoIsPrivate').append((i+1) + ') ' + thisUserObject.repositories[i].is_private);
	        $('#repoName').append((i+1) + ') ' + thisUserObject.repositories[i].name);
	        $('#repoLanguage').append((i+1) + ') ' + thisUserObject.repositories[i].language);
	        $('#repoUtcLastUpdated').append((i+1) + ') ' + thisUserObject.repositories[i].utc_last_updated);
	        $('#repoEmailWriters').append((i+1) + ') ' + thisUserObject.repositories[i].email_writers);
	        $('#repoPublicForks').append((i+1) + ') ' + thisUserObject.repositories[i].no_public_forks);
	        $('#repoCreator').append((i+1) + ') ' + thisUserObject.repositories[i].creator);
	        $('#repoRecoureURI').append((i+1) + ') ' + thisUserObject.repositories[i].resource_uri);
    	}
    	
    	// If there are more items in the array, add a line break
    	else {
    		$('#repoScm').append((i+1) + ') ' + thisUserObject.repositories[i].scm + '<br/>');
	        $('#repoWiki').append((i+1) + ') ' + thisUserObject.repositories[i].has_wiki + '<br/>');
	        $('#repoLastUpdated').append((i+1) + ') ' + thisUserObject.repositories[i].last_updated + '<br/>');
	        $('#repoForks').append((i+1) + ') ' + !thisUserObject.repositories[i].no_forks + '<br/>');
	        $('#repoCreatedOn').append((i+1) + ') ' + thisUserObject.repositories[i].created_on + '<br/>');
	        $('#repoOwner').append((i+1) + ') ' + thisUserObject.repositories[i].owner + '<br/>');
	        $('#repoLogo').append((i+1) + ') ' + thisUserObject.repositories[i].logo + '<br/>');
	        $('#repoEmailMailingList').append((i+1) + ') ' + thisUserObject.repositories[i].email_mailinglist + '<br/>');
	        $('#repoIsMq').append((i+1) + ') ' + thisUserObject.repositories[i].is_mq + '<br/>');
	        $('#repoSize').append((i+1) + ') ' + parseFloat((thisUserObject.repositories[i].size / 1000)).toFixed(0) + ' KB' + '<br/>');
	        $('#repoReadOnly').append((i+1) + ') ' + thisUserObject.repositories[i].read_only + '<br/>');
	        $('#repoForkOf').append((i+1) + ') ' + JSON.stringify(thisUserObject.repositories[i].fork_of) + '<br/>');
	        $('#repoMqOf').append((i+1) + ') ' + JSON.stringify(thisUserObject.repositories[i].mq_of) + '<br/>');
	        $('#repoState').append((i+1) + ') ' + thisUserObject.repositories[i].state + '<br/>');
	        $('#repoUtcCreatedOn').append((i+1) + ') ' + thisUserObject.repositories[i].utc_created_on + '<br/>');
	        $('#repoWebSite').append((i+1) + ') ' + thisUserObject.repositories[i].website + '<br/>');
	        $('#repoDescription').append((i+1) + ') ' + thisUserObject.repositories[i].description + '<br/>');
	        $('#repoHasIssues').append((i+1) + ') ' + thisUserObject.repositories[i].has_issues + '<br/>');
	        $('#repoIsFork').append((i+1) + ') ' + thisUserObject.repositories[i].is_fork + '<br/>');
	        $('#repoSlug').append((i+1) + ') ' + thisUserObject.repositories[i].slug + '<br/>');
	        $('#repoIsPrivate').append((i+1) + ') ' + thisUserObject.repositories[i].is_private + '<br/>');
	        $('#repoName').append((i+1) + ') ' + thisUserObject.repositories[i].name + '<br/>');
	        $('#repoLanguage').append((i+1) + ') ' + thisUserObject.repositories[i].language + '<br/>');
	        $('#repoUtcLastUpdated').append((i+1) + ') ' + thisUserObject.repositories[i].utc_last_updated + '<br/>');
	        $('#repoEmailWriters').append((i+1) + ') ' + thisUserObject.repositories[i].email_writers + '<br/>');
	        $('#repoPublicForks').append((i+1) + ') ' + thisUserObject.repositories[i].no_public_forks + '<br/>');
	        $('#repoCreator').append((i+1) + ') ' + thisUserObject.repositories[i].creator + '<br/>');
	        $('#repoRecoureURI').append((i+1) + ') ' + thisUserObject.repositories[i].resource_uri + '<br/>');
    	}
    }
    
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank    
    var errorCount = 0;
    $('#addUser fieldset #inputUserName').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    $('#addUser fieldset #inputUserEmail').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    
    // If we are using oauth for user, send prompts to input user public and secret
    $('#addUser fieldset #inputOauth').each(function(index, val) {
    	if($(this).val() == 'y' || $(this).val() == 'Y') {prompt("Enter user's Public","public"); prompt("Enter User's Secret", "secret");}    	
    });

    
    
    // Check and make sure errorCount's still at zero or 1
    if(errorCount === 0 || errorCount === 1) {

        // If it is, compile search parameters into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'oauth': $('#addUser fieldset input#inputOauth').val()
        }
        
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {
        	
        	
            // Check for successful (blank) response
            if (response.msg == '') {

                // Clear the form inputs
                $('#addUser fieldset input#inputUserName').val('');

                // Update the table
                populateTable();                
            }
            else           	
                alert('Error: ' + response.msg);           
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please specify a username or email to look up');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();            
        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};