import MainNav from "../../molecules/global/MainNav";
import ThemeToggle from "../../atoms/global/ThemeToggle";

export default function Header({
    navigationLinks = [],
    currentPath = "",
    className = "",
    ...rest // Capture all other props
}) {
    return (
        <header
            className={`flex w-full justify-between ${className}`}
            data-block="global-header"
            {...rest} // Spread additional props to the header element
        >
            <div
                className="pr-nav-gap-full sm:gap-x-grid-gutter flex w-full items-center justify-between sm:w-auto sm:pr-[0px]"
                data-element="global-header__nav"
            >
                <h1
                    className="text-heading-lg-site-title text-text-primary sm:w-layout-left"
                    data-element="global-header__name"
                >
                    <a
                        href="/"
                        className="no-underline"
                        aria-label="George Zikos - Portfolio Home"
                    >
                        George Zikos
                    </a>
                </h1>
                <MainNav links={navigationLinks} currentPath={currentPath} />
            </div>
            <ThemeToggle />
        </header>
    );
}
