const some_script = () => {
  var x = 'hi'
  eel.metasave(x)((r) => console.log(r));
};

var current_section
var current_section_name
var schema
var groupSchema

var check_updates = async () => {
  var response = await fetch("https://metasave.ravitejagullapu.repl.co/update")
  if (response.ok) {
    var update_json = await response.json()
    if (update_json.update) {
      const div = document.createElement('div')
      div.innerHTML = update_json.steps
      const div_heading = document.createElement('div')
      div_heading.innerHTML = update_json.heading
      $('#downloadModal').modal('show')
      document.getElementById("downloadModalLongTitle").appendChild(div_heading)
      document.getElementById("downloadModalBody").appendChild(div)
    }
    console.log(update_json)
  }
}

var initialLoad = async () => {
  await loadSections()
  await loaddata()
  check_updates()

}


var loaddata = async () => {
  console.log(current_section)
  groupSchema = await eel.loadSectionData(current_section)()
  console.log(groupSchema)
  await get_all_groups()
}

var refreshdiv = (type, div_id = null) => {
  // console.log("Refresh div", div_id)
  // $( `#${id}` ).load(window.location.href + " #id" );
  loaddata()
  if (type == "removeField")
    document.getElementById(div_id).classList.add('show')
  if (type == "refresh")
    $(`#${div_id}`).load(window.location.href + `#${div_id}`);
}


var set_current_section = (section, refresh = true) => {
  console.log(section)
  current_section = section.sectionId
  current_section_name = section.sectionName
  document.getElementById("current_section").innerHTML = `${section.sectionName}
                <a data-toggle="modal" class="ml-1" style="cursor:pointer"
                data-target="#addSectionModal"
                data-whatever="${current_section},${section.sectionName}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg></a>
                `
  if (refresh) {
    document.getElementById('nav-items').childNodes.forEach((child) => {
      child.className = ""
    })
    document.getElementById(`sec-li-${section.sectionId}`).className = "active"
    refreshdiv("add section")
  }
  $("#sidebar").toggleClass("active");
  return
}