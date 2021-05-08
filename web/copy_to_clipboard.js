
var copyToClipboard = (elementId) => {
    let textToCopy = document.getElementById(elementId);
    textToCopy.select();
    document.execCommand("copy");
    //   console.log()
};