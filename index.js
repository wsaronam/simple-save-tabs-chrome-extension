const inputButton = document.getElementById("input-button");
const tabButton = document.getElementById("tab-button");
const deleteButton = document.getElementById("delete-button");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

let myLeads = [];




inputButton.addEventListener("click", function() {
	myLeads.push(inputEl.value);
	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	inputEl.value = "";
	render(myLeads);
})

tabButton.addEventListener("click", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

deleteButton.addEventListener("dblclick", function() {
	localStorage.clear();
	myLeads = [];
	render(myLeads);
})

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++) {
		listItems += `
			<li>
				<a href="${leads[i]}" target="_blank">${leads[i]}</a>
			</li>
		`;
	}

	ulEl.innerHTML = listItems;
}




if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}