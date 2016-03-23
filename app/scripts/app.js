
// Global module
var myApp = function(){

	var local = function(){
		return 1+1;
	};

	return {
		sumar : local,
	};

}();
