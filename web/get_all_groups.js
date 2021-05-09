// import {fieldset} from './fieldset'
// import {remove} from './remove'
// import {copyToClipboard} from './copy_to_clipboard'

var get_all_groups = () => {
    var main_section = "";
    if (groupSchema && groupSchema.groups) {
        groupSchema.groups.forEach((group) => {
            let top = `
    <div class="card">
    <div class="card-header" id="groupheader${group.groupId}">
        <h5 class="mb-0">
        <button
            class="btn btn-link"
            data-toggle="collapse"
            data-target="#accordionCollapse-${group.groupId}"
            aria-expanded="true"
            aria-controls="accordionCollapse-${group.groupId}"
        >
            ${group.groupName}
        </button>
        <button class="btn btn-outline-danger btn-sm" type="button" onclick="remove('group','accordionCollapse-${group.groupId}')">
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
        </h5>
    </div>
    
    <div
        id="accordionCollapse-${group.groupId}"
        class="collapse"
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
        temp = document.getElementById("add_group_button")
        temp.id = "add_group_button1"
        no_groups_div.appendChild(temp)
        accGroups.appendChild(no_groups_div);
    }
};
