$(document).ready(function(){

    // sidebar
  $('.navbar-toggler').click(function() {
    $('.sidebar').toggleClass('sidebar-width');
    $('.close-overlay').addClass('open-overlay');
})

$('.close-side').click(function() {
    $('.sidebar').removeClass('sidebar-width');
    $('.close-overlay').removeClass('open-overlay');
    jQuery('.site-search').removeClass('open');
})
$('.close-overlay').click(function() {
    $('.sidebar').removeClass('sidebar-width');
    $(this).removeClass('open-overlay')
})
$('.mynavbar .nav-link').click(function() {
    $('.mynavbar .nav-link').removeClass('active')   
    $(this).addClass('active');
   
})



//  nice select
$('select').niceSelect();
// ////////////////

// animation
wow = new WOW();
wow.init();

$('.sidebar .nav-item').click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $('.sidebar .nav-item').removeClass('active');
        $(this).addClass('active');
    }
});
// Search

jQuery('.btnSearch').click(function() {
  jQuery('.site-search').addClass('open');
})

jQuery('.site-search-close').click(function() {
  jQuery('.site-search').removeClass('open');
}).children().click(function(e) {
  //	return false;
});

// home slider
    $('.slider-home').owlCarousel({
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        URLhashListener: true,
        startPosition: 'URLHash',
        nav: false,
        autoHeight: true,
        video: true,
        navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"],
        autoplay: true,
        loop: true,
        autoplayTimeout: 5000
    });



   



  
/*********************************************************************** */
    
// sponser-slider
$('.sponser-slider').owlCarousel({
    
    loop:true,
    margin:10,
    navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"],
    nav:false,
    dots:true,
    // autoplay:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:1
        },
        1000:{
            items:4
        }
    }
})

// -----------------------------------------------------
 // card-slider
$('.card-slider').owlCarousel({
    loop:true,
    margin:20,
    navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
    nav:true,
    dots:false,
    // autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    }
})
 


// -----------------------------------------------------------
// gallary-slider
$('.gallary-slider').owlCarousel({
    loop:true,
    margin:10,
    navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"],
    nav:true,
    dots:false,
    // autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
})

// ----------------------------------------------------
      // FancyBox
$('[data-fancybox="gallary2"]').fancybox();

// ------------------------------------------------------

// for upload file
$(document).on('change', ':file', function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });
  $(':file').on('fileselect', function (event, numFiles, label) {
    var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;
    if (input.length) {
        input.val(log);
    } else {
        //            if (log) alert(log);
    }
  });
  $('.form-control').focus(function () {
    $(this).parents('.form-group').addClass('focused');
  });
  $('.form-control').blur(function () {
    var inputValue = $(this).val();
    if (inputValue == "") {
        $(this).removeClass('filled');
        $(this).parents('.form-group').removeClass('focused');
    } else {
        $(this).addClass('filled');
    }
  });
  $(document).on('change', '.btn-file :file', function () {
    var fileName = $('#uploadfile').val();
    $('.filename').val(fileName);
  });

//   -------------------------------------------------------- ------------------------ 
// -------------------------- owl carousel thumb -------------------------------  

var bigimage = $("#big_image");
var thumbs = $("#thumbs_gallary");
var syncedSecondary = true;

bigimage
    .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: true,
        dots: false,
        loop: true,
        slideBy:1,
        responsiveRefreshRate: 200,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    })
    .on("changed.owl.carousel", syncPosition);

thumbs
    .on("initialized.owl.carousel", function() {
        thumbs
            .find(".owl-item")
            .eq(0)
            .addClass("current");
    })
    .owlCarousel({
        items: 5,
        dots: false,
       margin:15,
        nav: false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 1,
        responsiveRefreshRate: 100,
        // autoplay:true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }

       
    })
    .on("changed.owl.carousel", syncPosition2);

function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    //var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
        current = count;
    }
    if (current > count) {
        current = 0;
    }
    //to this
    thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
    var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

    if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
}

function syncPosition2(el) {
    if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
    }
}

thumbs.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
});



});
/*********************************************************************** */
