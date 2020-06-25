import './scss/styles.scss';
import $ from 'jquery';
import Player from '@vimeo/player';
import ScrollReveal from 'scrollreveal';
// import PanelSnap from 'panelsnap'
// import { createPopper } from '@popperjs/core';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Matter from 'matter-js';

// * Namespace
const swimCodes = {};

// * Cached Selectors
// Breakpoints
swimCodes.mobileBreakpoint = window.matchMedia('(max-width: 768px)');

// Mobile Nav
swimCodes.nav = $('.header__nav');
swimCodes.navLinks = $('.nav__links');

// Projects
swimCodes.macroCalculator = $('.summary--macro-calculator');
swimCodes.recipease = $('.summary--recipease');
swimCodes.nosuchthing = $('.summary--nosuchthing');
swimCodes.fridgeVerses = $('.summary--fridge-verses');
swimCodes.strainless = $('.summary--strainless');

// Vimeo Players
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

// * Functionality
// Projects
swimCodes.projectEscClose = () => {
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

swimCodes.projectCloseButton = () => {
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

swimCodes.macroProject = () => {
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

swimCodes.recipeaseProject = () => {
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

swimCodes.fridgeVersesProject = () => {
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

swimCodes.nosuchthingProject = () => {
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

swimCodes.strainlessProject = () => {
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

// Mobile Nav
swimCodes.mobileNavBuild = (breakpoint) => {
    if (breakpoint.matches) {
        swimCodes.nav.prepend(`
                <div class="nav__mobile mobile--wordmark">
                    <a href="">SWIM</a>
                </div>
                <div class="nav__mobile mobile--hamburger">
                    <div class="hamburger__bun bun__top"></div>
                    <div class="hamburger__bun bun__bottom"></div>
                </div>
            `);
    } else {
        $('.nav__mobile').remove();
        if (swimCodes.navLinks.hasClass('nav__links--open') === true) {
            swimCodes.navLinks.removeClass('nav__links--open');
        }
    }
};

swimCodes.breakpointListener = (build) => {
    swimCodes.mobileBreakpoint.addListener(build);
};

swimCodes.mobileNav = () => {
    swimCodes.nav.on('click', '.mobile--hamburger', function () {
        $('.bun__top').toggleClass('bun__top--active');
        $('.bun__bottom').toggleClass('bun__bottom--active');
        swimCodes.navLinks.toggleClass('nav__links--open');
    });
};

// * Init
swimCodes.init = function() {
    swimCodes.projectEscClose();
    swimCodes.projectCloseButton();
    swimCodes.macroProject();
    swimCodes.recipeaseProject();
    swimCodes.fridgeVersesProject();
    swimCodes.nosuchthingProject();
    swimCodes.strainlessProject();
    swimCodes.mobileNavBuild(swimCodes.mobileBreakpoint);
    swimCodes.breakpointListener(swimCodes.mobileNavBuild);
    swimCodes.mobileNav();

    // TODO Move into Namespace
    // * ScrollReveal Related
    ScrollReveal().reveal('.container;--right .main-paragraph', { reset: true })
    ScrollReveal().reveal('.about__video', { reset: true });

    // * Tippy Related
    // Add in ARIA later
    const instance = tippy('.branding', {
        theme: 'urban-dictionary',
        allowHTML: true,
        // Add acronym best practices below
        // Prevent user-select on header and branding images
        content: `
            <p class="definition-rank">Top Definition</p>
            <h5 class="definition-heading">S.W.I.M.</h5>
            <p class="definition">Acronym: Someone Who Isn't Me
                <span class="line-break">General use indicates that it is indeed the  same person.</span>
            </p>
            <p class="definition-example">S.W.I.M. decided to start coding.</p>
        `,
        arrow: false,
        followCursor: true,
        plugins: [followCursor],
        maxWidth: 300,
        touch: true,
    });

    // $(document).on('touchstart', () => {
    //     $('#tippy-1').trigger('touch');
    // })

    // * Matter.JS
    // Aliases
    const { Engine, Render, Bodies, World, MouseConstraint, Composites } = Matter;

    // Where it will render
    const skillsSection = document.querySelector('.skills__shapes');
    const skillsCanvas = document.querySelector('.shapes__canvas');
    
    const sectionWidth = $(skillsSection).width();
    const sectionHeight = $(skillsSection).height();
    
    const skillsCanvasHeight = $(skillsCanvas).height(sectionHeight);
    const skillsCanvasWidth = $(skillsCanvas).width(sectionWidth);
    
    $(window).on('resize', function() {
        const sectionWidth = $(skillsSection).width();
        const sectionHeight = $(skillsSection).height();
        const skillsCanvasHeight = $(skillsCanvas).height(sectionHeight);
        const skillsCanvasWidth = $(skillsCanvas).width(sectionWidth);
    })

    // Image Loader
    const loadImage = (path, onSuccess, onError) => {
        const img = new Image();
        img.onload = () => {
            onSuccess(img.src);
        };
        img.onerror = onError();
        img.src = path;
    };


    // Engine – computation and math
    // Renderer – draws the result of the engine
    const engine = Engine.create();
    const render = Render.create({
        // element: skillsSection,
        canvas: skillsCanvas, 
        engine: engine,
        options: {
            height: sectionHeight,
            width: sectionWidth,
            background: '#161616',
            // background: '#fff',
            wireframes: false,
            pixelRatio: window.devicePixelRatio,
        }
    });

    // Create Shapes
    loadImage(
        '/Users/georgezikos/development/projects/web/personal/portfolio/src/assets/skills-icons--sketch.png', 
        url => {
            console.log('Success');
            const createShape = (x, y) => {
                return Bodies.circle(x, y, 20 + 20 * Math.random(), {
                    render: {
                        // fillStyle: 'red',
                        sprite: {
                            texture: '/Users/georgezikos/development/projects/web/personal/portfolio/src/assets/skills-icons--sketch.png'
                        }
                    }
                })
            }

            const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, (x, y) => {
                return createShape(x, y);
            })

            World.add(engine.world, [
                floor,
                ceiling,
                leftWall,
                rightWall,
                mouseControl,
                initialShapes
            ])
        },
        () => {
            console.log('Error');
        }
    );

    const wallOptions = {
        isStatic: true,
        render: {
            visible: false,
        }
    }

    const floor = Bodies.rectangle(sectionWidth / 2, sectionHeight + 50, sectionWidth + 100, 100,wallOptions);
    const ceiling = Bodies.rectangle(sectionWidth / 2, -50, sectionWidth + 100, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, sectionHeight / 2, 100, sectionHeight + 100, wallOptions);
    const rightWall = Bodies.rectangle(sectionWidth + 50, sectionHeight / 2, 100, sectionHeight + 100, wallOptions);

    const mouseControl = MouseConstraint.create(engine, {
        element: skillsCanvas,
        constraint: {
            render: {
                visible: false,
            }
        }
    })

    mouseControl.mouse.element.removeEventListener("mousewheel", mouseControl.mouse.mousewheel);
    mouseControl.mouse.element.removeEventListener("DOMMouseScroll", mouseControl.mouse.mousewheel);

    

    // Run the engine and the renderer
    Engine.run(engine);
    Render.run(render);
};

// * Document Ready
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