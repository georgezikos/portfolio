import Preview from "../../molecules/projects/Preview";
import Meta from "./Meta";
import Link from "next/link";

export default function FeaturedProject({
    // Project data props
    client = "Client",
    title = "Project title/description",
    tags = [],
    media = [],
    href, // Add back the href prop

    // Component configuration
    className = "",
    ...rest
}) {
    // Define the main styling classes
    const mainClasses = `gap-y-featured-project-gap md:pb-featured-project-pb md:border-border-secondary flex w-full flex-col md:flex-row-reverse md:items-center md:justify-between md:border-b-(length:--border-width-thin) md:border-solid md:gap-x-featured-project-gap ${className}`;

    return (
        <li
            className={href ? "list-none" : `list-none ${mainClasses}`} // Minimal styling when linked
            data-block="featured-project"
            {...rest}
        >
            {href ? (
                <Link 
                    href={href} 
                    className={`${mainClasses} no-underline`} // Apply all styling to Link
                >
                    <Preview media={media} aria-label={`${title} project preview`} />
                    <Meta
                        client={client}
                        title={title}
                        tags={tags}
                        className="mdlg:flex-row mdlg:items-baseline mdlg:gap-x-projects-meta-col-gap"
                        as="div"
                    />
                </Link>
            ) : (
                <>
                    <Preview media={media} aria-label={`${title} project preview`} />
                    <Meta
                        client={client}
                        title={title}
                        tags={tags}
                        className="mdlg:flex-row mdlg:items-baseline mdlg:gap-x-projects-meta-col-gap"
                        as="div"
                    />
                </>
            )}
        </li>
    );
}
