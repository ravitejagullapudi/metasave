$(document).on('show.bs.modal', '#addGroupModal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    let section_details = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    section_details = section_details.split(',');
    console.log(section_details)
    var sectionId = section_details[0];
    var sectionName = section_details[1];
    var modal = $(this)
    modal.find('.modal-title').text(`Add Group to the ${sectionName}`)
    modal.find('#addGroupSectionId').val(sectionId)
    modal.find('#addGroupSectionName').val(sectionName)
})

$(document).on('hide.bs.modal', '#addGroupModal', function (event) {
    let button = $(event.relatedTarget) // Button that triggered the modal

    let sure = confirm("Did you want to close this without adding group ?")
    if (sure)
        document.getElementById("addGroupModalForm").reset();
    else
        $('#groupName').modal('show')
})

var addGroupToSection = async()=>{
    let form = document.getElementById("addGroupModalForm");
    if(form.checkValidity() === false){
        form.classList.add('was-validated');
    }
    else{
        const addGroup = {
            "sectionId":form.elements["addGroupSectionId"].value,
            "sectionName": form.elements["addGroupSectionName"].value,
            "groupName":form.elements["addGroupLabel"].value
        }
        await eel.add_group(addGroup.sectionId, addGroup.groupName)()
    }
}