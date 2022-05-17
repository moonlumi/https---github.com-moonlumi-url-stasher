let myLeads = []
// console.log(myLeads )
let inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn=document.getElementById("tab-btn")
const deleteBtn=document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

// localStorage.setItem("myLeads","www.google.com")
// localStorage.clear()
// console.log(inpval) 
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}
// const tabs=[{url:"https://www.google.com/"}]

function render(leads) {
    let listItems = "" 
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li> <a href=' "+myLeads[i]+" ' target='_blank' >" + myLeads[i] + "</a> </li>"
        listItems += `
        <li> 
        <a href='${leads[i]}' target='_blank' >
        ${leads[i]}
        </a>
        </li>
        `
    }

    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))

   
    console.log("btn clicked from evenlistener")
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
    

})

tabBtn.addEventListener("click",function(){


    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        // console.log(tabs[0].url)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    });

   
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
    // ulEl.innerHTML=null
})


