import './scss/styles.scss';
import $ from 'jquery';
import Player from '@vimeo/player';
import ScrollReveal from 'scrollreveal';
import PanelSnap from 'panelsnap'
// import { createPopper } from '@popperjs/core';
// import tippy from 'tippy.js';

const swimCodes = {};

// PanelSnap
swimCodes.panelSnap = new PanelSnap({
    container: document.body,
    panelSelector: '> .section',
    directionThreshold: 50,
    delay: 0,
    duration: 300,
    easing: function(t) { return t },
});

// Project Selectors
swimCodes.macroCalculator = $('.summary--macro-calculator');
swimCodes.recipease = $('.summary--recipease');
swimCodes.nosuchthing = $('.summary--nosuchthing');
swimCodes.fridgeVerses = $('.summary--fridge-verses');
swimCodes.strainless = $('.summary--strainless');

// Vimeo Related
swimCodes.macroVideo = document.querySelector('#macroVideo');
swimCodes.macroPlayer = new Player(swimCodes.macroVideo);

swimCodes.recipeaseVideo = document.querySelector('#recipeaseVideo');
swimCodes.recipeasePlayer = new Player(swimCodes.recipeaseVideo);

swimCodes.fridgeVersesVideo = document.querySelector('#fridgeVersesVideo');
swimCodes.fridgeVersesPlayer = new Player(swimCodes.fridgeVersesVideo);

swimCodes.nosuchthingVideo = document.querySelector('#nosuchthingVideo');
swimCodes.nosuchthingPlayer = new Player(swimCodes.nosuchthingVideo);

swimCodes.strainlessVideo = document.querySelector('#strainlessVideo');
swimCodes.strainlessPlayer = new Player(swimCodes.strainlessVideo);

swimCodes.escProject = () => {
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
                $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '');
                swimCodes.macroPlayer.pause();
            } else if ($('.summary--recipease').hasClass('summary--display') === true) {
                $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '');
                swimCodes.recipeasePlayer.pause();
            } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
                $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '');
                swimCodes.nosuchthingPlayer.pause();
            } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
                $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '');
                swimCodes.fridgeVersesPlayer.pause();
            } else if ($('.summary--strainless').hasClass('summary--display') === true) {
                $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '');
                swimCodes.strainlessPlayer.pause();
            }
        }
    });
};

swimCodes.closeButton = () => {
    $('.accessories__close').on('click', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '');
            swimCodes.macroPlayer.pause();
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '');
            swimCodes.recipeasePlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '');
            swimCodes.nosuchthingPlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '');
            swimCodes.fridgeVersesPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '');
            swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.macroFunction = () => {
    $('.list__item--macro-calculator').on('mouseenter', function () {
        if ($(swimCodes.macroCalculator).hasClass('summary--display') !== true) {
            $(swimCodes.macroCalculator).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function () {
        if ($(swimCodes.macroCalculator).hasClass('summary--display') !== true) {
            $(swimCodes.macroCalculator).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function () {
        $(swimCodes.macroCalculator).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.nosuchthingPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.recipeaseFunction = () => {
    $('.list__item--recipease').on('mouseenter', function() {
        if ($(swimCodes.recipease).hasClass('summary--display') !== true) {
            $(swimCodes.recipease).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($(swimCodes.recipease).hasClass('summary--display') !== true) {
            $(swimCodes.recipease).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9');
        }
    }).on('click', function() {
        $(swimCodes.recipease).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.nosuchthingPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.fridgeVersesFunction = () => {
    $('.list__item--fridge-verses').on('mouseenter', function() {
        if ($(swimCodes.fridgeVerses).hasClass('summary--display') !== true) {
            $(swimCodes.fridgeVerses).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($(swimCodes.fridgeVerses).hasClass('summary--display') !== true) {
            $(swimCodes.fridgeVerses).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $(swimCodes.fridgeVerses).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.nosuchthingPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.nosuchthingFunction = () => {
    $('.list__item--nosuchthing').on('mouseenter', function() {
        if ($(swimCodes.nosuchthing).hasClass('summary--display') !== true) {
            $(swimCodes.nosuchthing).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($(swimCodes.nosuchthing).hasClass('summary--display') !== true) {
            $(swimCodes.nosuchthing).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $(swimCodes.nosuchthing).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.strainlessFunction = () => {
    $('.list__item--strainless').on('mouseenter', function() {
        if ($(swimCodes.strainless).hasClass('summary--display') !== true) {
            $(swimCodes.strainless).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave', function() {
        if ($(swimCodes.strainless).hasClass('summary--display') !== true) {
            $(swimCodes.strainless).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $(swimCodes.strainless).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            swimCodes.nosuchthingPlayer.pause();
        } 
    });
};

swimCodes.init = function() {
    swimCodes.escProject();
    swimCodes.closeButton();
    swimCodes.macroFunction();
    swimCodes.recipeaseFunction();
    swimCodes.fridgeVersesFunction();
    swimCodes.nosuchthingFunction();
    swimCodes.strainlessFunction();
    // Turn into a function higher up
    ScrollReveal().reveal('.container;--right .main-paragraph', { reset: true })
    ScrollReveal().reveal('.about__video', { reset: true });
};

// Document Ready
$(function () {
    swimCodes.init();
});

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

// Init
// swimCodes.init = function () {
    // };