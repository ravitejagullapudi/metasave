// import {fieldset} from './fieldset'
// import {remove} from './remove'
// import {copyToClipboard} from './copy_to_clipboard'
let toggle_accordion = (id) => {
    console.log(id)
    let btn = document.getElementById(id)
    console.log(btn.getAttribute('data-target'))
    let target = document.getElementById(btn.getAttribute('data-target').slice(1,))
    console.log(target.classList.contains("show"))
    if (target.classList.contains("show")) {
        document.getElementById(id).innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
        `
    }
    else {
        document.getElementById(id).innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
        `
    }

}

var get_all_groups = async () => {
    var main_section = "";
    console.log(groupSchema)
    if (groupSchema && groupSchema.groups) {
        let row_num = 0
        groupSchema.groups.forEach((group) => {
            row_num += 1
            let top = `
    <div class="card accordion shadow">
    <div class="card-header" id="groupheader${group.groupId}">
        <h5 class="mb-0 card-header1 d-flex justify-content-between">
        <button
            class="accordion-btn mt-1"
            data-toggle="collapse"
            data-target="#accordionCollapse-${group.groupId}"
            aria-expanded="true"
            aria-controls="accordionCollapse-${group.groupId}"
            onclick="toggle_accordion('accordion-btn-${group.groupId}')"
        >
            ${group.groupName}
        </button>    
        <button
            class="accordion-btn btn"
            data-toggle="collapse"
            data-target="#accordionCollapse-${group.groupId}"
            aria-expanded="true"
            aria-controls="accordionCollapse-${group.groupId}"
            id ="accordion-btn-${group.groupId}"
            onclick="toggle_accordion('accordion-btn-${group.groupId}')"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
        </button>
        </h5>
        <div class="d-flex justify-content-md-end justify-content-center  flex-wrap">
            <a data-toggle="modal" class="btn btn-sm btn-outline-primary"
            data-target="#addGroupModal"
            data-whatever="${groupSchema.sectionId},${groupSchema.sectionName},${group.groupId},${group.groupName}">
                Rename
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
            </a>
        
            <button
                class="btn btn-outline-danger btn-sm"
                data-toggle="modal"
                data-target="#deleteModal"
                data-whatever="group,accordionCollapse-${group.groupId},entire ${group.groupName} group"
            >  Delete
                <svg
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
                >
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
                </svg>
            
            </button>
        </div>
    </div>
    
    <div
        id="accordionCollapse-${group.groupId}"
        class="collapse ${row_num == 1 ? 'show' : ''}"
        aria-labelledby="headingOne"
    >
        <div class="card-body">`;

            main_section += top;

            group.fields.forEach((field) => {
                let field_html = fieldset(`accordionCollapse-${group.groupId}`, field);
                main_section += field_html;
            });
            const groupDetails = {
                "groupId": group.groupId,
                "groupName": group.groupName,
                "sectionId": 1
            }
            let end = `
        <div class="">
            <button id="accordionCollapse-${group.groupId}-addfield" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addFieldModal" data-whatever="1,section1,${group.groupId},${group.groupName}">
            Add another field +
            </button>
        </div>
        </div>
    </div>
    </div>
    `;

            main_section += end;
        });

        const content_div = document.createElement("div");
        content_div.innerHTML = main_section;

        const accGroups = document.getElementById("accordionGroups");
        // console.log(accGroups);
        accGroups.innerHTML = main_section;
    }
    else {
        const accGroups = document.getElementById("accordionGroups");
        // console.log(accGroups);
        const no_groups_div = document.createElement('div')
        no_groups_div.innerHTML = "**No Groups are present here**<br><br>"
        no_groups_div.className = "title text-center p-3"
        const temp = document.getElementById("add_group_button")
        temp.id = "add_group_button1"
        no_groups_div.appendChild(temp)
        accGroups.appendChild(no_groups_div);
    }
};
