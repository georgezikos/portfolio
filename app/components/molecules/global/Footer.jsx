export default function Footer({
    contact = "info@george-zikos.com",
    className = "",
    ...rest // Capture all other props
}) {
    const startingYear = "2020";
    const currentYear = new Date().getFullYear();

    return (
        <footer
            data-block="footer"
            className={`text-text-secondary flex w-full justify-between ${className}`}
            {...rest} // Spread additional props to the footer element
        >
            <p
                className="text-caption-sm-footer tabular-nums"
                data-element="footer__text"
            >
                © {startingYear}–{currentYear}
            </p>
            <a
                className="text-caption-sm-footer hover:text-link-secondary-hover active:text-link-secondary-hover focus-visible:text-link-secondary-hover text-right no-underline transition-colors duration-200 ease-in-out"
                data-element="footer__text"
                href={`mailto:${contact}`}
                aria-label={`Send email to ${contact}`}
            >
                {contact}
            </a>
        </footer>
    );
}
