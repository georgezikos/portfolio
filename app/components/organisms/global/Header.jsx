import MainNav from "../../molecules/global/MainNav";
import ThemeToggle from "../../atoms/global/ThemeToggle";

export default function Header({
    navigationLinks = [],
    currentPath = "",
    showNav = true, // Add this prop with default true
    className = "",
    ...rest
}) {
    return (
        <header
            className={`flex w-full justify-between ${className}`}
            data-block="global-header"
            {...rest}
        >
            <div
                className="pr-nav-gap-full sm:gap-x-grid-gutter flex w-full items-center justify-between sm:w-auto sm:pr-[0px]"
                data-element="global-header__nav"
            >
                <div className="sm:w-layout-left">
                    <h1
                        className="text-heading-lg-site-title text-text-primary group w-fit"
                        data-element="global-header__name"
                    >
                        <a
                            href="/"
                            className="group-hover:text-link-primary-hover group-active:text-link-primary-hover focus-visible:text-link-primary-hover no-underline transition-colors duration-200 ease-in-out"
                            aria-label="George Zikos - Portfolio Home"
                        >
                            George Zikos
                        </a>
                    </h1>
                </div>
                {showNav && (
                    <MainNav
                        links={navigationLinks}
                        currentPath={currentPath}
                    />
                )}
            </div>
            <ThemeToggle />
        </header>
    );
}
