let section_saved = false
var is_edit_section = false
var edit_section_id
$(document).on('show.bs.modal', '#addSectionModal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this)
    let section_details = button.data('whatever')
    console.log(section_details)
    if (section_details.length) {
        section_details = section_details.split(',');
        console.log(section_details)
        modal.find('.modal-title').text(`Edit Section Name`)
        modal.find('#addSectionLabel').val(section_details[1])
        is_edit_section = true
        edit_section_id = section_details[0]
    }
    else{
        modal.find('.modal-title').text(`Add Section Name`)
    }
    section_saved = false
})

$(document).on('hide.bs.modal', '#addSectionModal', function (event) {
    let button = $(event.relatedTarget) // Button that triggered the modal
    console.log(section_saved)
    if (!section_saved) {
        // let sure = confirm("Did you want to close this without adding Section ?")
        // if (sure)        
        //     document.getElementById("addSectionModalForm").reset();
        // else
        //     $('#addSectionModal').modal('show')
        if(is_edit_section)
            document.getElementById("addSectionModalForm").reset();
        is_edit_section = false
        edit_section_id = null
    }
    else {
        console.log("Hii")
        document.getElementById("addSectionModalForm").reset();
        section_saved = false
        is_edit_section = false
        edit_section_id = null
    }
})

var addSection = async () => {
    let form = document.getElementById("addSectionModalForm");
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
    }
    else {
        if (is_edit_section) {
            const is_updated = await eel.update_section(edit_section_id,form.elements["addSectionLabel"].value)()
            if (is_updated) {
                section_saved = true
                await loadSections()
            }
            else {

            }
        }
        else {
            const is_added = await eel.add_section(form.elements["addSectionLabel"].value)()
            if (is_added) {
                section_saved = true
                await loadSections()
            }
            else {

            }
        }
    }
    console.log(section_saved)
    $('#addSectionModal').modal('hide')
}