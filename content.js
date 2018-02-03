
if( extension_status == 'on' ) {

	/*
	You can chance end of apiURL your local currency:

	"AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", 
	"IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", 
	"RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"


	*/

	var cur3 = 'TRY'
	var apiURL = 'https://api.coinmarketcap.com/v1/ticker/steem-dollars/?convert='+cur3
	// we dont need cur2
	/* var cur2 = 'TL' */
	// if your local currency has not TWO letter symbol, you can use this cur2 = ''
	// you "should" set json_obj.price_try accorrding to your currency in bellow
	// eg. json_obj.price_chf



	function getURL(URL, callback) {
	    var xhr = new XMLHttpRequest();

	    xhr.onreadystatechange = function () {
	      if (this.readyState == 4 && this.status == 200) {

	       callback(this);

	      }
	    }

	    xhr.open("GET", URL);
	    xhr.send();

	  }



	var content_ar =':none:1content'
	var cur =':none:2cur'
	function DoSome(result) { 

		var content_ar = result.responseText;

		var content_di = content_ar.replace("]", "")
		var content = content_di.replace("[", "")

		var json_obj = JSON.parse(content)

		cur = json_obj.price_try

	  }

	 
	getURL(apiURL, DoSome)



	 



	// we are meandering because steemit pages, loading with scrolling

	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var scrollArea = 1000 - windowHeight;

	catg ='all'
	cut = 1
	var x = 0
	// update position 
	window.addEventListener('scroll', function() {

		var scrollTop = window.pageYOffset || window.scrollTop;
		var scrollPercent = scrollTop/scrollArea || 0;


		
		var integer_elm = document.getElementsByClassName("integer")[x];
		var decimal_elm = document.getElementsByClassName("decimal")[x];
		var prefixx_elm = document.getElementsByClassName("prefix")[x];


		var tagspan_elm =  document.getElementsByClassName("articles__tag-link")[x];

		if (tagspan_elm != null) { 
			var tagin = tagspan_elm.innerText; }
		else { var innpost_elm =  document.getElementsByClassName("right-side")[x]
			var tagin = innpost_elm.innerText; }
		

		

		//var tagin = tagspan_elm.innerText;


		if ( tagin.match(/utopian/gi) ) { cut = 0.8; catg = 'utopian'; }
		else if ( tagin.match(/dmania/gi) ) { cut = 0.75; catg = 'dmania';  }
		else {catg = 'all'; cut = 1; }



		


		//Steem has comma for bigger than 999 eg. $1,314.51 
		var integer = integer_elm.innerText; var integer = integer.replace(",", "");
		var decimal = decimal_elm.innerText;
		var prefixx = decimal_elm.innerText;


		var sbd_int = parseFloat(integer) 
		var sbd_dec = parseFloat(decimal)

		var sbd_mrg = parseFloat(integer) + parseFloat(decimal)
		var sbd_loc = sbd_mrg * cur //local
		//var sbd_try = sbd_usd * 3.8 //USD

		var sbd_clc = sbd_loc * 0.375 * cut  // Net rewards after, curation, utopian, dmania
		var sbd_net = sbd_clc.toFixed(2) // 2 decimal

		/* if (cur2) { sym = cur2 } else { sym = cur3} */


		integer_elm.innerHTML = sbd_net ;
		decimal_elm.innerHTML = ' '+cur3 ;
		prefixx_elm.innerHTML = ' ' ;


		// change color according to utoipan, dmania or others
		if(catg == 'utopian'){ 
			integer_elm.style.background = '#f5e9f5';
			decimal_elm.style.background = '#f5e9f5'; } 
		else if (catg == 'dmania'){
			integer_elm.style.background = '#f7ece0';
			decimal_elm.style.background = '#f7ece0'; }
		else if (catg == 'all') {
			integer_elm.style.background = '#edfbea';
			decimal_elm.style.background = '#edfbea'; }



		// update others
		x = x+1

		})


}
