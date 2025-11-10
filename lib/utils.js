// Client-safe utility functions

// Helper to map Contentful aspect ratio strings to Tailwind classes
export function getAspectRatioClass(aspectRatio) {
    const ratioMap = {
        "Cinema 1.85": "aspect-[1.85/1]",
        "Anamorphic 2.39": "aspect-[2.39/1]",
        "US Letter": "aspect-[8.5/11]",
        "ISO/A4": "aspect-[1/1.414]",
        Golden: "aspect-[1.618/1]",
        "√3": "aspect-[1.732/1]",
        "√5": "aspect-[2.236/1]",
        Silver: "aspect-[1.414/1]",
        "Golden Portrait": "aspect-[1/1.618]",
        Square: "aspect-square",
        "21:9": "aspect-[21/9]",
        "2:1": "aspect-[2/1]",
        "3:1": "aspect-[3/1]",
        "Instagram 4:5": "aspect-[4/5]",
        "9:16": "aspect-[9/16]",
        "2:3": "aspect-[2/3]",
        "7:5": "aspect-[7/5]",
        "5:4": "aspect-[5/4]",
        "3:2": "aspect-[3/2]",
        "16:9": "aspect-[16/9]",
        "4:3": "aspect-[4/3]",
    };

    return ratioMap[aspectRatio] || "aspect-[16/9]"; // Default fallback
}
