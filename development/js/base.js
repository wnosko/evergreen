function slideSwitch() {
  var $active = $('#slideshow img.active');

  if ( $active.length == 0 ) $active = $('#slideshow img:last');

  var $next =  $active.next().length ? $active.next() : $('#slideshow img:first');

  $active.addClass('last-active');

  $next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 1500, function() {
		$active.removeClass('active last-active');
  });
}

$(document).ready(function(){
	
	/* Init background slider */
	setInterval( "slideSwitch()", 4000 );

  /* Fields validation */  
  $(".calculator-form").validate({
    submitHandler: function() { 
      alert("Submitted!");
    },
    rules: {
      productivity: {
        required: true,
        minlength: 2
      }, 
      cost: {
        required: true,
        minlength: 1
      },
      sownarea: {
        required: true,
        minlength: 2
      },
      msg: "required"
    },
    messages:{
      productivity: {
        required: "поле не заполнено или заполнено не верно",
        minlength: "в поле должно быть минимум 2 символа"
      },
      cost: {
        required: "поле не заполнено или заполнено не верно",
        minlength: "в поле должно быть минимум 2 символа"
      },
      sownarea: {
        required: "поле не заполнено или заполнено не верно",
        minlength: "в поле должно быть минимум 2 символа"
      },
      msg: "поле не заполнено или заполнено не верно",
    },
    errorPlacement: function(error, element) {
      if(element.attr("name") == "productivity") error.insertAfter($("input[name=productivity]"));
      if(element.attr("name") == "cost") error.insertAfter($("input[name=cost]"));
      if(element.attr("name") == "sownarea") error.insertAfter($("input[name=sownarea]"));
    } 
  });

});