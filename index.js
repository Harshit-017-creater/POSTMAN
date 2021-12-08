let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";
let addParamCount = 0;
function getElementFromString(string) {
	const div = document.createElement("div"); //<div><div
	div.innerHTML = string; //<div>XYZ</div>
	return div.firstElementChild; //XYZ
}

let paramRadio = document.getElementById("paramsradio");
paramRadio.addEventListener("click", () => {
	document.getElementById("requestJsonBox").style.display = "none";
	document.getElementById("parameterBox").style.display = "block";
	document.getElementById("params").style.display = "none";
});

let jsonRadio = document.getElementById("jsonradio");
jsonRadio.addEventListener("click", () => {
	document.getElementById("parameterBox").style.display = "none";
	document.getElementById("requestJsonBox").style.display = "block";
});

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
	let params = document.getElementById("params");
	let string = `<div id="parameterBox${addParamCount + 2}">
    <div class="form-row my-2">
        <label for="url" class="col-sm-2 col-form-label">Parameter${
					addParamCount + 2
				}</label>
        <div class="col-md-4">
            <input
                type="text"
                class="form-control"
                id="parameterkey${addParamCount + 2}"
                placeholder="Enter Parameter ${addParamCount + 2} Key"
            />
        </div>
        <div class="col-md-4">
            <input
                type="text"
                class="form-control"
                id="parametervalue${addParamCount + 2}"
                placeholder="Enter Parameter ${addParamCount + 2} Value "
            />
        </div>
        <button type="button" id="addParam" class="btn btn-primary deleteParam">-</button>
    </div>
</div>`;
	addParamCount++;
	let childElement = getElementFromString(string);
	params.appendChild(childElement);

	let deleteParam = document.getElementsByClassName("deleteParam");
	for (item of deleteParam) {
		item.addEventListener("click", (e) => {
			e.target.parentElement.remove();
		});
	}
});

document.getElementById("submit").addEventListener("click", () => {
	const url = document.getElementById("urlField").value;
	const requestType = document.querySelector(
		"input[name='requestType']:checked"
	).value;
	const contentType = document.querySelector(
		"input[name='requestType']:checked"
	).value;
	let data = {};

	if (contentType == "params") {
		for (let i = 1; i < addParamCount; i++) {
			let key = document.getElementById(`parameterkey${i}`).value;
			let value = document.getElementById(`parametervalue${i}`).value;
			data[key] = value;
		}
	} else {
		data = document.getElementById("requestJsonText").value;
	}
	if (requestType == "GET") {
		fetch(url, {
			methord: "GET",
		})
			.then((res) => res.text())
			.then((data) => {
				console.log(data);
				document.getElementById("responseJsonText").value = data;
			});
	} else if (requestType == "POST") {
		fetch(url, {
			methord: "POST",
			headers: {
				"Content-type": "appliation/Json,charset=UTF-8",
			},
			body: data,
		})
			.then((res) => res.text())
			.then((data) => {
				console.log(data);
			});
	} else if (requestType == "DELETE") {
		fetch(url, {
			methord: "DELETE",
		})
			.then((res) => res.text())
			.then((data) => {
				console.log(data);
				document.getElementById("resJSONText").value = data;
			});
	} else if (requestType == "PUT") {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"content-Type": "application/json;charset=UTF-8",
			},
		})
			.then((res) => res.text())
			.then((data) => {
				document.getElementById("resJSONText").value = data;
			});
	}
});
