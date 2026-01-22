export default function sitemap() {
    return [
        {
            url: "https://george-zikos.com",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: "https://george-zikos.com/information",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}

