const some_script = () => {
  var x = 'hi'
  eel.metasave(x)((r) => console.log(r));
};

// const schema = {
//   sections: [
//     {
//       section_name: "Shopify Details",
//       section_desc: "Regarding something"
//     }
//   ]
// };

// var groupSchema = {
//   groups: [
//     {
//       groupId: "1",
//       groupName: "Shopify AWS",
//       fields: [
//         {
//           fieldId: "1",
//           label: "username",
//           value: "raviteja"
//         },
//         {
//           fieldId: "2",
//           label: "pass",
//           value: "ravi"
//         }
//       ]
//     },
//     {
//       groupId: "2",
//       groupName: "Shopify AWS2",
//       fields: [
//         {
//           fieldId: "3",
//           label: "username1",
//           value: "raviteja1"
//         },
//         {
//           fieldId: "4",
//           label: "pass1",
//           value: "ravi1"
//         }
//       ]
//     }
//   ]
// };

var current_section = 0
var schema
var groupSchema
// const remove = 
var loaddata = async() => {
  console.log(schema)
  await loadSections()
  var groupSchema = await eel.loadSectionData(current_section)()
  get_all_groups()
}

var refreshdiv = (type, div_id=null) => {
  // console.log("Refresh div", div_id)
  // $( `#${id}` ).load(window.location.href + " #id" );
  loaddata()
  if (type == "removeField")
    document.getElementById(div_id).classList.add('show')

}

