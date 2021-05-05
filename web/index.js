const some_script = () => {
  var x = document.getElementById("some_text").value;
  eel.metasave(x)((r) => console.log(r));
};

const schema = {
  sections: [
    {
      section_name: "Shopify Details",
      section_desc: "Regarding something"
    }
  ]
};

const groupSchema = {
  groups: [
    {
      groupId: 1,
      groupName: "Shopify AWS",
      fields: [
        {
          fieldId: 1,
          label: "username",
          value: "raviteja"
        },
        {
          fieldId: 2,
          label: "pass",
          value: "ravi"
        }
      ]
    },
    {
      groupId: 2,
      groupName: "Shopify AWS2",
      fields: [
        {
          fieldId: 3,
          label: "username1",
          value: "raviteja1"
        },
        {
          fieldId: 4,
          label: "pass1",
          value: "ravi1"
        }
      ]
    }
  ]
};

const copyToClipboard = (elementId) => {
  let textToCopy = document.getElementById(elementId);
  textToCopy.select();
  document.execCommand("copy");
  //   console.log()
};

const onl = () => {
  var main_section = "";

  groupSchema.groups.forEach((group) => {
    let top = `
<div class="card">
<div class="card-header" id="groupheader${group.groupId}">
  <h5 class="mb-0">
    <button
      class="btn btn-link"
      data-toggle="collapse"
      data-target="#accordionCollapse${group.groupId}"
      aria-expanded="true"
      aria-controls="accordionCollapse${group.groupId}"
    >
      ${group.groupName}
    </button>
    <button class="btn btn-outline-danger btn-sm" type="button">
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
  id="accordionCollapse${group.groupId}"
  class="collapse"
  aria-labelledby="headingOne"
>
  <div class="card-body">`;

    main_section += top;

    group.fields.forEach((field) => {
      let middle = `
    <div class="form-group">
      <label
        for="fieldset${field.fieldId}"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div>Email address</div>
        <div>
          <button class="btn btn-danger btn-sm" type="button">
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
      </label>
      <div class="input-group">
        <input
          type="text"
          id="group${group.groupId}fieldset${field.fieldId}"
          class="form-control"
          aria-label="fieldset${field.label}"
          aria-describedby="basic-addon2"
          value="${field.value}"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary btn-sm"
            type="button"
            onclick = "copyToClipboard('group${group.groupId}fieldset${field.fieldId}')"
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
              />
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    `;

      main_section += middle;
    });

    let end = `
    <div class="">
      <button class="btn btn-primary btn-sm">
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
  console.log(accGroups);
  accGroups.innerHTML = main_section;
};
