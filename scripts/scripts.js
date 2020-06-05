// Projects Section Functionality
// User clicks on a list__item from the projects__list
// Div called projects__name slides into the space reserved by container--right
// User clicks 'close' icon or text in top right corner to reverse that action

// If a user clicks on another list__item while one is already open, it will close the open project and reveal the selected listen__item

// If the user scrolls a pre-determined length away from the projects section, any open projects will close

// On mobile, the project doesn't occupy the container--right but actually positions itself over top of the container--left
// Projects can only be closed by navigating away from the project or by selecting close; You won't be able to select another project to close as you could on desktop

// Smooth-Scrolling Functionality
// User clicks on a link in the nav bar and are smooth-scrolled to the corresponding section on the page

// Namespace
// const swimCodes = {};

// Init
// swimCodes.init = function () {
// };

// swimCodes.init();

// Document Ready
$(function () {
    
    // Vimeo
    const $macroVideo = $('#macroVideo');
    const macroPlayer = new Vimeo.Player($macroVideo);

    const $recipeaseVideo = $('#recipeaseVideo');
    const recipeasePlayer = new Vimeo.Player($recipeaseVideo);

    const $fridgeVersesVideo = $('#fridgeVersesVideo');
    const fridgeVersesPlayer = new Vimeo.Player($fridgeVersesVideo);

    const $nosuchthingVideo = $('#nosuchthingVideo');
    const nosuchthingPlayer = new Vimeo.Player($nosuchthingVideo);

    const $strainlessVideo = $('#strainlessVideo');
    const strainlessPlayer = new Vimeo.Player($strainlessVideo);

    // Close Button
    $('.accessories__close').on('click', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '');
            macroPlayer.pause();
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '');
            recipeasePlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '');
            nosuchthingPlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '');
            fridgeVersesPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '');
            strainlessPlayer.pause();
        }
    });
    
    // Macro Calculator Project    
    $('.list__item--macro-calculator').on('mouseenter', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') !== true) {
            $('.summary--macro-calculator').removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') !== true) {
            $('.summary--macro-calculator').removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--macro-calculator').toggleClass('summary--hover summary--display').css('z-index', '8');
        macroPlayer.pause();
        if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index','7');
            recipeasePlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true ) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7');
            fridgeVersesPlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7');
            nosuchthingPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7');
            strainlessPlayer.pause();
        }
    })

    // Recipease Project
    $('.list__item--recipease').on('mouseenter', function() {
        if ($('.summary--recipease').hasClass('summary--display') !== true) {
            $('.summary--recipease').removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($('.summary--recipease').hasClass('summary--display') !== true) {
            $('.summary--recipease').removeClass('summary--hover').addClass('summary--hide').css('z-index', '9');
        }
    }).on('click', function() {
        $('.summary--recipease').toggleClass('summary--hover summary--display').css('z-index', '8');
        recipeasePlayer.pause();
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7');
            macroPlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7');
            fridgeVersesPlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7');
            nosuchthingPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7');
            strainlessPlayer.pause();
        }
    })

    // Fridge Verses Project
    $('.list__item--fridge-verses').on('mouseenter', function() {
        if ($('.summary--fridge-verses').hasClass('summary--display') !== true) {
            $('.summary--fridge-verses').removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($('.summary--fridge-verses').hasClass('summary--display') !== true) {
            $('.summary--fridge-verses').removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--fridge-verses').toggleClass('summary--hover summary--display').css('z-index', '8');
        fridgeVersesPlayer.pause();
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7');
            macroPlayer.pause();
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '7');
            recipeasePlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7');
            nosuchthingPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7');
            strainlessPlayer.pause();
        }
    })

    // NST Project
    $('.list__item--nosuchthing').on('mouseenter', function() {
        if ($('.summary--nosuchthing').hasClass('summary--display') !== true) {
            $('.summary--nosuchthing').removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($('.summary--nosuchthing').hasClass('summary--display') !== true) {
            $('.summary--nosuchthing').removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--nosuchthing').toggleClass('summary--hover summary--display').css('z-index', '8');
        nosuchthingPlayer.pause();
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7');
            macroPlayer.pause();
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '7');
            recipeasePlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7');
            fridgeVersesPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7');
            strainlessPlayer.pause();
        }
    });

    // Strainless Project
    $('.list__item--strainless').on('mouseenter', function() {
        if ($('.summary--strainless').hasClass('summary--display') !== true) {
            $('.summary--strainless').removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($('.summary--strainless').hasClass('summary--display') !== true) {
            $('.summary--strainless').removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--strainless').toggleClass('summary--hover summary--display').css('z-index', '8');
        strainlessPlayer.pause();
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7');
            macroPlayer.pause();
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '7');
            recipeasePlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7');
            fridgeVersesPlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7');
            nosuchthingPlayer.pause();
        } 
    });

});

// Cache Selectors
// For selectors that will be used more than once, store them
// const $boxes = $('.box'); – How to cache it
// $boxes.addClass('square'); – How to use it after
// Chain jquery methods
// Select the element and then chain the methods on