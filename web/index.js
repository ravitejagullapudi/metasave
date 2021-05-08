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

var groupSchema = {
  groups: [
    {
      groupId: "1",
      groupName: "Shopify AWS",
      fields: [
        {
          fieldId: "1",
          label: "username",
          value: "raviteja"
        },
        {
          fieldId: "2",
          label: "pass",
          value: "ravi"
        }
      ]
    },
    {
      groupId: "2",
      groupName: "Shopify AWS2",
      fields: [
        {
          fieldId: "3",
          label: "username1",
          value: "raviteja1"
        },
        {
          fieldId: "4",
          label: "pass1",
          value: "ravi1"
        }
      ]
    }
  ]
};


// const remove = 
var loaddata=()=>{
  get_all_groups()
}

var refreshdiv =(type,id)=>{ 
  console.log("Refresh div",id)
    // $( `#${id}` ).load(window.location.href + " #id" );
  get_all_groups()
  if(type!="group")
    document.getElementById(id).classList.add('show')
  
}