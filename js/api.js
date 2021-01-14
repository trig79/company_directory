window.addEventListener('load', () => {

    const formData = {
        'id' : '',
        'call'  : 'onload'
      }
      empDataTable(formData)
    depDropDownAJAX()
})



//Generates Full Employee List On Screen > called at onload
const empDataTable = (formData) => {
    
    $.ajax({
        url: "./php/empDataTable.php",
        type: 'POST',
        dataType: 'json',
        data: formData,

        success: function(result) {
           console.log(result);   //Bug Testing

            if(result['message'] == 'error') {
                //this is a fail safe, but its primariliy in place to reset page when users deselect option from title dropdown menus
                window.location.reload()

            } else {
            let employeeList;

            for(i=0; i < result['data'].length; i++) {
                employeeList += `
                <tr>
                
                
                <td> 
                <a href="#edit_employee_modal" class="edit testing" data-toggle="modal" onclick="employeeRetrieve('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteModal('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
                <td>${result['data'][i]['lastName']}, ${result['data'][i]['firstName']}</td>
                <td>${result['data'][i]['depName']}</td>
                <td>${result['data'][i]['jobTitle']}</td>
                <td>${result['data'][i]['locName']}</td>
                <td>${result['data'][i]['email']}</td>
            </tr>
            `
        }
        //renders above information to the DOM
        $('#emp_list').html(employeeList);
    }
        },
        
        error: function(xhr, status, error){
            var errorMessage = `employee List Error: ${xhr.status} : ${xhr.statusText}.`
            console.log(errorMessage);
            }
    })
}

//Generates drop down selection list when user add or edits and employee.
const depDropDownAJAX = (depID) => {
   
    $.ajax({
        url: "./php/dropdownList.php",
        type: 'POST',
        dataType: 'json',
        // data: {
        //     stfID : stfID
        // },
            
        success: function(result) {
            console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle
            let dropdownDepartments;
            dropdownDepartments += `<option value="" class="dropdown-list-item">Select Department</option>`
            for(i=0; i < result['departments'].length; i++) {
                //If depID matches then dropdown Menu will default to that option in the list
                result['departments'][i]['depID'] == depID ?
                dropdownDepartments += `<option selected="selected" value="${result['departments'][i]['depID']}" class="dropdown_list_departments" required>${result['departments'][i]['department']}</option>`:
                dropdownDepartments += `<option value="${result['departments'][i]['depID']}" name="${result['departments'][i]['depID']}" class="dropdown_list_departments" required>${result['departments'][i]['department']}</option>`
            }

            let dropdownName;
            dropdownName += `<option value="dropdown_start" class="dropdown-list-item">Select Employee</option>`
            for(i=0; i < result['personnel'].length; i++) {
                dropdownName += `<option value="${result['personnel'][i]['id']}" class="dropdown-list-item">${[result['personnel'][i]['lastName'],result['personnel'][i]['firstName']]}</option>`
            }
            
            
            $('#ddm_name_filter').html(dropdownName);


            $('.ddmdepartment').html(dropdownDepartments)
            $('.ddmTitle').html(dropdownDepartments)


        },
        
        error: function(xhr, status, error){
            var errorMessage = `deleteEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}

//Generates drop down selection list when user add or edits and employee.
const locDropDownAJAX = () => {
   
    $.ajax({
        url: "./php/dropdownList.php",
        type: 'POST',
        dataType: 'json',
        // data: {
        //     stfID : stfID
        // },
            
        success: function(result) {
            console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle
            let dropdownLocations;
            dropdownLocations += `<option value="" class="dropdown-list-item">Select Location</option>`

            for(i=0; i < result['locations'].length; i++) {
                dropdownLocations += `<option value="${result['locations'][i]['locID']}" name="${result['locations'][i]['locID']}" class="dropdown_list_locations" required>${result['locations'][i]['location']}</option>`
            }

            $('.ddmTitle').html(dropdownLocations)

        },
        
        error: function(xhr, status, error){
            var errorMessage = `locDropDownAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}


//pulls data to pre-populate the edit employee function
const employeeRetrieve = (stfID) => {
    //resets User Message
    editEmployee()
$.ajax({
    url: "./php/employeeRetrieve.php",
    type: 'POST',
    dataType: 'json',
    data: {
        'id' : stfID
    },
        
    success: function(result) {
        console.log(result);   //Bug Testing

        $('#editModalBody').html(`
        <div class="form-group">
              <label>Staff Number</label>
              <input type="text" class="form-control" name="staffID" value="${result[0]['stfID']}" readonly>
            </div>
            <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" name="firstName" placeholder="${result[0]['firstName']}" value="${result[0]['firstName']}" required>
          </div>
          <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-control" name="lastName" placeholder="${result[0]['lastName']}" value="${result[0]['lastName']}" required>
            </div>
            <div class="form-group">
              <label>Department</label>
              <select id="update_department" class="form-control ddmdepartment" name="depID"> </select>
            </div>
            <div class="form-group">
              <label>Job Title</label>
              <input type="text" class="form-control" name="jobTitle" placeholder="${result[0]['jobTitle']}" value="${result[0]['jobTitle']}" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" name="email" placeholder="${result[0]['email']}" value="${result[0]['email']}" required>
            </div>
    `)
    //populates the department list to prevent user free typing.
    let depID = result[0]['depID']
    depDropDownAJAX(depID)
    
    },
    
    error: function(xhr, status, error){
        var errorMessage = `employeeRetrieve Error: ${xhr.status} : ${xhr.statusText}. `
        console.log(errorMessage);
        }
})
}

//Deletes Employees from the list
const deleteEmployeeAJAX = (stfID) => {
   
    $.ajax({
        url: "./php/deleteEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: {
            stfID : stfID
        },
            
        success: function(result) {
            //console.log(result);   //Bug Testing
        },
        
        error: function(xhr, status, error){
            var errorMessage = `deleteEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}

//Listens ADD form submission
$(function () {

    $('#addForm').on('submit', function (e) {

      e.preventDefault();
      console.log($('#addForm').serializeArray())
      console.log($('#addForm').serialize())
      $.ajax({
        url: "./php/addEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: $('#addForm').serialize(),
            
        success: function(result) {
            console.log(result);   //Bug Testing

            result['message'] == 'duplication' ? $('#add_message').html('This is a duplication. No user can share the same email address')
                                               : $('#add_message').html('User has been added to database.')
                                            
        },
        
        error: function(xhr, status, error){
            var errorMessage = `addEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })

    })
})

//Listens for EDIT form submission
$(function () {

    $('#editForm').on('submit', function (e) {

      e.preventDefault();
    //   console.log($('#editForm').serializeArray())
    //   console.log($('#editForm').serialize())
      $.ajax({
        url: "./php/updateEmp.php",
        type: 'POST',
        dataType: 'json',
        data: $('#editForm').serialize(),
            
        success: function(result) {
            console.log(result);   //Bug Testing
            $('#edit_message').html('')
            result['message'] == 'duplication' ? $('#edit_message').html('No changes detected. Please amend resubmit.') 
                                            : $('#edit_message').html('User has been successfully updated.') 

        },
        
        error: function(xhr, status, error){
            var errorMessage = `UpdateEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })

    })
})




/* OLD */

//Creates Drop Down Menu For Employee Selection.....Sorted By Lastname.
const employeeDropdownMenu = () => {
    
    $.ajax({
        url: "./php/dropdownMenus.php",
        type: 'POST',
        dataType: 'json',

        success: function(result) {
           ////console.log(result);   //Bug Testing

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
            }
    })
}
//Creates Drop Down Menus For departments, jobroles and regions
const jobDepDropdownMenu = (depID, jobTitle) => {
    
    $.ajax({
        url: "./php/dropdownMenus.php",
        type: 'POST',
        dataType: 'json', 

        success: function(result) {
            //console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle
            let dropdownDepartments;
            dropdownDepartments += `<option value="" class="dropdown-list-item">Select Department</option>`
            for(i=0; i < result['departments'].length; i++) {
                //If depID matches then dropdown Menu will default to that option in the list
                result['departments'][i]['depID'] == depID ?
                dropdownDepartments += `<option selected="selected" value="${result['departments'][i]['depID']}" class="dropdown_list_departments">${result['departments'][i]['department']}</option>`:
                dropdownDepartments += `<option value="${result['departments'][i]['depID']}" class="dropdown_list_departments">${result['departments'][i]['department']}</option>`
            }
            // if depID false then function was called on page load and all corresponding dropdown can be populated. If true then only applied to menus in update section
            depID ? $('.dropdown_menu_departments_update').html(dropdownDepartments) : $('.dropdown_menu_departments').html(dropdownDepartments);

            let dropdownJobs;
            dropdownJobs += `<option value="" class="dropdown-list-item">Select Job Title</option>`
            for(i=0; i < result['jobs'].length; i++) {
                //If jobTitle matches then dropdown Menu will default to that option in the list
                result['jobs'][i]['title'] == jobTitle ?
                dropdownJobs += `<option selected="selected" value="${result['jobs'][i]['title']}" class="dropdown_list_jobs">${result['jobs'][i]['title']}</option>`:
                dropdownJobs += `<option value="${result['jobs'][i]['title']}" class="dropdown_list_jobs">${result['jobs'][i]['title']}</option>`
            }
            // if jobTitle false then function was called on page load and all corresponding dropdown can be populated. If true then only applied to menus in update section
            jobTitle ? $('.dropdown_menu_jobs_update').html(dropdownJobs) : $('.dropdown_menu_jobs').html(dropdownJobs);

            let dropdownRegions;
            dropdownRegions += `<option value="" class="dropdown-list-item">Select Region</option>`
            for(i=0; i < result['locations'].length; i++) {
                dropdownRegions += `<option value="${result['locations'][i]['locID']}" class="dropdown_list_Location">${result['locations'][i]['location']}</option>`
            }
            $('.dropdown_menu_region').html(dropdownRegions);
console.log(dropdownDepartments)
        },
        
        error: function(xhr, status, error){
            var errorMessage = `employeeDropdownMenu Error: ${xhr.status} : ${xhr.statusText}.`
            console.log(errorMessage);
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
            //console.log(result);   //Bug Testing
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
                employeeTeamMembersAJAX(depID, 'singleSearch')
            
            } else if (result[1] == 'update') {
                $('#update_emp_table_div').html(`
                <table id="update_table">    
                <tr>    <th><h4>Staff Number</h4></th>
                        <td><h4 id="update_staffID" value="${result[0]['stfID']}">${result[0]['stfID']}</h4></td>
                </tr>
                <tr>    <th><h4>First Name</h4></th>
                        <td><input id="update_forenames" type="text" value="${result[0]['firstName']}"></td>
                </tr>
                <tr>    <th><h4>Surname</h4></th>
                        <td>    <input id="update_surname" type="text" value="${result[0]['lastName']}"></td>
                </tr>
                <tr>    <th><h4>Department</h4></th>
                        <td>    <select id="update_department" class="dropdown_menu_departments dropdown_menu_departments_update" name="dropdown_menu_departments"> </select></td>
                </tr>
                <tr>    <th><h4>Job Title</h4></th>
                        <td>    <select id="update_job" class="dropdown_menu_jobs dropdown_menu_jobs_update" name="dropdown_menu_jobs">   </select></td>
                </tr>
                <tr>    <th><h4>Email</h4></th>
                        <td>    <input  id="update_email" type="text" value="${result[0]['email']}"></td>
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
// const addEmployeeAJAX = (formdata) => {
    
//     $.ajax({
//         url: "./php/addEmployee.php",
//         type: 'POST',
//         dataType: 'json',
//         data: formdata,
            
//         success: function(result) {
//             //console.log(result);   //Bug Testing

//             if(result['success']){
//                 //return success message to user, message removed from dom after 2 secs, form reset
//                 $('#add_emp_status_message').html('').fadeIn(0)

//                 $('#add_emp_status_message').html(`
//                 <h4 class="success_message">Employee Has Successfully Added</h4>  
//                 `).delay(2000)
//                 .fadeOut(800);

//                 $('#add_employee').replaceWith(`
//                 <button id="add_employee" type="submit" value="submit" onclick="addEmp()">Submit</Button>`)
//                 $('#add_table :input').val('');

//             } else if(result['errors'] == 'duplication') {
//                 //if duplicate entry found on DB user is asked to re-confirm prior to submission
//                 $('#add_emp_status_message').html('').fadeIn(0)
//                 $('#add_emp_status_message').append(`
//                 <h4 >This appears to be a duplicate entry, press submit again to confirm ok.</h4> <h4>Or <a onClick="addFormReset()">Click Here</a> to reset form.</h4>  
//                 `)
//                 $('#add_employee').replaceWith(`
//                 <button id="add_employee" type="submit" value="submitFinal" onclick="addEmp()">Reconfirm</Button>`)
//             }
            
//             else {
//                 //clears any priro messages
//                 $('#add_emp_status_message').html('').fadeIn(0)
//                 //returns message to user if any of the form contents is missing.
//                 for (message in result['errors']){
//                     $('#add_emp_status_message').append(`
//                     <h4> ${result['errors'][message]}</h4>  
//                     `)
//                 }
//             }
//         },
        
//         error: function(xhr, status, error){
//             var errorMessage = `addEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. Error was generated with alpha2code:`
//             console.log(errorMessage);
//             }
//     })
// }

//Add employee to DB. For success and failur the user will recieve relevant messages to guide them.
const updateEmployeeAJAX = (formdata) => {
    
    $.ajax({
        url: "./php/updateEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: formdata,
            
        success: function(result) {
            //console.log(result);   //Bug Testing
            $('#update_emp_status_message').html('').fadeIn(0)

            if (result['success']) {
            $('#update_emp_status_message').html(`
            <h4 class="success_message">Employee Has Been Successfully Updated</h4>  
            `).delay(2000)
            .fadeOut(800)

            employeeDropdownMenu()
            } else if (!result['success']){
                $('#update_emp_status_message').html(`
                <h4 class="success_message">No changes were detected, please amend and resubmit</h4>  
                `)    
            }
        },
        
        error: function(xhr, status, error){
            var errorMessage = `updateEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}



const employeeTeamMembersAJAX = (ref, searchCall) => {
    
    $.ajax({
        url: "./php/employeeTeamMembers.php",
        type: 'POST',
        dataType: 'json',
        data: {
            'reference'      : ref,
            'searchCall'     : searchCall,
    },
            
        success: function(result) {
            //console.log(result);   //Bug Testing

            //prevents generation of employee table on tabs that are closed
            const classChecker = searchCall == 'singleSearch' ? '.employee_search_team_members' : 
                                 searchCall == 'depSearch' ? '.department_search_team_members'  : '.region_search_team_members'

            //reset div to empty
             $(classChecker).html('') 
            
            //add heading
            $(classChecker).append(`
                    <br>
                    <h3 class="total"></h3>
                    <div class="employee_search_team_members_tables"></div>
                `)
            let total = 0;
            //loop through results
            for(i=0; i < result.length; i++) {
                total++
                //Prevents 'null' errors appearing in console when employee record is not complete.
                let firstName = !result[i]['firstName'] ? 'No Info Avlb' : result[i]['firstName'];
                let lastName = !result[i]['lastName']   ? 'No Info Avlb' : result[i]['lastName'];
                let jobTitle = !result[i]['jobTitle']   ? 'Job Title Not Currently Avlb' : result[i]['jobTitle'];
                let email = !result[i]['email']         ? 'No Info Avlb' : result[i]['email'];
                

                $('.employee_search_team_members_tables').append(`
                    <table class="team_member_info ${jobTitle}">
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

                searchCall == 'regionSearch' ? $('.total').text(`${total} Employees Within Region.....`) : $('.total').text(`${total} Employees Within Department.....`)
                
            }
        
        },
        
        error: function(xhr, status, error){
            var errorMessage = `employeeTeamMemebersAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
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
            //console.log(result);   //Bug Testing

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
            //console.log(result);   //Bug Testing

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
            //console.log(result);   //Bug Testing

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
