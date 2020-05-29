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
    // When you click on one, anything open closes

    // Macro Calculator Project
    $('.list__item--macro').on('mouseover', function() {
        if ($('.projects__macro-calc').hasClass('projects--display') !== true) {
            $('.projects__macro-calc').toggleClass('projects--hide projects--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.projects__macro-calc').hasClass('projects--display') !== true) {
            $('.projects__macro-calc').toggleClass('projects--hover projects--hide').css('z-index', '')
        }
    }).on('click', function() {
        $('.projects__macro-calc').toggleClass('projects--hover projects--display').css('z-index', '');
        if ($('.projects__recipease').hasClass('projects--display') === true) {
            $('.projects__recipease').toggleClass('projects--display projects--hide')
        }
    })

    // Recipease Project
    $('.list__item--recipease').on('mouseover', function() {
        if ($('.projects__recipease').hasClass('projects--display') !== true) {
            $('.projects__recipease').toggleClass('projects--hide projects--hover').css('z-index', '9');
        }
    }).on('mouseout', function() {
        if ($('.projects__recipease').hasClass('projects--display') !== true) {
            $('.projects__recipease').toggleClass('projects--hover projects--hide').css('z-index', '')
        }
    }).on('click', function() {
        $('.projects__recipease').toggleClass('projects--hover projects--display').css('z-index', '');
        if ($('.projects__macro-calc').hasClass('projects--display') === true) {
            $('.projects__macro-calc').toggleClass('projects--display projects--hide')
        }
    })

});

// Cache Selectors
// For selectors that will be used more than once, store them
// const $boxes = $('.box'); – How to cache it
// $boxes.addClass('square'); – How to use it after
// Chain jquery methods
// Select the element and then chain the methods on