/**!
 * @license JSON-Tag - A JavaScript library to easily render data from JSON locally or from a API / URL on your website inside of a <json> tag.
 * VERSION: 1.0.0
 * LICENSE & MORE INFO CAN BE FOUND AT https://github.com/MarketingPipeline/JSON-Tag/
 */


// import module(s)
import Hogan from "https://cdn.skypack.dev/hogan.js@3.0.2";

/// DOM CHANGE HANDLER 


(function(window) {
	let last = +new Date();
	let delay = 100; // default delay

	// Manage event queue
	let stack = [];

	function callback() {
		let now = +new Date();
		if (now - last > delay) {
			for (let i = 0; i < stack.length; i++) {
				stack[i]();
			}
			last = now;
		}
	}

	// Public interface
	let onDomChange = function(fn, newdelay) {
		if (newdelay) delay = newdelay;
		stack.push(fn);
	};

	// Naive approach for compatibility
	function naive() {

		let last = document.getElementsByTagName('*');
		let lastlen = last.length;
		let timer = setTimeout(function check() {

			// get current state of the document
			let current = document.getElementsByTagName('*');
			let len = current.length;

			// if the length is different
			// it's fairly obvious
			if (len != lastlen) {
				// just make sure the loop finishes early
				last = [];
			}

			// go check every element in order
			for (let i = 0; i < len; i++) {
				if (current[i] !== last[i]) {
					callback();
					last = current;
					lastlen = len;
					break;
				}
			}

			// over, and over, and over again
			setTimeout(check, delay);

		}, delay);
	}

	//
	//  Check for mutation events support
	//

	let support = {};

	let el = document.documentElement;
	let remain = 3;

	// callback for the tests
	function decide() {
		if (support.DOMNodeInserted) {
			window.addEventListener("DOMContentLoaded", function() {
				if (support.DOMSubtreeModified) { // for FF 3+, Chrome
					el.addEventListener('DOMSubtreeModified', callback, false);
				} else { // for FF 2, Safari, Opera 9.6+
					el.addEventListener('DOMNodeInserted', callback, false);
					el.addEventListener('DOMNodeRemoved', callback, false);
				}
			}, false);
		} else if (document.onpropertychange) { // for IE 5.5+
			document.onpropertychange = callback;
		} else { // fallback
			naive();
		}
	}

	// checks a particular event
	function test(event) {
		el.addEventListener(event, function fn() {
			support[event] = true;
			el.removeEventListener(event, fn, false);
			if (--remain === 0) decide();
		}, false);
	}

	// attach test events
	if (window.addEventListener) {
		test('DOMSubtreeModified');
		test('DOMNodeInserted');
		test('DOMNodeRemoved');
	} else {
		decide();
	}

	// do the dummy test
	let dummy = document.createElement("div");
	el.appendChild(dummy);
	el.removeChild(dummy);

	// expose
	window.onDomChange = onDomChange;
})(window);







/// Main function to render all JSON tags

function renderJSONTags() {
	// selector all tags
	let JSON_Tag = document.querySelectorAll("json")

	JSON_Tag.forEach(tag => {
		try {


			let template = Hogan.compile(tag.innerHTML);
			// check if rendering local JSON inside HTML or JS file etc... 
			if (tag.hasAttribute("local-json")) {
				let output = template.render(eval(tag.getAttribute("local-json")));
				tag.innerHTML = output

			} else {
				/// fetch URL from attribute

				// make sure attribute is found..
				if (tag.hasAttribute("fetch-json")) {
					fetchJSON_From_URL(tag)
				}

			}

			// things went smoothly - set rendered attribute
			setAttribute(tag)

		} catch (error) {
			handleError(tag, error)

		}


	})





	function handleError(tag, err) {

		/// allow users to set their own custom error messages - on failed fetch attempts etc.. 
		if (tag.hasAttribute("error-message")) {
			tag.innerHTML = tag.getAttribute("error-message");
		} else {
			// default error message
			tag.innerHTML = `JSON-Tag Error: ${err.message}`;
		}

		// let developer know in the console!
		console.error(`JSON Tag: Error - ${err.message}`);

		// set error attribute - so it can be handled via CSS or JS etc.... 
		setAttribute(tag, "error")
	}




	function setAttribute(tag, error) {
		// function to set rendered attribute 
		if (error) {
			tag.setAttribute('json-error', '')

		} else {
			// no error occured
			tag.setAttribute('json-rendered', '')
		}


	}





	async function fetchJSON(url) {
		const rsp = await fetch(url),
			data = await rsp.json();
		let JSON = {
			json: data
		}
		return JSON;
	}




	async function fetchJSON_From_URL(tag) {
		try {
			let data = await fetchJSON(tag.getAttribute("fetch-json"));
			let template = Hogan.compile(tag.innerHTML);
			let output = template.render(data);
			tag.innerHTML = output
		} catch (err) {
			handleError(tag, err)

		}
	}


}





// on DOM mutations - 
onDomChange(function() {

	// timeout required for things to work 
	setTimeout(() => {
		renderJSONTags()
	}, "1")


});

// initialize function - 
document.addEventListener('DOMContentLoaded', () => renderJSONTags());
