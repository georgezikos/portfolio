export default function MainNav({
    links = [],
    className = "",
    currentPath = "",
}) {
    // Needs to loop through a list of links and output list items
    const defaultLinks = [
        { href: "/information", label: "Information" },
    ];

    const navigationLinks = links.length > 0 ? links : defaultLinks;

    return (
        <ul
            className={`text-link-lg-header text-text-primary *:not-last:mr-nav-gap-half *:not-first:ml-nav-gap-half flex items-center ${className}`}
            data-block="main-nav"
        >
            {navigationLinks.map((link, index) => {
                const isCurrentPage = currentPath === link.href;
                return (
                    <li key={link.href || index} data-element="main-nav__link">
                        <a
                            className="hover:text-link-primary-hover active:text-link-primary-hover focus-visible:text-link-primary-hover no-underline transition-colors duration-200 ease-in-out"
                            href={link.href}
                            aria-current={isCurrentPage ? "page" : undefined}
                        >
                            {link.label}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
