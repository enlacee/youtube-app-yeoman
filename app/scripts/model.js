// Modelo genérico
(function () {
	function AjaxModel(url) {
		this.url = url;
	}

	var model = AjaxModel.prototype;

	model.load = function(url, data) {
		this.url = url || this.url;
		var me = this;
		return $.getJSON(this.url, data)
			.then(function (data, status) {
				me.ajaxStatus = status;
				$.extend(me, data);
			});
	};

	window.AjaxModel = AjaxModel;
})();
