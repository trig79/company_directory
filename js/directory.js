//'ddm' = Drop Down Menu
//This listens for changes on the dropdown menu, and calls employee data from DB using their ID.
const ddmEmployeesSearch = document.querySelector('#ddm_employees_search');
ddmEmployeesSearch.addEventListener('change', (event) => {  
  //console.log(event)    
  singleEmployeeRetrieval(event.target.value, 'search')
});
const ddmEmployeesUpdate = document.querySelector('#ddm_employees_update');
ddmEmployeesUpdate.addEventListener('change', (event) => {  
  //console.log(event)    
  singleEmployeeRetrieval(event.target.value, 'update')
});
const ddmEmployeesDelete = document.querySelector('#ddm_employees_delete');
ddmEmployeesDelete.addEventListener('change', (event) => {  
  //console.log(event)    
  singleEmployeeRetrieval(event.target.value, 'delete')
});
const ddmEmployeesVacation = document.querySelector('#ddm_employees_vacation');
ddmEmployeesVacation.addEventListener('change', (event) => {  
  //console.log(event)    
  singleEmployeeRetrieval(event.target.value, 'vacation')
  vacationFetchAJAX(event.target.value)
});
const ddmDepartmentSearch = document.querySelector('#ddm_department_search');
ddmDepartmentSearch.addEventListener('change', (event) => {  
  //console.log(event)    
  employeeTeamMembersAJAX(event.target.value, 'depSearch')
});
const ddmRegionSearch = document.querySelector('#ddm_region_search');
ddmRegionSearch.addEventListener('change', (event) => {  
  //console.log(event)    
  employeeTeamMembersAJAX(event.target.value, 'regionSearch')
});



//Sends form data to AJAX when adding an employee
const addEmp = () => {

    let addEmpData = {
    'forenames'   : $('#add_forenames').val(),
    'surname'     : $('#add_surname').val(),
    'jobTitle'    : $('.dropdown_menu_jobs').val(),
    'depId'       : $('#dropdown_menu_departments_add').val(),
    'email'       : $('#add_email').val(),
    'submitValue' : $('#add_employee').val(), 
    };

   //console.log(addEmpData)
    addEmployeeAJAX(addEmpData)
}

const updateEmp = () => {

    let updateEmpData = {
    'staffID'     : $('#update_staffID').text(),
    'forenames'   : $('#update_forenames').val(),
    'surname'     : $('#update_surname').val(),
    'jobTitle'    : $('#update_job').val(),
    'depId'       : $('#update_department').val(),
    'email'       : $('#update_email').val(),
    'submitValue' : $('#update_employee').val(), 
    };

   //console.log(updateEmpData)
    updateEmployeeAJAX(updateEmpData)
}

const deleteEmp = () => {

  let deleteEmpData = {
  'staffID'     : $('#delete_staffID').text(),
  'forenames'   : $('#delete_forenames').text(),
  'surname'     : $('#delete_surname').text(),
  'jobTitle'    : $('#delete_job').text(),
  'location'    : $('#delete_location').text(),
  'depId'       : $('#delete_department').text(),
  'email'       : $('#delete_email').text(),
  'submitValue' : $('#delete_employee').val(), 
  };

 //console.log(deleteEmpData)
  deleteEmployeeAJAX(deleteEmpData)
}

const addFormReset = () => {
  //reloads the submit button incase user has followed the 'else if' path below
  $('#add_employee').replaceWith(`
  <button id="add_employee" type="submit" value="submit" onclick="addEmp()">Submit</Button>`)

  //reset form contents
  $('#add_table :input').val('');
  $('.dropdown_menu_departments').prop('selectedIndex', 0);
  $('.dropdown_menu_jobs').prop('selectedIndex', 0);
  //$('#add_emp_status_message').html('').fadeIn(0)
}

const datePicker = () => {
  $( ".datepicker" ).datepicker(
    { dateFormat: 'dd-mm-yy',
      defaultDate: 0 }
  );
}
//grabs vacation dates and formats them for SQL
const vacationEmp = () => {
  let startDate = $('#vacStart').val()
  let startDateSQL = startDate.split("-").reverse().join("-");
  let endDate = $('#vacEnd').val()
  let endDateSQL = endDate.split("-").reverse().join("-");

  let vacationData = {
    'staffID'   : $('#vac_staffID').text(),
    'startDate' : startDateSQL,
    'endDate'   : endDateSQL,
  }
console.log(endDateSQL)
  vacationPostAJAX(vacationData)
  
}

const vacationDelete = (reference) => {
  let vacationData = {
    'reference' : reference,
    'staffID'   : $('#vac_staffID').text()
  }
  vacationDeleteAJAX(vacationData)
}