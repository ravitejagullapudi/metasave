var remove = async(type, id) => {
    console.log(id)
    l = id.split('-')
    let group_id
    let field_id
    let is_removed
    if(type == "field"){
        group_id = l[1]
        field_id = l[3]
        is_removed = await eel.remove_specific_data(current_section,group_id,field_id)()
    }
    else{
        group_id = l[1]
        is_removed = await eel.remove_specific_data(current_section,group_id)()
    }
    if(!is_removed)
        alert("Deleting is not done")
    refreshdiv("removeField",l[0]+'-'+l[1])
    // console.log(group_id,field_id)
}
