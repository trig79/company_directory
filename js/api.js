window.addEventListener('load', () => {

  employeeDropdownMenu()   
  jobDepDropdownMenu()
})

//Creates Drop Down Menu For Employee Selection.....Sorted By Lastname.
const employeeDropdownMenu = () => {
    
    $.ajax({
        url: "./php/dropdownMenus.php",
        type: 'POST',
        dataType: 'json',

        success: function(result) {
            console.log(result);   //Bug Testing

            let dropdownName;
            dropdownName += `<option value="dropdown_start" class="dropdown-list-item">Select Employee</option>`
            for(i=0; i < result['personnel'].length; i++) {
                dropdownName += `<option value="${result['personnel'][i]['id']}" class="dropdown-list-item">${[result['personnel'][i]['lastName'],result['personnel'][i]['firstName']]}</option>`
            }
            $('.dropdown_menu_employees').html(dropdownName);
        },
        
        error: function(xhr, status, error){
            var errorMessage = `employeeDropdownMenu Error: ${xhr.status} : ${xhr.statusText}.`
            console.log(errorMessage);
            //alert('Doh! something went wrong when attempting to retrieve Covid-19 information for this country. The error has been logged for investigation.  Please choose another country.')
            }
    })
}

const jobDepDropdownMenu = (depID, jobTitle) => {
    
    $.ajax({
        url: "./php/dropdownMenus.php",
        type: 'POST',
        dataType: 'json', 

        success: function(result) {
            console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle
            let dropdownDepartments;
            dropdownDepartments += `<option value="" class="dropdown-list-item">Select Department</option>`
            for(i=0; i < result['departments'].length; i++) {
                //If depID matches then dropdown Menu will default to that option in the list
                i == (depID - 1) ?
                dropdownDepartments += `<option selected="selected" value="${result['departments'][i]['depID']}" class="dropdown_list_Location">${result['departments'][i]['department']}</option>`:
                dropdownDepartments += `<option value="${result['departments'][i]['depID']}" class="dropdown_list_Location">${result['departments'][i]['department']}</option>`
            }
            // if depID false then function was called on page load and all corresponding dropdown can be populated. If true then only applied to menus in update section
            depID ? $('.dropdown_menu_departments_update').html(dropdownDepartments) : $('.dropdown_menu_departments').html(dropdownDepartments);

            let dropdownJobs;
            dropdownJobs += `<option value="" class="dropdown-list-item">Select Job Title</option>`
            for(i=0; i < result['jobs'].length; i++) {
                //If jobTitle matches then dropdown Menu will default to that option in the list
                result['jobs'][i]['title'] == jobTitle ?
                dropdownJobs += `<option selected="selected" value="${result['jobs'][i]['title']}" class="dropdown_list_Location">${result['jobs'][i]['title']}</option>`:
                dropdownJobs += `<option value="${result['jobs'][i]['title']}" class="dropdown_list_Location">${result['jobs'][i]['title']}</option>`
            }
            // if jobTitle false then function was called on page load and all corresponding dropdown can be populated. If true then only applied to menus in update section
            jobTitle ? $('.dropdown_menu_jobs_update').html(dropdownJobs) : $('.dropdown_menu_jobs').html(dropdownJobs);

        },
        
        error: function(xhr, status, error){
            var errorMessage = `employeeDropdownMenu Error: ${xhr.status} : ${xhr.statusText}.`
            console.log(errorMessage);
            //alert('Doh! something went wrong when attempting to retrieve Covid-19 information for this country. The error has been logged for investigation.  Please choose another country.')
            }
    })
}


const singleEmployeeRetrieval = (id, call) => {
    
    $.ajax({
        url: "./php/singleEmployeeRetrieval.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id : id,
            call : call
        },
        success: function(result) {
            console.log(result);   //Bug Testing
            if(result[1] == 'search') {
                $('.Employee_Retrieve').html(`
                <img src="./images/headIcon.svg" alt="headshot_icon">
                <table id="employee_table_search">
                
                <tr>
                    <th><h4>Staff ID</h4></th>
                    <td id="staffID"><h4>${result[0]['stfID']}</h4></td>
                </tr>
                <tr>
                    <th><h4>First Name</h4></th>
                    <td id="forenames"><h4>${result[0]['firstName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Surname</h4></th>
                    <td id="surname"><h4>${result[0]['lastName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Location</h4></th>
                    <td id="location"><h4>${result[0]['locName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Department</h4></th>
                    <td id="department"><h4>${result[0]['depName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Job Title</h4></th>
                    <td id=job_title><h4>${result[0]['jobTitle']}</td>
                </tr>
                <tr>
                    <th><h4>Email</h4></th>
                    <td id="email"><h4>${result[0]['email']}</h4></td>
                </tr>
                </table>`)
                //Loads employee team members in to Div
                let depID = result[0]['depID']
                employeeTeamMembersAJAX(depID)
            
            } else if (result[1] == 'update') {
                $('#update_emp_table_div').html(`
                <table id="update_table">    
                <tr>    <th><h4>Staff Number</h4></th>
                        <td><h4 id="update_staffID" value="${result[0]['stfID']}">${result[0]['stfID']}</h4></td>
                </tr>
                <tr>    <th><h4>First Name</h4></th>
                        <td><input id="update_forenames" type="text" placeholder="${result[0]['firstName']}"></td>
                </tr>
                <tr>    <th><h4>Surname</h4></th>
                        <td>    <input id="update_surname" type="text" placeholder="${result[0]['lastName']}"></td>
                </tr>
                <tr>    <th><h4>Department</h4></th>
                        <td>    <select id="update_department" class="dropdown_menu_departments dropdown_menu_departments_update" name="dropdown_menu_departments"> </select></td>
                </tr>
                <tr>    <th><h4>Job Title</h4></th>
                        <td>    <select id="update_job" class="dropdown_menu_jobs dropdown_menu_jobs_update" name="dropdown_menu_jobs">   </select></td>
                </tr>
                <tr>    <th><h4>Email</h4></th>
                        <td>    <input  id="update_email" type="text" placeholder="${result[0]['email']}"></td>
                </tr>
                </table>

                <button id="update_employee" type="submit" value="update" onclick="updateEmp()">Update</button>
                <div id="update_emp_status_message"></div>

                `)
                //Set the DDM to the employees current role and department
                let depID = result[0]['departmentID']
                let jobTitle = result[0]['jobTitle']
                jobDepDropdownMenu(depID, jobTitle)

            } else if (result[1] == 'delete') {
                $('#delete_emp_table_div').html(`
                <table id="delete_table">
                <tr>
                    <th><h4>Staff ID</h4></th>
                    <td id="delete_staffID"><h4>${result[0]['stfID']}</h4></td>
                </tr>
                <tr>
                    <th><h4>First Name</h4></th>
                    <td id="delete_forenames"><h4>${result[0]['firstName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Surname</h4></th>
                    <td id="delete_surname"><h4>${result[0]['lastName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Location</h4></th>
                    <td id="delete_location"><h4>${result[0]['locName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Department</h4></th>
                    <td id="delete_department"><h4>${result[0]['depName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Job Title</h4></th>
                    <td id=delete_job><h4>${result[0]['jobTitle']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Email</h4></th>
                    <td id="delete_email"><h4>${result[0]['email']}</h4></td>
                </tr>
                </table>

                <button id="delete_employee" type="submit" value="delete" onclick="deleteEmp()">Delete</button>

            `)
            
            } else if (result[1] == 'vacation') {
                $('#vacation_emp_table_div').html(`
                <table id="vacation_table">
                <tr>
                    <th><h4>Staff ID</h4></th>
                    <td id="vac_staffID"><h4>${result[0]['stfID']}</h4></td>
                </tr>
                <tr>
                    <th><h4>First Name</h4></th>
                    <td id="vac_forenames"><h4>${result[0]['firstName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Surname</h4></th>
                    <td id="vac_surname"><h4>${result[0]['lastName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Department</h4></th>
                    <td id="vac_department"><h4>${result[0]['depName']}</h4></td>
                </tr>
                <tr>
                    <th><h4>Start Date</h4></th>
                    <td id=""><div class="datepicker_div"><input type="text" id="vacStart" class="datepicker"></div></td>
                </tr>
                <tr>
                    <th><h4>End Date</h4></th>
                    <td id=""><div class="datepicker_div"><input type="text" id="vacEnd" class="datepicker"></div></td>
                </tr>
                </table>

                <button id="vacation_employee" type="submit" value="delete" onclick="vacationEmp()">Add Vacation</button>
            `)
            datePicker()
            }
        },
        error: function(xhr, status, error){
            var errorMessage = `Employee Retrieval Error: ${xhr.status} : ${xhr.statusText}.`
            console.log(errorMessage);
            }
    })
}

//Add employee to DB. For success and failur the user will recieve relevant messages to guide them.
const addEmployeeAJAX = (formdata) => {
    
    $.ajax({
        url: "./php/addEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: formdata,
            
        success: function(result) {
            console.log(result);   //Bug Testing

            if(result['success']){
                //return success message to user, message removed from dom after 2 secs
                $('#add_emp_status_message').html(`
                <h4 class="success_message">Employee Has Successfully Added</h4>  
                `).delay(2000)
                .fadeOut(800)
                .queue(function() {
                    $(this).remove();
                });

                //Resets form to original state
                addFormReset()
                employeeDropdownMenu()


            } else if(result['errors'] == 'duplication') {
                //if duplicate entry found on DB user is asked to re-confirm prior to submission
                $('#add_emp_status_message').html('')
                $('#add_emp_status_message').append(`
                <h4 >This appears to be a duplicate entry, press submit again to confirm ok.</h4> <h4>Or <a onClick="addFormReset()">Click Here</a> to reset form.</h4>  
                `)
                $('#add_employee').replaceWith(`
                <button id="add_employee" type="submit" value="submitFinal" onclick="addEmp()">Reconfirm</Button>`)
            }
            
            else {
                //clears any priro messages
                $('#add_emp_status_message').html('')
                //returns message to user if any of the form contents is missing.
                for (message in result['errors']){
                    $('#add_emp_status_message').append(`
                    <h4>> ${result['errors'][message]}</h4>  
                    `)
                }

            }
            

        },
        
        error: function(xhr, status, error){
            var errorMessage = `addEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. Error was generated with alpha2code:`
            console.log(errorMessage);
            //alert('Doh! something went wrong when attempting to retrieve Covid-19 information for this country. The error has been logged for investigation.  Please choose another country.')
            }
    })
}

//Add employee to DB. For success and failur the user will recieve relevant messages to guide them.
const updateEmployeeAJAX = (formdata) => {
    
    $.ajax({
        url: "./php/updateEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: formdata,
            
        success: function(result) {
            console.log(result);   //Bug Testing
            $('#update_emp_status_message').html('').fadeIn(0)

            $('#update_emp_status_message').html(`
            <h4 class="success_message">Employee Has Been Successfully Updated</h4>  
            `).delay(2000)
            .fadeOut(800)

            employeeDropdownMenu()
        },
        
        error: function(xhr, status, error){
            var errorMessage = `updateEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}


const deleteEmployeeAJAX = (formdata) => {
    
    $.ajax({
        url: "./php/deleteEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: formdata,
            
        success: function(result) {
            console.log(result);   //Bug Testing

            $('#delete_emp_status_message').html('').fadeIn(0)

            if(result['success'] == true){
                //return success message to user, message removed from dom after 2 secs
                $('#delete_emp_status_message').html(`
                <h4 class="success_message">Employee Has Successfully Deleted</h4>  
                `).delay(2000)
                .fadeOut(800)
                     $('#delete_employee').remove();
                 
                //reloads the submit button incase user has followed the 'else if' path below
                $('#delete_employee').replaceWith(`
                <button id="delete_employee" type="submit" value="submit" onclick="deleteEmp()">Delete</Button>`)
                employeeDropdownMenu()
               

            } else if(result['value'] == 'reconfirm') {
                // user asked to reconfirm prior to deletion
                $('#delete_emp_status_message').append(`
                <h4>Are you sure you wish to delete this employee?</h4>  
                <h4>Once deleted this employee record cannot be restored</h4>  
                `)
                $('#delete_employee').replaceWith(`
                <button id="delete_employee" type="submit" value="submitFinal" onclick="deleteEmp()">Reconfirm</Button>`)
            }

        },
        
        error: function(xhr, status, error){
            var errorMessage = `deleteEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            //alert('Doh! something went wrong when attempting to retrieve Covid-19 information for this country. The error has been logged for investigation.  Please choose another country.')
            }
    })
}

const employeeTeamMembersAJAX = (depID, searchCall) => {
    
    $.ajax({
        url: "./php/employeeTeamMembers.php",
        type: 'POST',
        dataType: 'json',
        data: {'depID' : depID},
            
        success: function(result) {
            console.log(result);   //Bug Testing
            const classChecker = !searchCall ? '.employee_search_team_members' : '.department_search_team_members'

            //reset div to empty
             $(classChecker).html('') 
            
            //add heading
            $(classChecker).append(`
                    <br>
                    <h3>Fellow Team Members.....</h3>
                    <div class="employee_search_team_members_tables"></div>
                `)
            //loop through results
            for(i=0; i < result.length; i++) {
                //Prevents 'null' errors appearing in console when employee record is not complete.
                let firstName = !result[i]['firstName'] ? 'No Info Avlb' : result[i]['firstName'];
                let lastName = !result[i]['lastName']   ? 'No Info Avlb' : result[i]['lastName'];
                let jobTitle = !result[i]['jobTitle']   ? 'Job Title Not Currently Avlb' : result[i]['jobTitle'];
                let email = !result[i]['email']         ? 'No Info Avlb' : result[i]['email'];
                

                $('.employee_search_team_members_tables').append(`
                    <table class="team_member_info">
                    <tr>
                    <td rowspan='4' id="table_img"><img src="./images/headIcon.svg" alt="headshot_icon"></td>
                    </tr>
                    <tr>
                    <td><h5>${firstName} ${lastName}</h5></td>
                    </tr>
                    <tr>
                    <td><h5>${jobTitle}</h5></td>
                    </tr>
                    <tr>
                    <td><h5>${email}</h5></td>
                    </tr>
                    </table>
                `)
            }
        
        },
        
        error: function(xhr, status, error){
            var errorMessage = `employeeTeamMemebersAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            //alert('Doh! something went wrong when attempting to retrieve Covid-19 information for this country. The error has been logged for investigation.  Please choose another country.')
            }
    })
}
 
const vacationPostAJAX = (formdata) => {
    
    $.ajax({
        url: "./php/vacationPost.php",
        type: 'POST',
        dataType: 'json',
        data: formdata,
            
        success: function(result) {
            console.log(result);   //Bug Testing

            $('#vacation_emp_status_message').html('').fadeIn(0)

            if (result['errors']) {
                for (message in result['errors']){
                    $('#vacation_emp_status_message').append(`
                    <h4> ${result['errors'][message]}</h4>  
                    `)
                }
            } else if (result['success']) {
                
            $('#vacation_emp_status_message').html(`
                <h4>Vacation has been added successfully</h4>`)
                .delay(2000)
                .fadeOut(800)
            
            vacationFetchAJAX(result['staffID'])
            $('.datepicker').val('')
            }
        },
        
        error: function(xhr, status, error){
            console.log(xhr, status, error)
            var errorMessage = `vacationPostAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}

const vacationFetchAJAX = (staffID) => {
    
    $.ajax({
        url: "./php/vacationFetch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            'staffID' : staffID,
        },
            
        success: function(result) {
            console.log(result);   //Bug Testing

            $('#vacation_planned_table').html('')

            if (result['errors']) {
            } else if (result['success']) {
                $('#vacation_planned_table').append(`
                <br>
                <h3>Current Booked Leave</h3><br>
                <table id="vac_table">
                    <colgroup>
                        <col class="vac_col1">
                        <col class="vac_col2">
                        <col class="vac_col3">
                        <col class="vac_col4">
                        <!-- <col class="vac_col5"> -->
                        <col class="vac_col6">
                    </colgroup>
                    <tr>    
                        <th><h4>Ref.</h4></th>
                        <th><h4>Start</h4></th>
                        <th><h4>End</h4></th>
                        <th><h4>Days*</h4></th>
                        <!--<th></th> -->
                        <th id="table_blank"></th>
                    </tr>
                    </table>
                    <p>*Count of weekdays during period</p>`);
                    let i = 0
                    for (data in result['data']) {
                        let fromDate = result['data'][i]['from_date']
                        let fromDateReverse = fromDate.split("-").reverse().join("-");
                        let toDate = result['data'][i]['to_date']
                        let toDateReverse = toDate.split("-").reverse().join("-");
                        $('#vac_table').append(`
                            <tr>    
                            <td><h4>${result['data'][i]['id']}</h4></td>
                            <td><h4>${fromDateReverse}</h4></td>
                            <td><h4>${toDateReverse}</h4></td>
                            <td><h4>${result['data'][i]['num_weekdays']}</h4></td>
                            <!-- <td><button onclick="" id="vac_amend_button">Amend</button></td> -->
                            <td><button onclick="vacationDelete(value)" id="vac_delete_button" value="${result['data'][i]['id']}">Delete</button></td>
                            </tr>
                        `)
                        i++
                }
            }
        },

        error: function(xhr, status, error){
            console.log(xhr, status, error)
            var errorMessage = `vacationFetchAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}

const vacationDeleteAJAX = (vacationData) => {
    
    $.ajax({
        url: "./php/vacationDelete.php",
        type: 'POST',
        dataType: 'json',
        data: vacationData,
            
        success: function(result) {
            console.log(result);   //Bug Testing

            $('#vacation_emp_status_message').html('').fadeIn(0)

            $('#vacation_emp_status_message').html(`
                <h4>Vacation has been successfully deleted.</h4>`)
                .delay(2000)
                .fadeOut(800)
            
            vacationFetchAJAX(result['staffID'])
            
            
        },
        
        error: function(xhr, status, error){
            console.log(xhr, status, error)
            var errorMessage = `vacationPostAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}
