function loadPicasa(photos) {
	var album_container = $('.picasa_web_album');

	album_container.find('.loader').hide();
	$.each(photos.feed.entry, function () {
		var entry = this;
		
		var img = new Image();
		img.src = entry["media$group"]["media$thumbnail"][0].url;
		
		var link = $('<a>');
		link.attr('href',entry.content.src)
				.addClass('facebox')
				.addClass('thumb')
				.append(img)
				.facebox();
		album_container.append(link);
	});
	
	console.log(photos);
}

$.fn.extend({
	picasa: function(options) {
		var max_results = 50;
		$(this).addClass('picasa_web_album');
		$(this).append("<span class=\"loader\">Wczytywanie...</span>");
		var url = "http://picasaweb.google.com/data/feed/api/user/"+options['user']+"/album/"+options['album_name']+"?imgmax=912&kind=photo&thumbsize="+options['thumb_size']+"&alt=json-in-script&callback=loadPicasa&max-results="+max_results;
		var script = $('<script>');
		script.attr('src', url)
					.attr('type', "text/javascript")
					.attr('charset', "text/javascript");
		$("head").append(script);
	},
});