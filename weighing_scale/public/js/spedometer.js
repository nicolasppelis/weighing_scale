let selectedRow = null;
let gauge;

function calculateRange(x) {
  const upperLimit = x * 1.01;
  const lowerLimit = x * 0.99;
  return { upperLimit, lowerLimit };
}

async function setGaugeValue(val) {
  //let numberWithComma = val.toString().replace('.', ',');

  setTimeout(() => {
    //gauge.set(val);
    setWidth(val);
  }, 2500);


  //document.querySelectorAll('#renderer_weight_value').value = val;
  //console.log(':: VALUE :: ', numberWithComma);

}

function renderGauge(zones, lbl, max, rowIndx, frm, cdt, cdn, d) {
  //selectedRow = obj;

  console.log(":: int gauge ::")
  console.log("⚫ row index :: ", rowIndx)
  console.log(":: zones ::", zones);
  console.log(":: labels ::", lbl);

  var opts = {
    lines: 1,
    angle: 0,
    radiusScale: 0.9,
    lineWidth: 0.2,
    pointer: {
      length: 0.6,
      strokeWidth: 0.05,
      color: '#000000'
    },
    // render ticks
    renderTicks: {
      divisions: 4,
      divWidth: 1.1,
      divLength: 0.7,
      divColor: '#333333',
      subDivisions: 3,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: '#666666'
    },
    staticLabels: {
      font: "10px sans-serif",
      labels: lbl,
      fractionDigits: 3
    },
    staticZones: zones,
    limitMax: 'false',
    strokeColor: '#E0E0E0',
    generateGradient: true,
    limitMax: true,
    limitMin: true,
    highDpiSupport: true
  };

  var target = document.getElementById('canvas-preview');

  gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = max;
  gauge.animationSpeed = 1;

  console.log(":: gauge  ::", gauge)

  //gauge.setTextField(document.getElementById("preview-textfield"));
  var textRenderer = new TextRenderer(document.getElementById('preview-textfield'))

  textRenderer.render = function (gauge) {
    percentage = gauge.displayedValue / gauge.maxValue
    this.el.innerHTML = gauge.displayedValue.toString().replace('.', ','); // gauge.displayedValue
    this.el.value = gauge.displayedValue.toString().replace('.', ',');
  };

  gauge.setTextField(textRenderer);

  renderMiniMax(zones);
  renderDesciprion();
  renderAcceptButton(rowIndx, frm);
}

async function accept_weight(e) {
  console.log(":: accept_weight ::")
}




function renderAcceptButton(rowIndx, frm) {

  
  
  // clear the elements 
  
  var container = document.querySelector('[data-fieldname="html_weight_accept_button"]');
  
  container.innerHTML = '';
  
  
  var child_table_data = cur_frm.doc.custom_bom_list || [];
  const button = document.createElement("button");
  // Set button attributes
  button.setAttribute("class", "btn btn-primary btn-sm primary-action");
  button.setAttribute("id", "accept_btn_weight");
  button.setAttribute("data-label", "Accept");
  button.setAttribute("data-row", rowIndx);
  //     margin-bottom: 10px;

  button.style.marginBottom = '10px';
  
  console.log(":: BUTTON ::", button);


  // Add onclick event
  button.onclick = function (e) {

    console.log("::: frm :::", frm)
    console.log("::: e :::", e)

    filtered_row = child_table_data.filter(function (row) {
      console.log(row)
      return row.idx === rowIndx;
    });

    try {
      let targetWeightElement = selectedRow.target.parentElement.parentElement.parentElement.parentElement.childNodes[6].childNodes[0].childNodes[0].childNodes[0];
      console.log(":: TARGET ELEMENT ELEMENT ::", targetWeightElement);
      // check if we have event already register to the input
      targetWeightElement.addEventListener('focusout', () => { console.log(' :: element_focusout ::') });
      targetWeightElement.addEventListener('focus', () => { console.log(' :: element_focus ::') });
      targetWeightElement.addEventListener('change', () => { console.log(' :: element_change ::') });

    } catch (error) {

    }

    console.log(":: BUTTON ELEMENT ::", e);
    console.log(":: ROW ELEMENT ::", selectedRow);

    //let inputString = document.querySelector('#preview-textfield').innerText;
    var inputString = document.querySelector("#renderer_weight_value").dataset.value;

    // Replace periods with commas
    let replacedString = parseFloat(inputString); // .replace(/\./g, ",");
    //targetWeightElement.value = replacedString;
    //let numberWithComma = inputString.toString().replace('.', ',');
    let formattedValue = inputString.toLocaleString('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });

    console.log(' ::: ROW ELEMENT ::: ', formattedValue); // Output: "SUI 0,024 g"

    try {
      targetWeightElement.value = formattedValue;
      targetWeightElement.textContent = formattedValue;
      targetWeightElement.offsetParent.offsetParent.lastChild.children[0].innerHTML = formattedValue;
      //const ev = new Event("change");
      //targetWeightElement.dispatchEvent(ev);
      console.log(' ::: ROW DATA ELEMENT ::: ', targetWeightElement); // Output: "SUI 0,024 g"

    } catch (error) {

    }

    // document.querySelector('.data-row.row.editable-row input[data-fieldname="weighted_qty"]').value = 1.57
    // $(cur_frm.fields_dict['custom_bom_list'].$wrapper[0]).find('table');
    // bomListTable = $(bomListField).find('table[data-fieldname="custom_bom_list"]')[0];
    //var elem = $(bomListField.find('.row.editable-row')[0]).find('input[data-fieldname="weighted_qty"')[0]
    //   // Loop through each row in the child table
    //   $(childTable).find('tbody > tr').each(function(index, row) {
    //     // Access specific fields in each row
    //     var itemInput = $(row).find('input[data-fieldname="item"]')[0]; // Assuming 'item' is the fieldname of the item in the child table
    //     var quantityInput = $(row).find('input[data-fieldname="quantity"]')[0]; // Assuming 'quantity' is the fieldname of the quantity in the child table

    //     // Retrieve values
    //     var item = $(itemInput).val();
    //     var quantity = $(quantityInput).val();

    //     // Do something with the values (e.g., log them)
    //     console.log("Item:", item, "Quantity:", quantity);
    // });

    filtered_row.forEach(function (row) {
      console.log('@@ row @@', row)
      // Replace 'field_to_modify' and 'new_value' with the field and value you want to change
      row.weighted_qty = parseFloat(inputString.toString().replace(",", "."))
      //frm.set_value(parseFloat(inputString.toString().replace(",", ".")), row['weighted_qty']);
    });

    cur_frm.refresh_fields('custom_bom_list');
  };

  // Set button text content
  button.textContent = "Accept";
  // Create a new br element
  const lineBreak = document.createElement("br");
  container.appendChild(lineBreak);
  container.appendChild(button);
  frm.refresh_field("custom_bom_list");
}

async function renderMiniMax(range) {
  var container = document.querySelector('[data-fieldname="html_minimax_values"]');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  console.log("renderMiniMax :: ", range)
  var spanElement = document.createElement("span");

  spanElement.textContent = `U:${parseFloat(range[0].min).toFixed(3)} - ${parseFloat(range[0].max).toFixed(3)} ,A: ${parseFloat(range[1].min).toFixed(3)} - ${parseFloat(range[1].max).toFixed(3)} ,U: ${parseFloat(range[2].min).toFixed(3)} - ${parseFloat(range[2].max).toFixed(3)}`;
  spanElement.style.textTransform = "uppercase";
  spanElement.style.letterSpacing = "0.025em";
  spanElement.style.fontFamily = "Arial, sans-serif";
  spanElement.style.fontStyle = "normal";
  spanElement.style.fontWeight = "600";
  spanElement.style.lineHeight = "1";
  spanElement.style.color = "#3f3844";
  spanElement.style.fontSize = "16px";
  spanElement.style.fontSize = "var(--text-lg)";
  spanElement.style.marginTop = "20px";
  spanElement.className = "control-label";
  container.appendChild(spanElement);
}

async function renderDesciprion() {

  var textRenderer = new TextRenderer(document.querySelector('[data-fieldname="html_spedometer_description"]'));
  var container = document.querySelector('[data-fieldname="html_spedometer_description"]');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  textRenderer.render = function (gauge) {
    percentage = gauge.displayedValue / gauge.maxValue
    this.el.innerHTML = (percentage * 100).toFixed(3)
  };

  // Create the div element
  var divElement = document.createElement("div");
  divElement.className = "js-swatch js-star";
  divElement.style.width = "50px";
  divElement.style.height = "27px";
  divElement.style.borderRadius = "3px";
  divElement.style.backgroundColor = "#F03E3E";
  divElement.style.marginBottom = "5px";

  // Create the span element
  var spanElement = document.createElement("span");
  spanElement.textContent = "Unaccepted range";
  spanElement.style.textTransform = "uppercase";
  spanElement.style.letterSpacing = "0.025em";
  spanElement.style.fontFamily = "Arial, sans-serif";
  spanElement.style.fontStyle = "normal";
  spanElement.style.fontWeight = "600";
  spanElement.style.lineHeight = "1";
  spanElement.style.color = "#3f3844";
  spanElement.style.fontSize = "16px";
  spanElement.style.fontSize = "var(--text-lg)";
  spanElement.style.marginTop = "20px";
  spanElement.className = "control-label";

  // Append the created elements into the container div
  container.appendChild(divElement);
  container.appendChild(spanElement);

  var divElement2 = document.createElement("div");
  divElement2.className = "js-swatch js-star";
  divElement2.style.width = "50px";
  divElement2.style.height = "27px";
  divElement2.style.borderRadius = "3px";
  divElement2.style.backgroundColor = "#30B32D";
  divElement2.style.marginBottom = "5px";

  // Create the span element
  var spanElement2 = document.createElement("span");
  spanElement2.textContent = "Accepted range";
  spanElement2.style.textTransform = "uppercase";
  spanElement2.style.letterSpacing = "0.025em";
  spanElement2.style.fontFamily = "Arial, sans-serif";
  spanElement2.style.fontStyle = "normal";
  spanElement2.style.fontWeight = "600";
  spanElement2.style.lineHeight = "1";
  spanElement2.style.color = "#3f3844";
  spanElement2.style.fontSize = "16px";
  spanElement2.style.fontSize = "var(--text-lg)";
  spanElement2.style.marginTop = "20px";
  spanElement2.className = "control-label";

  container.appendChild(divElement2);
  container.appendChild(spanElement2);
}