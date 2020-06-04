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

    // Close Button
    $('.accessories__close').on('click', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '');
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '');
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '');
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '');
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '');
        }
    });

    // Macro Calculator Project    
    $('.list__item--macro-calculator').on('mouseover', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') !== true) {
            $('.summary--macro-calculator').toggleClass('summary--hide summary--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') !== true) {
            $('.summary--macro-calculator').toggleClass('summary--hover summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--macro-calculator').toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index','7')
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true ) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7')
        }
    })

    // Recipease Project
    $('.list__item--recipease').on('mouseover', function() {
        if ($('.summary--recipease').hasClass('summary--display') !== true) {
            $('.summary--recipease').toggleClass('summary--hide summary--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.summary--recipease').hasClass('summary--display') !== true) {
            $('.summary--recipease').toggleClass('summary--hover summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--recipease').toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7')
        }
    })

    // Fridge Verses Project
    $('.list__item--fridge-verses').on('mouseover', function() {
        if ($('.summary--fridge-verses').hasClass('summary--display') !== true) {
            $('.summary--fridge-verses').toggleClass('summary--hide summary--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.summary--fridge-verses').hasClass('summary--display') !== true) {
            $('.summary--fridge-verses').toggleClass('summary--hover summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--fridge-verses').toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7')
        }
    })

    // NST Project
    $('.list__item--nosuchthing').on('mouseover', function() {
        if ($('.summary--nosuchthing').hasClass('summary--display') !== true) {
            $('.summary--nosuchthing').toggleClass('summary--hide summary--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.summary--nosuchthing').hasClass('summary--display') !== true) {
            $('.summary--nosuchthing').toggleClass('summary--hover summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--nosuchthing').toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '7')
        }
    });

    // Strainless Project
    $('.list__item--strainless').on('mouseover', function() {
        if ($('.summary--strainless').hasClass('summary--display') !== true) {
            $('.summary--strainless').toggleClass('summary--hide summary--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.summary--strainless').hasClass('summary--display') !== true) {
            $('.summary--strainless').toggleClass('summary--hover summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $('.summary--strainless').toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '7')
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '7')
        } 
    });

});

// Cache Selectors
// For selectors that will be used more than once, store them
// const $boxes = $('.box'); – How to cache it
// $boxes.addClass('square'); – How to use it after
// Chain jquery methods
// Select the element and then chain the methods on