(function(){

  $(window).scroll(function(){
    if($(window).scrollTop() > 200){
      $('header, .mobile_nav').addClass("scrolled");
    }else{
      $('header, .mobile_nav').removeClass("scrolled");
    }
  });

  // scroll to section function
  function scrollToSection(section){
      // watch for actual font size in 'em' to calculate scroll - header height
      var font_size = parseInt($('body').css('font-size'));

      $('html, body').stop().animate({
          scrollTop: ($(section).offset().top - (6.188 * font_size))
      },500);
  }

  // menu handlers
  $('.about-nav').click(function(){
    scrollToSection($('section.about'))
  });
  $('.benefits-nav').click(function(){
    scrollToSection($('section.benefits'))
  });
  $('.design-nav').click(function(){
    scrollToSection($('section.create'))
  });
  $('.contact-nav').click(function(){
    scrollToSection($('section.contact-us'))
  });

  // burger menu
  $('header .burger').click(function(){
    $(this).toggleClass("active");
    $('header .mobile_nav').stop().slideToggle(200);
  })

  // close mobile menu on click
  $('header .mobile_nav ul li a').click(function(){
    $('header .burger').click();
  })


  /* create smoothie secion */

  // append new entries to the ingredient list / validate inputs + message show
  $('.create .row .col .add-products a').click(function(){

    var ingredient = $(this).siblings('.ingredient'),
        amount = $(this).siblings('.amount');

    if(ingredient.val() && amount.val() != ''){

      $('.create .row .col .add-products input, .create .row .col .error-message').removeClass('error');

      $('.create .row .col .ingredient-list').append('<li>' + ingredient.val() + ' <span class="dash"></span> ' + amount.val() + 'g' + '<span class="remove"></span></li>');
      ingredient.val("");
      amount.val("");

      $('.create .row .col .add-recipe').addClass('visible');

    } else{
      $('.create .row .col .add-products input, .create .row .col .error-message').addClass('error');
    }

    if($('.create .row .col .success:visible')){
      $('.create .row .col .success').hide();
    }

  })

  // remove item from list / hide add-receipe button if there's no more items
  $('.create .row .col .ingredient-list').on('click', 'li .remove', function(){
    $(this).parent().remove();

    if($('.create .row .col .ingredient-list li').length == 0){
      $('.create .row .col .add-recipe').removeClass('visible');
    }
  })

  var recipeList = [];

  // push list to recipeList for future export / hide and show elements
  $('.create .row .col .add-recipe').click(function(){

    $('.create .row .col .ingredient-list li').each(function(){
      recipeList.push($(this).text());
    })
    $('.create .row .col .ingredient-list li').remove();

    $(this).removeClass('visible');

    $('.create .row .col .success').show();

    // clear array after sending data to server
    recipeList = [];

  });

  /* --- */


  // form show
  $('.contact-us .row a').click(function(){
    $(this).toggleClass('visible');
    $('.contact-us .row form').stop().fadeToggle();
  })

  // init section animations library
  AOS.init();

})()
