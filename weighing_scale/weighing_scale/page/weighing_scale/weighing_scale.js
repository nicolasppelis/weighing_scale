frappe.pages['weighing-scale'].on_page_load = function(wrapper) {


	let scriptEle = document.createElement("script");
	scriptEle.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/gauge.js/1.2.1/gauge.min.js");
	document.body.appendChild(scriptEle);

	scriptEle.addEventListener("load", () => {
		console.log("File loaded")
	});
	
	scriptEle.addEventListener("error", (ev) => {
		console.log("Error on loading file", ev);
	});



alert('This is a script ....');

	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Weighing Scale',
		single_column: true
	});
}


