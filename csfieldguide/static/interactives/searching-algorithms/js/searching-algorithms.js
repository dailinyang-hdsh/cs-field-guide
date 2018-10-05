window.onload = function() {
	var url_string = window.location.href;
    var url = new URL(url_string);
    var num_boxes = url.searchParams.get('num-boxes'); // get num boxes parameter
    var num_guesses = url.searchParams.get('num-guesses'); // get num guesses parameter
    var sorted = url.searchParams.get('sorted'); // get sorted/not sorted parameter

    if (sorted == 'true') {
    	sorted = gettext('Sorted');
    } else if (sorted == 'false') {
    	sorted = gettext('Random');
    }

    // fill in the rules
    var target = Math.floor(Math.random() * Math.floor(999)) + 1;
	document.getElementById('interactive-searching-algorithms-num-boxes').innerText = num_boxes;
	document.getElementById('interactive-searching-algorithms-target').innerText = target;
	document.getElementById('interactive-searching-algorithms-num-guesses').innerText = num_guesses;
	document.getElementById('interactive-searching-algorithms-order').innerText = sorted

	// create box elements and assign random weights
	var box_div = document.getElementById('interactive-searching-algorithms-boxes');
	for (var i = 0; i < num_boxes; i++) {
		var random_square_number = Math.floor(Math.random() * Math.floor(15));
		var weight = Math.floor(Math.random() * Math.floor(999)) + 1;
		var src_string = colourful_box_images[random_square_number];
		
		var img_div = document.createElement('div');

		var img_weight = document.createElement('p');
		img_weight.classList.add('interactive-searching-algorithms-box-weight');
		img_weight.innerText = weight;

		var img_number = document.createElement('p');
		img_number.classList.add('interactive-searching-algorithms-box-number');
		img_number.innerText = gettext('Box') + ' ' + (i+1);

		var img_element = document.createElement('img');
		img_element.setAttribute('src', src_string);
		img_element.setAttribute('data-weight', weight);
		// img_element.onclick = fadeBox(event);

		img_element.addEventListener("click", fadeBox);
		
		img_div.appendChild(img_element);
		img_div.appendChild(img_weight);
		img_div.appendChild(img_number);
		box_div.appendChild(img_div);
	}
}

function fadeBox(event) {
	console.log(event);
	var clicked_img = event.srcElement;
	var img_weight = clicked_img.nextElementSibling;
	 // fade the box and show the number
	 clicked_img.classList.add('fade');
	 img_weight.classList.add('show');
	// img_weight.classList.add('show');
}
