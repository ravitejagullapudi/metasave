let group_saved = false
var is_edit_group = false
var edit_group_id
$(document).on('show.bs.modal', '#addGroupModal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    let section_details = button.data('whatever')
    var modal = $(this)
    if (section_details.length) {
        section_details = section_details.split(',');
        console.log(section_details)
        modal.find('.modal-title').text(`Edit Section Name`)
        modal.find('#addSectionLabel').val(section_details[1])
   
        modal.find('.modal-title').text(`Edit Group Name`)
        modal.find('#addGroupSectionId').val(section_details[0])
        modal.find('#addGroupSectionName').val(section_details[1])
        modal.find('#addGroupLabel').val(section_details[3])
        group_saved = false

        is_edit_group = true
        edit_group_id = section_details[2]
    }
    else {
        var sectionId = current_section;
        var sectionName = document.getElementById("current_section").textContent;
        modal.find('.modal-title').text(`Add Group to the ${sectionName}`)
        modal.find('#addGroupSectionId').val(sectionId)
        modal.find('#addGroupSectionName').val(sectionName)
        group_saved = false
    }
})

$(document).on('hide.bs.modal', '#addGroupModal', function (event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    if (!group_saved) {
        if(is_edit_group)
            document.getElementById("addGroupModalForm").reset();
        is_edit_group = false
        edit_group_id = null
    }
    else {
        document.getElementById("addGroupModalForm").reset();
        group_saved = false
        is_edit_group = false
        edit_group_id = null
    }
})

var addGroupToSection = async () => {
    let form = document.getElementById("addGroupModalForm");
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
    }
    else {
        const addGroup = {
            "sectionId": form.elements["addGroupSectionId"].value,
            "sectionName": form.elements["addGroupSectionName"].value,
            "groupName": form.elements["addGroupLabel"].value
        }
        if (is_edit_group) {
            const is_updated = await eel.update_group(addGroup.sectionId, edit_group_id, addGroup.groupName)()
            if (is_updated) {
                group_saved = true
                refreshdiv("AddGroup")
            }
            else {

            }
        }
        else {
            const is_added = await eel.add_group(addGroup.sectionId, addGroup.groupName)()
            if (is_added) {
                group_saved = true
                refreshdiv("AddGroup")
            }
            else {

            }
        }
    }
    $('#addGroupModal').modal('hide')
}