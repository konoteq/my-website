const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "junkoface.png"

img.onload = () => {
	ctx.drawImage(img,0,0);
};

var original = function(){
	ctx.drawImage(img,0,0);
};

var grayscale = function(){
	ctx.drawImage(img,0,0);
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
		data[i]     = avg;
		data[i + 1] = avg;
		data[i + 2] = avg;
	}
	ctx.putImageData(imageData, 0, 0);
}

var specialgrayscale = function(){
	ctx.drawImage(img,0,0);
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		var avg = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
		data[i]     = avg;
		data[i + 1] = avg;
		data[i + 2] = avg;
	}
	ctx.putImageData(imageData, 0, 0);
}

var filter = function(){
	ctx.drawImage(img,0,0);
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		var rnd = (Math.random() - 0.5) * 30;
		data[i]     += rnd;
		data[i + 1] += rnd;
		data[i + 2] += rnd;
	}
	ctx.putImageData(imageData, 0, 0);
}

const inputs = document.querySelectorAll('[name=color]');
for (const input of inputs) {
	input.addEventListener("change", function(evt) {
		switch (evt.target.value) {
			case "grayscale":
				return grayscale();
			case "specialgrayscale":
				return specialgrayscale();
			case "filter":
				return filter();
			default:
				return original();
		}
	});
}

function copy() {
	navigator.clipboard.writeText(canvas.toDataURL());
	alert("コピーしました！");
};
