import './scss/styles.scss';
import $ from 'jquery';
// import Player from '@vimeo/player';
import ScrollReveal from 'scrollreveal';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-extreme.css';
import Typed from 'typed.js';
import SmoothScroll from 'smooth-scroll';

// * Namespace
const swimCodes = {};

// * Cached Selectors
swimCodes.$body = $('body');

// Breakpoints
swimCodes.mobileBreakpoint = window.matchMedia('(max-width: 768px)');
swimCodes.breakpointListener = (build) => {
    swimCodes.mobileBreakpoint.addListener(build);
};

// Mobile Nav
swimCodes.$nav = $('.header__nav');
swimCodes.$navLinks = $('.nav__links');

// Branding
swimCodes.branding = $('.branding');

// Projects
swimCodes.$macroCalculator = $('.summary--macro-calculator');
swimCodes.$recipease = $('.summary--recipease');
swimCodes.$nosuchthing = $('.summary--nosuchthing');
swimCodes.$fridgeVerses = $('.summary--fridge-verses');
swimCodes.$strainless = $('.summary--strainless');

// Vimeo Players
// swimCodes.macroVideo = document.querySelector('#macroVideo');
// swimCodes.macroPlayer = new Player(swimCodes.macroVideo);

// swimCodes.recipeaseVideo = document.querySelector('#recipeaseVideo');
// swimCodes.recipeasePlayer = new Player(swimCodes.recipeaseVideo);

// swimCodes.fridgeVersesVideo = document.querySelector('#fridgeVersesVideo');
// swimCodes.fridgeVersesPlayer = new Player(swimCodes.fridgeVersesVideo);

// swimCodes.nosuchthingVideo = document.querySelector('#nosuchthingVideo');
// swimCodes.nosuchthingPlayer = new Player(swimCodes.nosuchthingVideo);

// swimCodes.strainlessVideo = document.querySelector('#strainlessVideo');
// swimCodes.strainlessPlayer = new Player(swimCodes.strainlessVideo);

// * Functionality
// Page Loader
swimCodes.loader = () => {
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loader');
        loader.className += ' hidden';
        swimCodes.$body.css({ 'overflow': '' });
        $('header, section, main, footer').removeClass('loader-blur');
        setTimeout(function () { loader.parentNode.removeChild(loader) }, 6000);
    });
};

// Smooth Scroll
swimCodes.smoothScroll = () => {
    new SmoothScroll('a[href*="#"]');
};

// Email Protection
swimCodes.notSoFast = () => {
    $('a.email').on('click', function() {
        const href = $(this).attr('href');
        $(this).attr('href', href.replace('notsofast.', ''))
    });
};

// Tippy
swimCodes.swimDefinition = () => {
    tippy('.branding', {
        theme: 'urban-dictionary',
        allowHTML: true,
        content: `
                <mark class="definition-rank">Top Definition</mark>
                <h5 class="definition-heading">S.W.I.M.</h5>
                <p class="definition">Acronym: Someone Who Isn't Me
                    <span class="line-break">General use indicates that it is indeed the  same person.</span>
                </p>
                <p class="definition-example">S.W.I.M. decided to start coding.</p>
            `,
        arrow: false,
        followCursor: true,
        plugins: [followCursor],
        maxWidth: 400,
        touch: 'hold',
        zIndex: 9998,
        role: 'tooltip',
    });
};

swimCodes.accessibleTooltip = () => {
    tippy('[data-tippy-content]', {
        animation: 'shift-away-extreme',
        arrow: false,
        theme: 'swim',
        touch: ['hold', 300],
        trigger: 'focus',
        zIndex: 9998,
    });
};

// Mobile Touch and Hold
swimCodes.touchHold = () => {
    swimCodes.branding.on('touchstart', function () {
        swimCodes.$body.css({ '-webkit-touch-callout': 'none', 'user-select': 'none', '-webkit-tap-highlight-color': 'transparent' });
        $(document).on('touchend touchcancel touchmove', setTimeout(function () {
            swimCodes.$body.css({ '-webkit-touch-callout': '', 'user-select': '', '-webkit-tap-highlight-color': '' });
        }, 5000));
    });
    $('abbr').on('touchstart', function () {
        swimCodes.$body.css({ '-webkit-touch-callout': 'none', 'user-select': 'none', '-webkit-tap-highlight-color': 'transparent' });
        $(document).on('touchend touchcancel touchmove', setTimeout(function () {
            swimCodes.$body.css({ '-webkit-touch-callout': '', 'user-select': '', '-webkit-tap-highlight-color': '' });
        }, 5000));
    });
};

// Projects
swimCodes.projectEscClose = () => {
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            if (swimCodes.$macroCalculator.hasClass('summary--display') === true) {
                swimCodes.$macroCalculator.toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.macroPlayer.pause();
            } else if (swimCodes.$recipease.hasClass('summary--display') === true) {
                swimCodes.$recipease.toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.recipeasePlayer.pause();
            } else if (swimCodes.$nosuchthing.hasClass('summary--display') === true) {
                swimCodes.$nosuchthing.toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.nosuchthingPlayer.pause();
            } else if (swimCodes.$fridgeVerses.hasClass('summary--display') === true) {
                swimCodes.$fridgeVerses.toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.fridgeVersesPlayer.pause();
            } else if (swimCodes.$strainless.hasClass('summary--display') === true) {
                swimCodes.$strainless.toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.strainlessPlayer.pause();
            }
        }
    });
};

swimCodes.projectCloseButton = () => {
    $('.accessories__close').on('click', function() {
        if (swimCodes.$macroCalculator.hasClass('summary--display') === true) {
            swimCodes.$macroCalculator.toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.macroPlayer.pause();
        } else if (swimCodes.$recipease.hasClass('summary--display') === true) {
            swimCodes.$recipease.toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.recipeasePlayer.pause();
        } else if (swimCodes.$nosuchthing.hasClass('summary--display') === true) {
            swimCodes.$nosuchthing.toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.nosuchthingPlayer.pause();
        } else if (swimCodes.$fridgeVerses.hasClass('summary--display') === true) {
            swimCodes.$fridgeVerses.toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if (swimCodes.$strainless.hasClass('summary--display') === true) {
            swimCodes.$strainless.toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.macroProject = () => {
    $('.list__item--macro-calculator button').on('mouseenter focusin', function () {
        if (swimCodes.$macroCalculator.hasClass('summary--display') !== true) {
            swimCodes.$macroCalculator.removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function () {
        if (swimCodes.$macroCalculator.hasClass('summary--display') !== true) {
            swimCodes.$macroCalculator.removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function () {
        swimCodes.$macroCalculator.toggleClass('summary--hover summary--display').css('z-index', '8');
        
        if (swimCodes.$recipease.hasClass('summary--display') === true) {
            swimCodes.$recipease.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if (swimCodes.$fridgeVerses.hasClass('summary--display') === true) {
            swimCodes.$fridgeVerses.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if (swimCodes.$nosuchthing.hasClass('summary--display') === true) {
            swimCodes.$nosuchthing.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } else if (swimCodes.$strainless.hasClass('summary--display') === true) {
            swimCodes.$strainless.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.recipeaseProject = () => {
    $('.list__item--recipease button').on('mouseenter focusin', function() {
        if (swimCodes.$recipease.hasClass('summary--display') !== true) {
            swimCodes.$recipease.removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if (swimCodes.$recipease.hasClass('summary--display') !== true) {
            swimCodes.$recipease.removeClass('summary--hover').addClass('summary--hide').css('z-index', '9');
        }
    }).on('click', function() {
        swimCodes.$recipease.toggleClass('summary--hover summary--display').css('z-index', '8');
        if (swimCodes.$macroCalculator.hasClass('summary--display') === true) {
            swimCodes.$macroCalculator.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if (swimCodes.$fridgeVerses.hasClass('summary--display') === true) {
            swimCodes.$fridgeVerses.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if (swimCodes.$nosuchthing.hasClass('summary--display') === true) {
            swimCodes.$nosuchthing.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } else if (swimCodes.$strainless.hasClass('summary--display') === true) {
            swimCodes.$strainless.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.fridgeVersesProject = () => {
    $('.list__item--fridge-verses button').on('mouseenter focusin', function() {
        if (swimCodes.$fridgeVerses.hasClass('summary--display') !== true) {
            swimCodes.$fridgeVerses.removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if (swimCodes.$fridgeVerses.hasClass('summary--display') !== true) {
            swimCodes.$fridgeVerses.removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        swimCodes.$fridgeVerses.toggleClass('summary--hover summary--display').css('z-index', '8');
        if (swimCodes.$macroCalculator.hasClass('summary--display') === true) {
            swimCodes.$macroCalculator.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if (swimCodes.$recipease.hasClass('summary--display') === true) {
            swimCodes.$recipease.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if (swimCodes.$nosuchthing.hasClass('summary--display') === true) {
            swimCodes.$nosuchthing.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } else if (swimCodes.$strainless.hasClass('summary--display') === true) {
            swimCodes.$strainless.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.nosuchthingProject = () => {
    $('.list__item--nosuchthing button').on('mouseenter focusin', function() {
        if (swimCodes.$nosuchthing.hasClass('summary--display') !== true) {
            swimCodes.$nosuchthing.removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if (swimCodes.$nosuchthing.hasClass('summary--display') !== true) {
            swimCodes.$nosuchthing.removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        swimCodes.$nosuchthing.toggleClass('summary--hover summary--display').css('z-index', '8');
        if (swimCodes.$macroCalculator.hasClass('summary--display') === true) {
            swimCodes.$macroCalculator.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if (swimCodes.$recipease.hasClass('summary--display') === true) {
            swimCodes.$recipease.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if (swimCodes.$fridgeVerses.hasClass('summary--display') === true) {
            swimCodes.$fridgeVerses.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if (swimCodes.$strainless.hasClass('summary--display') === true) {
            swimCodes.$strainless.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.strainlessProject = () => {
    $('.list__item--strainless button').on('mouseenter focusin', function() {
        if (swimCodes.$strainless.hasClass('summary--display') !== true) {
            swimCodes.$strainless.removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if (swimCodes.$strainless.hasClass('summary--display') !== true) {
            swimCodes.$strainless.removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        swimCodes.$strainless.toggleClass('summary--hover summary--display').css('z-index', '8');
        if (swimCodes.$macroCalculator.hasClass('summary--display') === true) {
            swimCodes.$macroCalculator.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if (swimCodes.$recipease.hasClass('summary--display') === true) {
            swimCodes.$recipease.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if (swimCodes.$fridgeVerses.hasClass('summary--display') === true) {
            swimCodes.$fridgeVerses.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if (swimCodes.$nosuchthing.hasClass('summary--display') === true) {
            swimCodes.$nosuchthing.toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } 
    });
};

// Typed.js
swimCodes.projectsTypedOptions = {
    strings: [
        // Diet Calculator
        `Based on key body measurements and your goal, <span class="typed-highlight--diet-calculator">Diet Calculator</span> will provide you with the appropriate <span class="typed-highlight--diet-calculator">calories and macronutrient ratio for your diet.</span>`,
        // Recipease
        `<span class="typed-highlight--recipease">Recipease</span> is a quiz that will help you <span class="typed-highlight--recipease">find recipes that accommodate your diet</span> preference, food intolerances and caloric restrictions by tapping into the Spoonacular API.`,
        // Fridge Verses
        `<span class="typed-highlight--fridge-verses">Fridge Verses</span> is a single-page app based on <span class="typed-highlight--fridge-verses">fridge magnet poetry.</span> Using the Datamuse API user’s are able to generate random words, drag and drop the words into a poem, and publish their work to our gallery. All made possible with Firebase, React Beautiful DnD and Material UI along with our own offensive-word filter.`,
        // NOSUCHTHING
        `<span class="typed-highlight--nosuchthing">NOSUCHTHING</span> is an open-source experiment in <span class="typed-highlight--nosuchthing">health and wellness education</span> paired with a suite of digital products centered around preventative health and improved wellness. Currently experimenting with the Webflow CMS API.`,
        // Strainless
        `<span class="typed-highlight--strainless">Strainless</span> is a quiz that will help you <span class="typed-highlight--strainless">find the best strain of cannabis based on generally preferred or medicinal properties</span> with the option to purchase from the Ontario Cannabis Store. This project brings together the Strain API, Otreeba API and an open-source Ontario Cannabis Store web scraper.`,
    ],

    typeSpeed: 60,
    shuffle: true,
    backDelay: 5000,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    loop: true,
    loopCount: Infinity,
    cursorChar: ' _',
    contentType: 'html',

};

swimCodes.projectsTyped = (element, options) => {
    new Typed(element, options);
};

// Mobile Nav
swimCodes.mobileNavBuild = (breakpoint) => {
    if (breakpoint.matches) {
        swimCodes.$nav.prepend(`
            <div class="nav__mobile mobile--wordmark">
                <a href="#top" title="Someone Who Isn't Me">swim _</a>
            </div>
            <button class="nav__mobile mobile--hamburger">
                <div class="hamburger__bun bun__top"></div>
                <div class="hamburger__bun bun__bottom"></div>
            </button>
        `);
        // Cache Selectors
        swimCodes.$bunTop = $('.bun__top');
        swimCodes.$bunBottom = $('.bun__bottom');
    } else {
        $('.nav__mobile').remove();
        if (swimCodes.$navLinks.hasClass('nav__links--open') === true) {
            swimCodes.$navLinks.removeClass('nav__links--open');
        }
    }
};

swimCodes.mobileNav = () => {
    swimCodes.$nav.on('click', '.mobile--hamburger', function () {
        swimCodes.$bunTop.toggleClass('bun__top--active');
        swimCodes.$bunBottom.toggleClass('bun__bottom--active');
        swimCodes.$navLinks.toggleClass('nav__links--open');
        $(document).on('scroll touchmove', function() {
            swimCodes.$bunTop.removeClass('bun__top--active');
            swimCodes.$bunBottom.removeClass('bun__bottom--active');
            swimCodes.$navLinks.removeClass('nav__links--open');
        })
    });
};

swimCodes.mobileLinkBehaviour = (breakpoint) => {
    if (breakpoint.matches) {
        $('.main-link a').on('click', function() {
            swimCodes.$bunTop.toggleClass('bun__top--active');
            swimCodes.$bunBottom.toggleClass('bun__bottom--active');
            swimCodes.$navLinks.toggleClass('nav__links--open');
        })
    }
};

swimCodes.mobileMenuTabBehaviour = () => {
    swimCodes.branding.on('focus', function () {
        if (swimCodes.$navLinks.hasClass('nav__links--open') === true) {
            swimCodes.$navLinks.removeClass('nav__links--open');
            swimCodes.$bunTop.removeClass('bun__top--active');
            swimCodes.$bunBottom.removeClass('bun__bottom--active');
        }
    })
};

swimCodes.mobileWordmark = () => {
    $('.mobile--wordmark').on('click', function () {
        if (swimCodes.$bunTop.hasClass('bun__top--active') === true &&
            swimCodes.$bunBottom.hasClass('bun__bottom--active') === true &&
            swimCodes.$navLinks.hasClass('nav__links--open') === true) {
            swimCodes.$bunTop.removeClass('bun__top--active');
            swimCodes.$bunBottom.removeClass('bun__bottom--active');
            swimCodes.$navLinks.removeClass('nav__links--open');
        }
    });
};

// ScrollReveal
swimCodes.scrollReveal = () => {
    ScrollReveal().reveal('.container--right > .main-paragraph', { reset: true });
    ScrollReveal().reveal('.about__video video', { scale: 0.5, reset: true });
    ScrollReveal().reveal('.section--footer .section-container', { reset: true, delay: 150 });
}

// * Init
swimCodes.init = function() {
    swimCodes.loader();
    swimCodes.smoothScroll();
    swimCodes.notSoFast();
    swimCodes.swimDefinition();
    swimCodes.accessibleTooltip();
    swimCodes.touchHold();
    swimCodes.projectEscClose();
    swimCodes.projectCloseButton();
    swimCodes.projectsTyped('#typed', swimCodes.projectsTypedOptions);
    swimCodes.macroProject();
    swimCodes.recipeaseProject();
    swimCodes.fridgeVersesProject();
    swimCodes.nosuchthingProject();
    swimCodes.strainlessProject();
    swimCodes.mobileNavBuild(swimCodes.mobileBreakpoint);
    swimCodes.breakpointListener(swimCodes.mobileNavBuild);
    swimCodes.mobileNav();
    swimCodes.mobileLinkBehaviour(swimCodes.mobileBreakpoint);
    swimCodes.breakpointListener(swimCodes.mobileLinkBehaviour);
    swimCodes.mobileMenuTabBehaviour();
    swimCodes.mobileWordmark();
    swimCodes.scrollReveal();
};

swimCodes.ready = (callback) => {
    if (document.readyState != 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
}

// * Document Ready
swimCodes.ready(() => {
    swimCodes.init();
});