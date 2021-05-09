var data_saved = false
$(document).on('show.bs.modal', '#addFieldModal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var group_details = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    group_details = group_details.split(',');
    console.log(group_details)
    var sectionId = group_details[0];
    var sectionName = group_details[1];
    var groupId = group_details[2];
    var groupName = group_details[3];
    var modal = $(this)
    modal.find('.modal-title').text(`Add Field to the ${groupName} group`)
    modal.find('#addFieldSectionId').val(sectionId)
    modal.find('#addFieldSectionName').val(sectionName)
    modal.find('#addFieldGroupId').val(groupId)
    modal.find('#addFieldGroupName').val(groupName)
    data_saved = false
})

$(document).on('hide.bs.modal', '#addFieldModal', function (event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    if (!data_saved) {
        let sure = confirm("Did you want to close this without adding field ?")
        if (sure)
            document.getElementById("addFieldModalForm").reset();
        else
            $('#groupName').modal('show')
    }
    else {
        document.getElementById("addFieldModalForm").reset();
    }
})

var addFieldToGroup = async () => {
    let form = document.getElementById("addFieldModalForm");
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
    }
    else {
        const addField = {
            "sectionId": form.elements["addFieldSectionId"].value,
            "sectionName": form.elements["addFieldSectionName"].value,
            "groupId": form.elements["addFieldGroupId"].value,
            "groupName": form.elements["addFieldGroupName"].value,
            "field": {
                "label": form.elements["addFieldLabel"].value,
                "value": form.elements["addFieldValue"].value,
            }
        }
        console.log(addField)
        const is_added = await eel.add_field(addField)
        if (is_added) {
            refreshdiv("Added Field")
        }
        else {

        }
    }
}