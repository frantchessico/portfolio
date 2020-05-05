$(document).ready(function() {
      blackKit.initDatePicker();
      blackKit.initSliders();
    });

    function scrollToDownload() {

      if ($('.section-download').length != 0) {
        $("html, body").animate({
          scrollTop: $('.section-download').offset().top
        }, 1000);
      }


      if ($('.section-download').length != 0) {
        $("html, body").animate({
          scrollTop: $('.section-signup').offset().top
        }, 1000);
      }

      if ($('.section-download').length != 0) {
        $("html, body").animate({
          scrollTop: $('.section-download').offset().top
        }, 1000);
      }
    }




    function scrollToConctact() {

  
        if ($('.section-signup').length != 0) {
          $("html, body").animate({
            scrollTop: $('.section-signup').offset().top
          }, 1000);
        }
  
        
      }



      function scrollToProjects() {

  
        if ($('.section-examples').length != 0) {
          $("html, body").animate({
            scrollTop: $('.section-examples').offset().top
          }, 1000);
        }
  
        
      }



      function scrollToTop() {

  
        if ($('.index-page').length != 0) {
          $("html, body").animate({
            scrollTop: $('.index-page').offset().top
          }, 1000);
        }
  
        
      }

      