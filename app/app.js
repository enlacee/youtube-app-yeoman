/**
*/
// global namespace

function AppScrap(){
	this.API_KEY = 'AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI';
	this.model = new AjaxModel();

	this.getApiKey = function() {
		return this.API_KEY;
	};

}
var AS = AppScrap.prototype;

AS.testOne = function() {
	var me = this;
	var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=FLvPN2SvwQ6Vqfd1HMHYcceA&key=" + me.getApiKey();
	me.model.load(url)
		.then(function() {
			console.log(me.model);
		});

};

/*
* get api youtube Datos basicos
*/
AS.getDatosBasicosYoutube = function(access_token){
	var me = this;
	var url = "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,brandingSettings,invideoPromotion&mine=true&key=" + me.getApiKey();
	url += '&access_token=' + access_token;
	me.model.load(url)
		.then(function() {
			console.log(me.model);
			console.log("id favorito");
			console.log("Name", me.model.items[0].snippet.title);
			console.log("URL avatar", me.model.items[0].snippet.thumbnails.high.url);
			console.log("ID favoritas", me.model.items[0].contentDetails.relatedPlaylists.favorites);
			var idFavorite = me.model.items[0].contentDetails.relatedPlaylists.favorites;
			$('.jumbotron a.btn-lg').
				removeClass('btn-danger').
				addClass('btn-success').
				text('').
				append('<img width="25" src="'+me.model.items[0].snippet.thumbnails.high.url+'" />').
				append(' ').
				append(me.model.items[0].snippet.title);
			me.getFavoritesList(idFavorite);
		});
};

AS.getFavoritesList = function(channelId) {
	var me = this;
	var url ="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + channelId + "&key=" + me.getApiKey();
	var data = new AjaxModel();
	var $space = $('#spaceScanner');
	$space.append('<p>Caragando lista de videos <code>Favoritos...</code></p>');
	data.load(url)
		.then(function() {
			console.log('data', data);
			$space.append('<p>Mostrando <code>imagenes...</code></p>');

			var strHtml = '';
			strHtml += '<ul class="ulflex">';
			data.items.forEach(function(element, index, array){
				// strHtml
				console.log(element,index,array);
				strHtml += '<li><img width="190" src="'+ element.snippet.thumbnails.medium.url+'"/></li>';
			});
			strHtml += '</ul>';
			$space.append(strHtml);
		});
};


var app = new AppScrap();
//app.testOne();

if (Util.getParameterByName('access_token')) {
	console.log("API youtube");
	var access_token = Util.getParameterByName('access_token');
	app.getDatosBasicosYoutube(access_token);
}
