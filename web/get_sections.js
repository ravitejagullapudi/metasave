var loadSections = async (active_sec = 0) => {
    var sections = await eel.loadSections()()
    const nav_items = document.getElementById("nav-items")
    var count = 0
    sections.forEach((section) => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.text = section.sectionName
        li.id = 'sec-li-'+section.sectionId
        a.id = section.sectionId
        if (active_sec != 0) {
            if (section.sectionId == active_sec) {
                li.className = "active"
            }
        }
        else{
            if(count == 0){
                li.className = "active"
                current_section = section.sectionId
                document.getElementById("current_section").innerHTML = section.sectionName
            }
        }
        li.onclick = ()=>set_current_section(section)
        li.appendChild(a)
        nav_items.appendChild(li)
        count+=1
    })
}

var set_current_section = (section)=>{
    current_section = section.sectionId
    document.getElementById("current_section").innerHTML = section.sectionName
    document.getElementById('nav-items').childNodes.forEach((child)=>{
        child.className=""
    })
    document.getElementById(`sec-li-${section.sectionId}`).className = "active"
}