
function calculatePercentage(x, y) {
	// y = 0.050 | 4.950
	return x / y;
}

function calculateRatio(numerator, denominator) {
    return (numerator / denominator).toFixed(3);
	
}


async function setWidth(v) {
		var overlay = document.querySelector('.overlay');
		let value = 0.000; 

		if (overlay) {
			// Set the width of the overlay element
			let value = calculateRatio(v, 1.5) * 100; 

			if (value >= 100) {
				value == 100; 
				//displayErrorMessage("Weighting value is out of range.", "Error", "Error");
				//frappe.msgprint("Value is out of range.");
			}

			overlay.style.width = value + '%';

			setWightedValue(v,value);

		} else {
			console.error("Overlay element not found in the DOM.");
		}
		


}

function displayErrorMessage(message) {
    frappe.msgprint(message, "Error", "Error", () => {
        // This callback function will be executed when the dialog is closed
        // You can add logic here to reopen the dialog if needed
        // For example, you could call displayErrorMessage again
    });
}

function setWightedValue(v, percentage) {
	// renderer_weight_value
	if (percentage >= 100) {
		percentage = 100;
	}

	document.querySelector("#renderer_weight_value").innerHTML = v + '(' + percentage.toFixed(3) + '%)';
	//document.querySelector("#renderer_weight_value").value = v;
	document.querySelector("#renderer_weight_value").dataset.value = v;


	

}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

async function renderWeightChart() {
	var customFigure = document.querySelector('[data-fieldname="custom_figure"]');

	// Select the first child element
	var firstChild = customFigure.firstChild;

	// Check if the first child is an element node (to avoid removing text nodes or other non-element nodes)
	if (firstChild.nodeType === 1) {
		// Remove the first child element from its parent
		customFigure.removeChild(firstChild);
	}

	// Create figure element
	var figure = document.createElement('figure');

	// Create graphic element
	var graphic = document.createElement('div');
	graphic.className = 'graphic';

	// Create row element
	var row = document.createElement('div');
	row.className = 'row';

	// Create chart element
	var chart = document.createElement('div');
	chart.className = 'chart';

	// Create blocks
	var blocks = [
		{ backgroundColor: 'red', title: 'Lower Bound: ', value: '10%' },
		{ backgroundColor: 'green', title: 'Accepted Range: ', value: '80%' },
		{ backgroundColor: 'red', title: 'Upper Bound: ', value: '10%' }
	];

	blocks.forEach(function (blockData) {
		var block = document.createElement('span');
		block.className = 'block';
		block.style.backgroundColor = blockData.backgroundColor;
		block.title = blockData.title;

		var valueSpan = document.createElement('span');
		valueSpan.className = 'value';
		valueSpan.style.color = blockData.backgroundColor; // Set text color same as background color
		valueSpan.textContent = blockData.value;

		block.appendChild(valueSpan);
		chart.appendChild(block);
	});

	// Create overlay element
	var overlay = document.createElement('div');
	overlay.className = 'overlay';

	// Append elements
	chart.appendChild(overlay);
	row.appendChild(chart);
	graphic.appendChild(row);
	figure.appendChild(graphic);

	var paragraph = document.createElement('p');
	paragraph.textContent = "";
	paragraph.id = 'renderer_weight_value';
	document.body.appendChild(paragraph);

	// Append the link element under the custom_figure div
	var customFigure = document.querySelector('[data-fieldname="custom_figure"]');


		// Select the element with data-fieldname="custom_figure"
		const customFigureElement = document.querySelector('[data-fieldname="custom_figure"]');

		// Check if the element is found
		if (customFigureElement) {
			// Remove all child nodes
			while (customFigureElement.firstChild) {
				customFigureElement.removeChild(customFigureElement.firstChild);
			}
			console.log("All child nodes removed from the element with data-fieldname='custom_figure'");
		} else {
			console.log("Element with data-fieldname='custom_figure' not found.");
		}


	customFigure.appendChild(figure);
	customFigure.appendChild(paragraph);

	setTimeout(() => {
		$('.value').each(function () {
			var text = $(this).text();

			//if (text >= '100.000%') text = '100%';

			

			$(this).parent().css('width', text);
		});

		$('.block').tooltip();
	}, 100);

}