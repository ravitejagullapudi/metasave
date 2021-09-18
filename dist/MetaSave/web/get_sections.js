var loadSections = async (active_sec = 0) => {
    var sections = await eel.loadSections()()
    const nav_items = document.getElementById("nav-items")
    nav_items.innerHTML = ""
    let li = document.createElement('li')
    let h5 = document.createElement('h5')
    h5.style = "margin-left: 10px;"
    h5.innerHTML = "Sections"
    li.appendChild(h5)
    nav_items.appendChild(li)

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
                current_section_name = section.sectionName
                set_current_section(section,false)
            }
        }
        li.onclick = ()=>set_current_section(section)
        li.appendChild(a)
        nav_items.appendChild(li)
        count+=1
    })
}
