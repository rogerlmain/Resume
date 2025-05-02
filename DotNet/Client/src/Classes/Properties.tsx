Object.defineProperties (jQuery.fn, {
	
	onscreen: {
		get: function () {
			let result = false;
			this.each (function (index, item) {
				if (item.onscreen) {
					result = true;
					return false;
				}// if;
			});
			return result;
		}/* getter */,
		set: function (value) {
			this.each (function (index, item) {
				item.onscreen = value;
			});
		}/* setter */
	}/* onscreen */,
	
	offscreen: { 
		get: function () { return !this.onscreen; },
		set: function (value) { this.onscreen = !value; }
	}/* offscreen */
	
});


