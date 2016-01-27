// COMPONENTS
var COMPONENTS = (function() {
  function COMPONENTS() {
    this.init();
  }

  COMPONENTS.prototype.init = function(){
    this.selectInit();
    this.alertInit();
  };

  COMPONENTS.prototype.alert = function(message, flash, target, flashDelay){
    target = target || '#primary-alert';
    flashDelay = flashDelay || 3000;

    var $target = $(target);
    $target.html('<div>'+message+'</div>').addClass('active');

    if (flash) {
      setTimeout(function(){
        $target.removeClass('active');
      }, flashDelay);
    }
  };

  COMPONENTS.prototype.alertInit = function(){
    var _this = this;

    $(window).on('alert', function(e, message, flash, target, flashDelay){
      _this.alert(message, flash, target, flashDelay);
    });

    $('.alert').on('click', function(){
      $(this).removeClass('active');
    });
  };

  COMPONENTS.prototype.select = function($selectOption){
    var $menu = $selectOption.closest('.select'),
        $active = $menu.find('.select-active'),
        $options = $menu.find('.select-option'),
        activeText = $selectOption.attr('data-active') || $selectOption.text();

    $options.removeClass('selected');
    $selectOption.addClass('selected');
    $active.text(activeText);
    $menu.removeClass('active');
  };

  COMPONENTS.prototype.selectInit = function(){
    var _this = this;

    // select box
    $(document).on('click', '.select-active', function(){
      _this.selectMenu($(this).closest('.select'));
    });

    // select option
    $(document).on('click', '.select-option', function(){
      _this.select($(this));
    });

    // click away
    $(document).on('click', function(e){

      // select box
      if (!$(e.target).closest('.select').length) {
        _this.selectMenusHide();
      }

    });
  };

  COMPONENTS.prototype.selectMenu = function($selectMenu){
    $selectMenu.addClass('active');
  };

  COMPONENTS.prototype.selectMenusHide = function(){
    $('.select').removeClass('active');
  };

  return COMPONENTS;

})();

// Load app on ready
$(function() {
  var components = new COMPONENTS();
});
