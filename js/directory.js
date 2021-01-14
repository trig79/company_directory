

const ddmDeptFilter = document.querySelector('#ddm_dep_filter');
ddmDeptFilter.addEventListener('change', (event) => {  
  //console.log(event.target.value)    //bug testing

  const formData = {
    'id' : event.target.value,
    'call'  : 'ddmDeptFilter'
  }
  empDataTable(formData)
});


const ddmEmpFilter = document.querySelector('#ddm_name_filter');
ddmEmpFilter.addEventListener('change', (event) => {  
  //console.log(event.target.value)    //bug testing

  const formData = {
    'id' : event.target.value,
    'call'  : 'ddmNameFilter'
  }
  empDataTable(formData)
});



function addEmployee(){
  //console.log('add employee called')  //bug testing
  $('#addModalBody').html(`
      <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" maxlength="50" name="firstName" required>
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control" maxlength="50" name="lastName" required>
      </div>
      <div class="form-group">
        <label>Department</label>
        <select id="add_department" class="form-control ddmdepartment" maxlength="50" name="depID" required> </select>
      </div>
      <div class="form-group">
        <label>Job Title</label>
        <input type="text" class="form-control" maxlength="50" name="jobTitle" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input id="inputEmail" type="email" class="form-control" maxlength="100" name="email" required>
      </div>
`)
$('#add_message').html('').fadeIn(0)
depDropDownAJAX()
}


function deleteModal(stfID){
  //console.log('delete employee called')   //bug testing

  $("#deleteEmployeeModal").html(`
    <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">						
          <h4 class="modal-title">Delete Employee</h4>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">					
          <p>Are you sure you want to delete these Records?</p>
          <p class="text-warning"><small>This action cannot be undone.</small></p>
        </div>
        <div class="modal-footer">
          <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
          <input type="submit" class="btn btn-danger" value="Delete" onclick="deleteEmployeeAJAX(${stfID})">
        </div>
      </form>
    </div>
  </div>
`)
  }

  //resets the message displayed to user upon sucess/fail of updating user db
function editEmployee() {
  // console.log('edit employee called')  //bug testing

  $('#edit_message').html('').fadeIn(0)
}
