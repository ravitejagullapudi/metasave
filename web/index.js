const some_script = ()=>{
    var x = document.getElementById("some_text").value;
    eel.metasave(x)((r)=>console.log(r))
}