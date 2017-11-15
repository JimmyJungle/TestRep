$(document).ready(function() {

var topMargin = $(window).innerHeight() / 2 - $(".container").height() / 2 + "px";
var previewContainer = $("main");
var preview = $("#preview");
var fontName = $("#font span:first-child");
var fontStyle = $("#font span:last-child");

$.fn.extend({
  animateThis: function(effect, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + effect).one(animationEnd, function() {
      $(this).removeClass('animated ' + effect);
      if (callback) {
        callback();
      }
    });
    return this;
  }
});

$.fn.extend({
  apply: function(target, param, event, effect) {
    this.on(event, function() {
      $(this).parent().children().removeClass('active');
      $(this).addClass('active');
      target.css(param, $(this).css(param));

      if(effect != null) {
        target.animateThis(effect);
      }
      if(param == 'font-family') {
        ($(this).css('font-family') == 'source-sans-pro') ? fontName.empty().append('Source Sans') : fontName.empty().append($(this).css(param));
      }
      if(param == 'background-color') {
        if($(this).css(param) == 'rgb(236, 240, 241)') {
          target.children().removeClass('white').addClass('black');
        } else if($(this).css(param) == 'rgb(52, 73, 94)') {
          target.children().removeClass('black').addClass('white');
        } else {
          target.children().removeClass();
        }
      } 
      if(param == 'style') {
        switch($(this).html()) {
          case 'Normal':
            fontStyle.empty().append('Normal');
            target.removeClass('bold').removeClass('italic');
          break;
          case 'Bold':
            fontStyle.empty().append('Bold');
            target.removeClass('italic').addClass('bold');
          break;
          case 'Italic':
            fontStyle.empty().append('Italic');
            target.removeClass('bold').addClass('italic');
          break;
        }
      }
    });
    return this;
  }
});

$('aside li').each(function() {
  if($(this).parent().hasClass('square')) {
    $(this).apply(preview, 'font-family', 'click', 'tada');
  } else if($(this).parent().hasClass('circle')) {
    $(this).apply(previewContainer, 'background-color', 'click', 'fadeIn');
  } else if($(this).parent().hasClass('text')) {
    $(this).apply(preview, 'style', 'click', 'swing');
  }
});

($(window).innerWidth() > 1024) ? $('.container').css('margin-top', topMargin) :  $('.container').css('margin-top', '0px');
});