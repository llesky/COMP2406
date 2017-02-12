var colorLib={
	shift:5,
	dir:-1,

	//hexcode to RGB functions care of: http://www.javascripter.net/faq/hextorgb.htm
	hexToR:function(h) {return parseInt(h.substring(1,3),16)},
	hexToG:function(h) {return parseInt(h.substring(3,5),16)},
	hexToB:function(h) {return parseInt(h.substring(5,7),16)},


	rgbToHex: function(r,g,b){
		return "#"+(r<16?"0":"")+r.toString(16)
						+(g<16?"0":"")+g.toString(16)
						+(b<16?"0":"")+b.toString(16);
	},

	randomRGB:function(){
		return "rgb("+Math.floor(Math.random()*255)+","+
								Math.floor(Math.random()*255)+","+
								Math.floor(Math.random()*255)+")";
	},
	
	randomHex: function(){
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		return "#"+(r<16?"0":"")+r.toString(16)
						+(g<16?"0":"")+g.toString(16)
						+(b<16?"0":"")+b.toString(16);
	},


	//use this to change the size of the shift amount
	//this should be an integer between 1 and 100
	setShift:function(amt){
		if(amt<0) amt=0;
		if(amt>100) amt=100;
		this.shift=amt;
	},
	flipShift:function(){
		this.dir*=-1;
	},
		
	//Expects a current color and target color as hex values
	//moves the current color towards the target color by the shift amount
	//returns a color that has shifted towards the target color by the shift amount
	shiftColor:function(currentColor, targetColor){
			var r,g,b;
			r=this.hexToR(currentColor);
			g=this.hexToG(currentColor);
			b=this.hexToB(currentColor);
			tr=this.hexToR(targetColor);
			tg=this.hexToG(targetColor);
			tb=this.hexToB(targetColor);
			
			r+=this.shift*this.dir;
			g+=this.shift*this.dir;
			b+=this.shift*this.dir;
			
			if (this.dir == -1){
				r=Math.max(0,r);
				g=Math.max(0,g);
				b=Math.max(0,b);
			}
			
			if (this.dir == 1){
				r=Math.min(tr,r);
				g=Math.min(tg,g);
				b=Math.min(tb,b);
			}
			
			if(r==0 && g==0 && b==0){
				this.dir*=-1;
				return false;
			}
			if(r==tr && g == tg && b==tb){
				 this.dir*=-1;
				 return false;
			}

			return this.rgbToHex(r,g,b);
	}
}