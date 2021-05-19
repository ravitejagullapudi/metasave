var type, id
$(document).on('show.bs.modal', '#deleteModal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    let details = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    details = details.split(',');
    var modal = $(this)
    console.log(details)
    type = details[0]
    if (type == "section") {
        modal.find('.modal-title').text(`Did you really want to delete entire ${current_section_name.toUpperCase()} section?`)
    }
    else {
        id = details[1]
        modal.find('.modal-title').text(`Did you really want to delete ${details[2]}?`)
    }
})

$(document).on('hide.bs.modal', '#addGroupModal', function (event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    type = undefined
    id = undefined
})


var remove = async () => {
    let group_id
    let field_id
    let is_removed
    let l
    if (id) {
        console.log(id)
        l = id.split('-')
    }
    if (type == "field") {
        group_id = l[1]
        field_id = l[3]
        is_removed = await eel.remove_specific_data(current_section, group_id, field_id)()
        refreshdiv("removeField", group_id)
    }
    else if (type == "group") {
        group_id = l[1]
        is_removed = await eel.remove_specific_data(current_section, group_id)()
        refreshdiv("removeGroup")
    }
    else {
        is_removed = await eel.remove_specific_data(current_section)()
        await loadSections()
        await loaddata()
    }
    if (!is_removed) {
        // alert("Deleting is not done")
    }

    // console.log(group_id,field_id)
}
