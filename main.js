var myKey = 'dict.1.1.20140123T135251Z.ce1b2103a11d739d.70b95ab5394a305f9209446b102bce89ff5c0127';


var getLangs = function(key) {
	var langs = $.get('https://dictionary.yandex.net/api/v1/dicservice.json/getLangs',
		{'key': key}
	).done(function(data) {
		console.log(data);
	}).fail(function() {
		console.log('Failed to request Yandex');
	});
};


getLangs(myKey);

var lookup = function(key, word, lang, callback) {
	$.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
		{
			'key': key,
			'text': word,
			'lang': lang
		}
	).done(function(data) {
		callback.data = data;
		//console.log(callback.data);
		callback();
	}).fail(function() {
		console.log('Failed to request Yandex');
	});
};


$(document).ready(function() {
	$('#goButton').click(function() {
			$('#pos').empty();
			$('#title').empty();
			var word = $('input[name=word]').val();
			//$('#test').html(word);
			//console.log('ololoasadas'.match('lo'));
			console.log(word);
			lookup(myKey, word, 'ru-en', translation);
			$('#title').append('<h3 id="toc-variables" class="head-toc head-toc-start">'+word+'</h3><button type="button" id="more" class="btn btn-round">Show/hide details</button>');
	})
	$(document).on('click', '#more', function() {
		$('.hide').toggleClass('show');
	})
	$(document).on('click', '.close', function() {
		$(this).parent().remove();
	})
});

a = [];
trololo = [];

var translation = function() {
	if (translation.data.def.length === 0) {
		$('#inputWord').addClass('input-error')
		$('#title').html('<div class="message message-error"><span class="close"></span>Not found. Please try again.</div>')
	} else {
		$('#inputWord').addClass('input-success')
	}
	console.log(translation.data);
	console.log('ololo');
	def = translation.data['def'];
	console.log(def);
	console.log(def[0].pos);
	pos = $('#pos');
	for (i=0; i<def.length; i++) {
		//console.log(def[i].pos);
		pos.append('<li>'+def[i].pos+'<ol id="tr'+i+'"></ol></li>');
		for (j=0; j<def[i].tr.length; j++) {
			$("#tr"+i+"").append('<li>'+def[i].tr[j].text+'</li>');
			if (def[i].tr[j].mean) {
				$("#tr"+i+"").append('<p class="mean hide" id="mean'+i+j+'">Means:</p>');
				for (k=0; k<def[i].tr[j].mean.length; k++) {
					$("#mean"+i+j+"").append(' '+def[i].tr[j].mean[k].text+'');
					if (k === def[i].tr[j].mean.length - 1) {
						$("#mean"+i+j+"").append('.');
					} else {
						$("#mean"+i+j+"").append(',');
					}
				}
			}
			if (def[i].tr[j].ex) {
				$("#tr"+i+"").append('<p hidden class="ex hide" id="ex'+i+j+'">Examples:</p>');
				for (k=0; k<def[i].tr[j].ex.length; k++) {
					$("#ex"+i+j+"").append(' '+def[i].tr[j].ex[k].text+'');
					if (k === def[i].tr[j].ex.length - 1) {
						$("#ex"+i+j+"").append('.');
					} else {
						$("#ex"+i+j+"").append(',');
					}
				}
			}
			if (def[i].tr[j].syn) {
				$("#tr"+i+"").append('<p hidden class="syn hide" id="syn'+i+j+'">Synonyms:</p>');
				for (k=0; k<def[i].tr[j].syn.length; k++) {
					$("#syn"+i+j+"").append(' '+def[i].tr[j].syn[k].text+'');
					if (k === def[i].tr[j].syn.length - 1) {
						$("#syn"+i+j+"").append('.');
					} else {
						$("#syn"+i+j+"").append(',');
					}
				}
			}
		}	
	}
	// $('.mean').before('<p>Means</p>')
	// $('.ex').before('<p>Examples</p>')
	// $('.syn').before('<p>Synonyms</p>')
};

// $(document).ready(function() {
// 	$(document).on('click', '#more', function() {
// 		$('.mean').show();
// 	})
// })

// b = [];
// b.push(43);
// console.log('bdsadas');
// console.log(b);