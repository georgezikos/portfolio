export default function Body({ content = "", className = "", multiClassName = "" }) {
    let paragraphs = [];

    if (typeof content === "string") {
        paragraphs = content
            .split(/\n\s*\n|\r\n\s*\r\n/)
            .filter((p) => p.trim().length > 0)
            .map((p) => p.trim());
    } else if (Array.isArray(content)) {
        // Handle both string arrays and JSX element arrays
        paragraphs = content.filter((p) => {
            if (typeof p === "string") {
                return p.trim().length > 0;
            }
            // For JSX elements, just include them
            return p != null;
        });
    }

    if (paragraphs.length === 0) {
        paragraphs = [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sollicitudin, massa vitae molestie interdum, purus neque blandit libero, quis egestas velit dolor sed ipsum. Suspendisse potenti. Nunc placerat at lorem vel lacinia. Praesent vehicula nunc a justo dictum, sit amet rhoncus erat vehicula. Vivamus posuere ante vitae nisl feugiat tempus. Donec scelerisque orci tincidunt, egestas risus ut, facilisis mauris. Integer congue felis dignissim, ultricies odio a, feugiat quam. Morbi quis augue in nibh sollicitudin luctus sit amet vel neque. Integer a tempus justo. Integer ut venenatis nibh. Phasellus cursus mi sem, vitae fermentum sapien tincidunt vitae. Integer eget diam sit amet arcu aliquet volutpat vitae dignissim enim. Vivamus orci ante, dignissim et velit ut, posuere gravida felis. In sodales eget libero vel ultricies. Morbi commodo pharetra viverra.`,
            `Nulla hendrerit vel eros nec pretium. Donec sodales id nulla in scelerisque. Sed ipsum velit, varius id aliquam vitae, faucibus sit amet odio. Proin cursus urna sed efficitur gravida. Nulla sit amet risus in purus tincidunt placerat. Vivamus eu porttitor ligula. Quisque vel pharetra velit. Suspendisse non euismod urna, quis euismod felis. Suspendisse aliquam elit nisi, eget interdum libero ullamcorper vel. Curabitur ut metus nisl. Donec pulvinar auctor nulla non luctus.`,
        ];
    }

    const isMulti = paragraphs.length > 1;

    if (isMulti) {
        // Use custom multiClassName if provided, otherwise use default spacing
        const multiSpacing = multiClassName || "*:not-last:mb-main-paragraph-sp-half *:not-first:mt-main-paragraph-sp-half";
        
        return (
            <div
                data-block="section-content-body"
                data-modifier="section-content-body--multi"
                className={`text-text-secondary ${multiSpacing} flex flex-col ${className}`}
            >
                {paragraphs.map((paragraph, index) => (
                    <p
                        key={index}
                        data-element="section-content-body__paragraph"
                        className="text-body-lg-main [&_a]:no-underline"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        );
    }

    return (
        <p
            data-element="section-content-body__paragraph"
            className={`text-body-lg-main text-text-secondary ${className}`}
        >
            {paragraphs[0]}
        </p>
    );
}
