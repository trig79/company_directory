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
           //console.log(result);   //Bug Testing

            if(result['message'] == 'error') {
                //this is a fail safe, but its primariliy in place to reset page when users deselect option from title dropdown menus
                window.location.reload()

            } else {
                let employeeListDesktop;
                let employeeListTablet;
                let employeeListMobile;

            for(i=0; i < result['data'].length; i++) {
                employeeListDesktop += `
                <tr>
                    <td> 
                        <a href="#edit_employee_modal" class="edit testing" data-toggle="modal" onclick="employeeRetrieve('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteEmployeeModal" id="#delete_button" class="delete" data-toggle="modal" onclick="deleteModal('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    </td>
                    <td>${result['data'][i]['lastName']}, ${result['data'][i]['firstName']}</td>
                    <td>${result['data'][i]['depName']}</td>
                    <td>${result['data'][i]['jobTitle']}</td>
                    <td>${result['data'][i]['locName']}</td>
                    <td><a href="mailto:${result['data'][i]['email']}">${result['data'][i]['email']}</a></td>
                </tr>
                `

                employeeListTablet += `
                <tr>
                    <td> 
                        <a href="#edit_employee_modal" class="edit testing" data-toggle="modal" onclick="employeeRetrieve('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteModal('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    </td>
                    <td><a href="mailto:${result['data'][i]['email']}">${result['data'][i]['lastName']}, ${result['data'][i]['firstName']}</a></td>
                    <td>${result['data'][i]['depName']}</td>
                    <td>${result['data'][i]['jobTitle']}</td>
                    <td>${result['data'][i]['locName']}</td>
                </tr>
                `
                employeeListMobile += `
                <tr>
                    <td> 
                        <a href="#edit_employee_modal" class="edit testing" data-toggle="modal" onclick="employeeRetrieve('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteModal('${result['data'][i]['stfID']}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    </td>
                    <td><a href="mailto:${result['data'][i]['email']}">${result['data'][i]['lastName']}, ${result['data'][i]['firstName']}</a></td>
                    <td>${result['data'][i]['depName']}</td>
                </tr>
                `
             }
            //renders above information to the DOM
            $('#emp_list_desktop').html(employeeListDesktop);
            $('#emp_list_tablet').html(employeeListTablet);
            $('#emp_list_mobile').html(employeeListMobile);
    }
        },
        
        error: function(xhr, status, error){
            var errorMessage = `employee List Error: ${xhr.status} : ${xhr.statusText}.`
            console.log(errorMessage);
            }
    })
}
let dropdownLocations; // stored in global as data required in multiple places, probably best to create new AJAX for edit DB lists.
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
            //console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle
            let dropdownDepartments;
            dropdownDepartments += `<option value="" class="dropdown-list-item">Department</option>`
            for(i=0; i < result['departments'].length; i++) {
                //If depID matches then dropdown Menu will default to that option in the list
                result['departments'][i]['depID'] == depID ?
                dropdownDepartments += `<option selected="selected" value="${result['departments'][i]['depID']}" class="dropdown_list_departments" required>${result['departments'][i]['department']}</option>`:
                dropdownDepartments += `<option value="${result['departments'][i]['depID']}" name="${result['departments'][i]['depID']}" class="dropdown_list_departments" required>${result['departments'][i]['department']}</option>`
            }

            let dropdownName;
            dropdownName += `<option value="dropdown_start" class="dropdown-list-item">Employee</option>`
            for(i=0; i < result['personnel'].length; i++) {
                dropdownName += `<option value="${result['personnel'][i]['id']}" class="dropdown-list-item">${[result['personnel'][i]['lastName'],result['personnel'][i]['firstName']]}</option>`
            }
            
            $('#ddm_name_filter').html(dropdownName);

            $('.ddmdepartment').html(dropdownDepartments)
            $('.ddmTitle').html(dropdownDepartments)

            $('#edit_DB_button').html(`
            <a href="#edit_dep_DB_modal" id="#" class="btn btn-success" data-toggle="modal" onClick="editDepDbAJAX()"><i class="material-icons" >create</i> <span>Edit Dep DB</span></a>
          `)


        },
        
        error: function(xhr, status, error){
            var errorMessage = `deleteEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}
const editDepDbAJAX = (depID) => {
   
    $.ajax({
        url: "./php/dropdownList.php",
        type: 'POST',
        dataType: 'json',
        // data: {
        //     stfID : stfID
        // },
            
        success: function(result) {
            //console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle

          let editDepDbList;
          //if(depID == 'editDB') {
              for(i=0; i < result['depAndLocation'].length; i++) {
 
                  editDepDbList += `
                  <tr>
                      <td> 
                          <a href="#" class="delete" data-toggle="modal" onclick="deleteDepartmentAjax('${result['depAndLocation'][i]['depID']}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                      </td>
                      <td>${result['depAndLocation'][i]['depName']}</td>
                      <td>${result['depAndLocation'][i]['locName']}</td>
                  </tr>
                  `
               }
               $('#edit_dep_DB_table').html(editDepDbList)
               //console.log(editDepDbList)
               //$('#ddm_edit_dep_DB').html(dropdownLocations)
              //}

              let dropdownLocations;
              dropdownLocations += `<option value="" class="dropdown-list-item">Select Location</option>`
  
              for(i=0; i < result['locations'].length; i++) {
                  dropdownLocations += `<option value="${result['locations'][i]['locID']}" name="${result['locations'][i]['locID']}" class="dropdown_list_locations" required>${result['locations'][i]['location']}</option>`
              }
              $('#ddm_edit_dep_DB').html(dropdownLocations)

        },
        
        error: function(xhr, status, error){
            var errorMessage = `deleteEmployeeAJAX Error: ${xhr.status} : ${xhr.statusText}. `
            console.log(errorMessage);
            }
    })
}

//Generates drop down selection list when user add or edits and employee.



const locDropDownAJAX = (call) => {
   
    $.ajax({
        url: "./php/dropdownList.php",
        type: 'POST',
        dataType: 'json',
        // data: {
        //     stfID : stfID
        // },
            
        success: function(result) {
            //console.log(result);   //Bug Testing

            // Ternary sets selected option per staff member based on their department and jobtitle
            let dropdownLocations;
            dropdownLocations += `<option value="" class="dropdown-list-item">Select Location</option>`

            for(i=0; i < result['locations'].length; i++) {
                dropdownLocations += `<option value="${result['locations'][i]['locID']}" name="${result['locations'][i]['locID']}" class="dropdown_list_locations" required>${result['locations'][i]['location']}</option>`
            }

            $('.ddmTitle').html(dropdownLocations)
            $('#ddm_edit_dep_DB').html(dropdownLocations)
            $('#edit_DB_button').html(`
              <a href="#edit_loc_DB_modal" id="#"class="btn btn-success" data-toggle="modal" onClick="locDropDownAJAX('editDB')"><i class="material-icons" >create</i> <span>Edit Loc DB</span></a>
            `)

            let editLocDbList;
            if(call == 'editDB') {
                for(i=0; i < result['locations'].length; i++) {
                    //removed from below
                    // deleteDBModal
    
                    editLocDbList += `
                    <tr>
                        <td> 
                            <a href="#" class="delete" data-toggle="modal" onclick="deleteLocationAjax('${result['locations'][i]['locID']}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                        <td>${result['locations'][i]['location']}</td>
                    </tr>
                    `
                 }

                 $('#edit_Loc_DB_table').html(editLocDbList)

                }
                
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
        //console.log(result);   //Bug Testing

        $('#editModalBody').html(`
        <div class="form-group">
              <label>Staff Number</label>
              <input type="text" class="form-control" maxlength="50" name="staffID" value="${result[0]['stfID']}" readonly>
            </div>
            <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" name="firstName" maxlength="50" placeholder="${result[0]['firstName']}" value="${result[0]['firstName']}" required>
          </div>
          <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-control" name="lastName" maxlength="50" placeholder="${result[0]['lastName']}" value="${result[0]['lastName']}" required>
            </div>
            <div class="form-group">
              <label>Department</label>
              <select id="update_department" class="form-control ddmdepartment" maxlength="50" name="depID"> </select>
            </div>
            <div class="form-group">
              <label>Job Title</label>
              <input type="text" class="form-control" name="jobTitle" maxlength="50" placeholder="${result[0]['jobTitle']}" value="${result[0]['jobTitle']}" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" name="email" maxlength="100" placeholder="${result[0]['email']}" value="${result[0]['email']}" required>
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
      //console.log($('#addForm').serializeArray())
      //console.log($('#addForm').serialize())
      $.ajax({
        url: "./php/addEmployee.php",
        type: 'POST',
        dataType: 'json',
        data: $('#addForm').serialize(),
            
        success: function(result) {
            //console.log(result);   //Bug Testing

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
            //console.log(result);   //Bug Testing
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

//Listens for Location DB EDIT form submission
$(function () {

    $('#editLocDBForm').on('submit', function (e) {

      e.preventDefault();
       console.log(e['target'][0]['value'])
       //console.log($('#editLocDBForm').serialize())
      $.ajax({
        url: "./php/locationInsert.php",
        type: 'POST',
        dataType: 'json',
        data: {
            'addLocation' : e['target'][0]['value'],
        },
            
        success: function(result) {
            console.log(result);   //Bug Testing
             $('#edit_loc_DB_message').html('')
             result['message'] == 'duplication' ? $('#edit_loc_DB_message').html('This Location Already Exists.') :
             result['message'] == 'EmptyString' ? $('#edit_loc_DB_message').html('Error Empty Input Received.')
                                                : $('#edit_loc_DB_message').html('Location has Added, Please Refresh The Page.') 

        },
        
        error: function(xhr, status, error){
            var errorMessage = `editLocDBForm Error: ${xhr.status} : ${xhr.statusText}. ${status}`
            console.log(errorMessage);
            $('#edit_loc_DB_message').html('Sorry that input caused an Error. Please Refresh and Try Again.')
            }
    })

    })
})


const deleteLocationAjax =(locID) => {
    console.log(locID)
    $.ajax({
        url: "./php/locationDelete.php",
        type: 'POST',
        dataType: 'json',
        data: {
            'deleteLocID' : locID,
        },
            
        success: function(result) {
            console.log(result);   //Bug Testing
            let count = result['personnelAssigned']
            $('#edit_loc_DB_message').html('')
              result['message'] == 'PlaceInUse'      ? $('#edit_loc_DB_message').html('Can Not Delete. ' + count + ' staff are assigned this location') :
              result['message'] == 'EmptyString'     ? $('#edit_loc_DB_message').html('Error Empty Input Received.') :
              result['message'] == 'LocationNoExist' ? $('#edit_loc_DB_message').html('Location not found on Database.')
                                                     : $('#edit_loc_DB_message').html('Location been Deleted, Please Refresh The Page.') 

        },
        
        error: function(xhr, status, error){
            var errorMessage = `editLocDBForm Error: ${xhr.status} : ${xhr.statusText}. ${status}`
            console.log(errorMessage);
            $('#edit_loc_DB_message').html('Sorry that input caused an Error. Please Refresh and Try Again.')
            }
    })

}

//Listens for Location DB EDIT form submission
$(function () {

    $('#editDepDBForm').on('submit', function (e) {

      e.preventDefault();
      console.log(e['target'][0]['value'])
      console.log(e['target'][1]['value'])
      //console.log($('#editDepDBForm').serialize())
      $.ajax({
        url: "./php/departmentInsert.php",
        type: 'POST',
        dataType: 'json',
        data:  {
             'addDepartment' : e['target'][0]['value'],
             'depID'         : e['target'][1]['value'],
        },
            
        success: function(result) {
            console.log(result);   //Bug Testing
              $('#edit_dep_DB_message').html('')
              result['message'] == 'duplication' ? $('#edit_dep_DB_message').html('This Dep & Location Already Exists.') :
              result['message'] == 'EmptyString' ? $('#edit_dep_DB_message').html('Error Empty Input Received.')
                                                 : $('#edit_dep_DB_message').html('Department Added, Please Refresh The Page.') 

        },
        
        error: function(xhr, status, error){
            var errorMessage = `editLocDBForm Error: ${xhr.status} : ${xhr.statusText}. ${status}`
            console.log(errorMessage);
            $('#edit_loc_DB_message').html('Sorry that input caused an Error. Please Refresh and Try Again.')
            }
    })

    })
})
