import './scss/styles.scss';
import $ from 'jquery';
import Player from '@vimeo/player';
import ScrollReveal from 'scrollreveal';
// import PanelSnap from 'panelsnap'
// import { createPopper } from '@popperjs/core';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-extreme.css';
import Typed from 'typed.js';
import SmoothScroll from 'smooth-scroll';

// * Namespace
const swimCodes = {};

// * Cached Selectors
// Breakpoints
swimCodes.mobileBreakpoint = window.matchMedia('(max-width: 768px)');
swimCodes.breakpointListener = (build) => {
    swimCodes.mobileBreakpoint.addListener(build);
};

// Mobile Nav
swimCodes.nav = $('.header__nav');
swimCodes.navLinks = $('.nav__links');
swimCodes.hamburger = $('.mobile--hamburger');

// Projects
swimCodes.macroCalculator = $('.summary--macro-calculator');
swimCodes.recipease = $('.summary--recipease');
swimCodes.nosuchthing = $('.summary--nosuchthing');
swimCodes.fridgeVerses = $('.summary--fridge-verses');
swimCodes.strainless = $('.summary--strainless');

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
}

// Projects
swimCodes.projectEscClose = () => {
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
                $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.macroPlayer.pause();
            } else if ($('.summary--recipease').hasClass('summary--display') === true) {
                $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.recipeasePlayer.pause();
            } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
                $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.nosuchthingPlayer.pause();
            } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
                $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.fridgeVersesPlayer.pause();
            } else if ($('.summary--strainless').hasClass('summary--display') === true) {
                $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '');
                // swimCodes.strainlessPlayer.pause();
            }
        }
    });
};

swimCodes.projectCloseButton = () => {
    $('.accessories__close').on('click', function() {
        if ($('.summary--macro-calculator').hasClass('summary--display') === true) {
            $('.summary--macro-calculator').toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.macroPlayer.pause();
        } else if ($('.summary--recipease').hasClass('summary--display') === true) {
            $('.summary--recipease').toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.recipeasePlayer.pause();
        } else if ($('.summary--nosuchthing').hasClass('summary--display') === true) {
            $('.summary--nosuchthing').toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.nosuchthingPlayer.pause();
        } else if ($('.summary--fridge-verses').hasClass('summary--display') === true) {
            $('.summary--fridge-verses').toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if ($('.summary--strainless').hasClass('summary--display') === true) {
            $('.summary--strainless').toggleClass('summary--display summary--hide').css('z-index', '');
            // swimCodes.strainlessPlayer.pause();
        }
    });
};

swimCodes.macroProject = () => {
    $('.list__item--macro-calculator').on('mouseenter focusin', function () {
        if ($(swimCodes.macroCalculator).hasClass('summary--display') !== true) {
            $(swimCodes.macroCalculator).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function () {
        if ($(swimCodes.macroCalculator).hasClass('summary--display') !== true) {
            $(swimCodes.macroCalculator).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function () {
        $(swimCodes.macroCalculator).toggleClass('summary--hover summary--display').css('z-index', '8');
        
        if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    }).on('keyup', function(e) {
        if (e.keyCode === 13) {
            $(swimCodes.macroCalculator).toggleClass('summary--hover summary--display').css('z-index', '8');
            if ($(swimCodes.recipease).hasClass('summary--display') === true) {
                $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.recipeasePlayer.pause();
            } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
                $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.fridgeVersesPlayer.pause();
            } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
                $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.nosuchthingPlayer.pause();
            } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
                $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.strainlessPlayer.pause();
            }
        }
    });
};

swimCodes.recipeaseProject = () => {
    $('.list__item--recipease').on('mouseenter focusin', function() {
        if ($(swimCodes.recipease).hasClass('summary--display') !== true) {
            $(swimCodes.recipease).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if ($(swimCodes.recipease).hasClass('summary--display') !== true) {
            $(swimCodes.recipease).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9');
        }
    }).on('click', function() {
        $(swimCodes.recipease).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    }).on('keyup', function (e) {
        if (e.keyCode === 13) {
            $(swimCodes.recipease).toggleClass('summary--hover summary--display').css('z-index', '8');
            if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
                $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.macroPlayer.pause();
            } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
                $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.fridgeVersesPlayer.pause();
            } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
                $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.nosuchthingPlayer.pause();
            } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
                $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.strainlessPlayer.pause();
            }
        };
    });
};

swimCodes.fridgeVersesProject = () => {
    $('.list__item--fridge-verses').on('mouseenter focusin', function() {
        if ($(swimCodes.fridgeVerses).hasClass('summary--display') !== true) {
            $(swimCodes.fridgeVerses).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if ($(swimCodes.fridgeVerses).hasClass('summary--display') !== true) {
            $(swimCodes.fridgeVerses).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $(swimCodes.fridgeVerses).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    }).on('keyup', function (e) {
        if (e.keyCode === 13) {
            $(swimCodes.fridgeVerses).toggleClass('summary--hover summary--display').css('z-index', '8');
            if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
                $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.macroPlayer.pause();
            } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
                $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.recipeasePlayer.pause();
            } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
                $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.nosuchthingPlayer.pause();
            } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
                $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.strainlessPlayer.pause();
            }
        };
    });
};

swimCodes.nosuchthingProject = () => {
    $('.list__item--nosuchthing').on('mouseenter focusin', function() {
        if ($(swimCodes.nosuchthing).hasClass('summary--display') !== true) {
            $(swimCodes.nosuchthing).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if ($(swimCodes.nosuchthing).hasClass('summary--display') !== true) {
            $(swimCodes.nosuchthing).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $(swimCodes.nosuchthing).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
            $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.strainlessPlayer.pause();
        }
    }).on('keyup', function (e) {
        if (e.keyCode === 13) {
            $(swimCodes.nosuchthing).toggleClass('summary--hover summary--display').css('z-index', '8');
            if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
                $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.macroPlayer.pause();
            } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
                $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.recipeasePlayer.pause();
            } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
                $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.fridgeVersesPlayer.pause();
            } else if ($(swimCodes.strainless).hasClass('summary--display') === true) {
                $(swimCodes.strainless).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.strainlessPlayer.pause();
            }
        };
    });
};

swimCodes.strainlessProject = () => {
    $('.list__item--strainless').on('mouseenter focusin', function() {
        if ($(swimCodes.strainless).hasClass('summary--display') !== true) {
            $(swimCodes.strainless).removeClass('summary--hide').addClass('summary--hover').css('z-index', '9');
        }
    }).on('mouseleave focusout', function() {
        if ($(swimCodes.strainless).hasClass('summary--display') !== true) {
            $(swimCodes.strainless).removeClass('summary--hover').addClass('summary--hide').css('z-index', '9')
        }
    }).on('click', function() {
        $(swimCodes.strainless).toggleClass('summary--hover summary--display').css('z-index', '8');
        if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
            $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.macroPlayer.pause();
        } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
            $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.recipeasePlayer.pause();
        } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
            $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.fridgeVersesPlayer.pause();
        } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
            $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
            // swimCodes.nosuchthingPlayer.pause();
        } 
    }).on('keyup', function (e) {
        if (e.keyCode === 13) {
            $(swimCodes.strainless).toggleClass('summary--hover summary--display').css('z-index', '8');
            if ($(swimCodes.macroCalculator).hasClass('summary--display') === true) {
                $(swimCodes.macroCalculator).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.macroPlayer.pause();
            } else if ($(swimCodes.recipease).hasClass('summary--display') === true) {
                $(swimCodes.recipease).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.recipeasePlayer.pause();
            } else if ($(swimCodes.fridgeVerses).hasClass('summary--display') === true) {
                $(swimCodes.fridgeVerses).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.fridgeVersesPlayer.pause();
            } else if ($(swimCodes.nosuchthing).hasClass('summary--display') === true) {
                $(swimCodes.nosuchthing).toggleClass('summary--display summary--hide').css('z-index', '7');
                // swimCodes.nosuchthingPlayer.pause();
            }
        };
    });
};

// Typed.js
swimCodes.projectsTypedOptions = {
    // ^1000 – Add in random stutters for that as many ms
    strings: [
        // Diet Calculator
        `Based on key body measurements and your goal, <span class="typed-highlight--diet-calculator">Diet Calculator</span> will provide you with the appropriate <span class="typed-highlight--diet-calculator">calories and macronutrient ratio</span> for your diet.`,
        // Recipease
        `<span class="typed-highlight--recipease">Recipease</span> is a quiz that will help you find recipes that accommodate your dietary preference, intolerances and caloric restrictions by tapping into the <span class="typed-highlight--recipease">Spoonacular API.</span>`,
        // Fridge Verses
        `<span class="typed-highlight--fridge-verses">Fridge Verses</span> is a single-page app based on fridge magnet poetry. Using the Datamuse API user’s are able to generate random words, drag and drop the words into a poem, and publish their work to our gallery. All made possible with Firebase, React Beautiful DnD and Material UI along with our own offensive-word filter.`,
        // NOSUCHTHING
        `<span class="typed-highlight--nosuchthing">NOSUCHTHING</span> is an open-source experiment in health and wellness education paired with a suite of digital products centered around preventative health and improved wellness. Currently experimenting with the Webflow CMS API.`,
        // Strainless
        `<span class="typed-highlight--strainless">Strainless</span> is a quiz that will direct you towards the best strain of cannabis based on generally preferred or medicinal properties with the option to purchase from the Ontario Cannabis Store. This project brings together the Strain API, Otreeba API and an open-source Ontario Cannabis Store web scraper.`,
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
        swimCodes.nav.prepend(`
                <div class="nav__mobile mobile--wordmark">
                    <a href="#top">swim _</a>
                </div>
                <button class="nav__mobile mobile--hamburger">
                    <div class="hamburger__bun bun__top"></div>
                    <div class="hamburger__bun bun__bottom"></div>
                </button>
            `);
    } else {
        $('.nav__mobile').remove();
        if (swimCodes.navLinks.hasClass('nav__links--open') === true) {
            swimCodes.navLinks.removeClass('nav__links--open');
        }
    }
};

swimCodes.mobileNav = () => {
    swimCodes.nav.on('click', '.mobile--hamburger', function () {
        $('.bun__top').toggleClass('bun__top--active');
        $('.bun__bottom').toggleClass('bun__bottom--active');
        swimCodes.navLinks.toggleClass('nav__links--open');
        $(document).on('scroll touchmove', function() {
            $('.bun__top').removeClass('bun__top--active');
            $('.bun__bottom').removeClass('bun__bottom--active');
            swimCodes.navLinks.removeClass('nav__links--open');
        })
    });
};

// Clean this up
swimCodes.mobileLinkBehaviour  = (breakpoint) => {
    if (breakpoint.matches) {
        $('.main-link a').on('click', function() {
            $('.bun__top').toggleClass('bun__top--active');
            $('.bun__bottom').toggleClass('bun__bottom--active');
            swimCodes.navLinks.toggleClass('nav__links--open');
        })
    }
}


// * Init
swimCodes.init = function() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        loader.className += ' hidden';
        $('body').css({ 'overflow': '' });
        $('header, section, main, footer').removeClass('loader-blur');
        setTimeout(function() { loader.parentNode.removeChild(loader) }, 6000);
    });

    const smoothScroll = new SmoothScroll('a[href*="#"]');
    
    swimCodes.projectEscClose();
    swimCodes.projectCloseButton();
    swimCodes.swimDefinition();
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

    // TODO Move into Namespace
    // * ScrollReveal Related
    ScrollReveal().reveal('.container--right > .main-paragraph', { reset: true })
    ScrollReveal().reveal('.about__video video', { reset: true });
    ScrollReveal().reveal('.section--footer .section-container', { reset: true });

    $('.branding, abbr').on('touchstart', function() {
        $('body').css({'-webkit-touch-callout': 'none', 'user-select': 'none', '-webkit-tap-highlight-color': 'transparent' });
        $(document).on('touchend touchcancel touchmove', setTimeout(function() {
            $('body').css({ '-webkit-touch-callout': '', 'user-select': '', '-webkit-tap-highlight-color': '' });
        }, 5000));
    })

    $('.mobile--wordmark').on('click', function() {
        if ($('.bun__top').hasClass('bun__top--active') === true && 
            $('.bun__bottom').hasClass('bun__bottom--active') === true && 
            swimCodes.navLinks.hasClass('nav__links--open') === true) {
                $('.bun__top').removeClass('bun__top--active');
                $('.bun__bottom').removeClass('bun__bottom--active');
                swimCodes.navLinks.removeClass('nav__links--open');
            }
    });

    $('a.email').on('click', function() {
        const href = $(this).attr('href');
        $(this).attr('href', href.replace('notsofast.', ''))
    })

    tippy('[data-tippy-content]', {
        animation: 'shift-away-extreme',
        arrow: false,
        theme: 'swim',
        touch: ['hold', 300],
        trigger: 'focus',
        zIndex: 9998,
    });

    $('.branding').on('focus', function() {
        if (swimCodes.navLinks.hasClass('nav__links--open') === true) {
            swimCodes.navLinks.removeClass('nav__links--open');
            $('.bun__top').removeClass('bun__top--active');
            $('.bun__bottom').removeClass('bun__bottom--active');
        }
    })
};

// * Document Ready
$(function () {
    swimCodes.init();
});


// Smooth-Scrolling Functionality
// User clicks on a link in the nav bar and are smooth-scrolled to the corresponding section on the page