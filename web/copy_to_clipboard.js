
var copyToClipboard = (elementId) => {
    document.getElementById(elementId).setAttribute("type","text")
    let textToCopy = document.getElementById(elementId);
    textToCopy.select();
    document.execCommand("copy");
    document.getElementById(elementId).setAttribute("type","password")
    //   console.log()
};