'use strict'
export let CanvasRenderingContext2D
CanvasRenderingContext2D.prototype.drawRoundedImage = function(image, radius, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
	var x = dx || sx;
	var y = dy || sy;
	var width =  dWidth || sWidth || image.naturalWidth;
	var height = dHeight || sHeight || image.naturalHeight;
	var r = {topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0};

	if(!Array.isArray(radius)){
		radius = [radius];
	}

	r.topLeft = radius[0];
	r.topRight = radius[1] || (radius[1]===undefined) * radius[0];
	r.bottomRight = radius[2] || (radius[2]===undefined) * radius[0];
	r.bottomLeft = radius[3] || (radius[3]===undefined) * (radius[1] || (radius[1]===undefined) * radius[0]);

	this.beginPath();
	this.arc(x + r.topLeft, y + r.topLeft, r.topLeft, Math.PI, Math.PI + Math.PI / 2);
	this.lineTo(x + width - r.topRight, y);
	this.arc(x + width - r.topRight, y + r.topRight, r.topRight, Math.PI + Math.PI/2, Math.PI*2);
	this.lineTo(x + width, y + height - r.bottomRight);
	this.arc(x + width - r.bottomRight, y + height - r.bottomRight, r.bottomRight, Math.PI*2, Math.PI/2);
	this.lineTo(x + r.bottomLeft, y + height);
	this.arc(x + r.bottomLeft, y + height - r.bottomLeft, r.bottomLeft, Math.PI/2, Math.PI);
	this.closePath();
	this.save();
	this.clip();

	switch(true){
		case arguments.length > 6:
			this.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);			
		break;

		case arguments.length > 4:
			this.drawImage(image, sx, sy, sWidth, sHeight);			
		break;

		default:
			this.drawImage(image, sx, sy);			
		break;
	}

	this.restore();
}
