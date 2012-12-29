(function() {
  var richistron;
  richistron = {
    init: function() {
      return this.setListeners();
    },
    setListeners: function() {
      $('#secciones a.accordionBtnA').click(this.mainNav);
      $('a.modalBtn').click(this.modalNav);
      return $('#secciones a.accordionBtnA').click(richistron.loadContent);
    },
    loadContent: function() {
      var tabID;
      tabID = $(this).attr('href');
      $.loadRss(tabID);
      return $(this).unbind('click', richistron.loadContent);
    },
    mainNav: function(e) {
      var id;
      id = $(this).attr('href');
      $($(this).data('parent') + ' .collapse.in').collapse('hide');
      $(id).collapse('show');
      return $('html, body').animate({
        scrollTop: $(id).offset().top
      }, 600);
    },
    modalNav: function(e) {
      $($(this).data('parent') + ' .collapse.in').collapse('hide');
      $($(this).attr('href')).collapse('show');
      return $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 600);
    }
  };
  $(document).ready(function() {
    return richistron.init();
  });
}).call(this);
