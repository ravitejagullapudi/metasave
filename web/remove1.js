var remove = (type, id) => {
    console.log(id)
    const l = id.split('-')
    let group_id
    let field_id
    if (type == "field") {
        group_id = l[1]
        field_id = l[3]
        // console.log(group_id,field_id)
        const groups = groupSchema.groups
        for (var i = 0; i < l.length; i++) {
            // console.log( groupSchema.groups[i].groupId, group_id)
            if ( groupSchema.groups[i].groupId == group_id) {
                 groupSchema.groups[i].fields =  groupSchema.groups[i].fields.filter(field => {
                    return field.fieldId != field_id
                })
                break
            }
        }
    }
    else if (type == "group") {
        // console.log(l)
        group_id = l[1]
        groupSchema.groups = groupSchema.groups.filter(group => {
            return group.groupId != group_id
        })
    }
    refreshdiv(type,l[0]+'-'+l[1])
    // console.log(group_id,field_id)
}
