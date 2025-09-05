export default function ProjectResult({
    className = "",
    result = null,
    resultIndex = null, // Add index for context
    totalResults = null, // Add total for context
    fallbackResult = {
        metric: "Improved Metric",
        improvement: "How did this metric improve?",
    },
}) {
    const resultData = result || fallbackResult;
    const { metric, improvement } = resultData;

    if (!metric && !improvement) {
        return null;
    }

    return (
        <li
            data-block="project-result"
            className={`gap-y-project-result-gap mdlg:w-flex-33 xl:w-flex-25 sm:w-flex-50 flex w-full list-none flex-col ${className}`}
            // Only add these attributes if there are multiple items
            aria-setsize={totalResults > 1 ? totalResults : undefined}
            aria-posinset={totalResults > 1 ? resultIndex + 1 : undefined}
        >
            <h5
                data-element="project-result__heading"
                className="text-heading-lg-project-result text-text-primary"
            >
                {metric}
            </h5>

            <p
                data-element="project-result__body"
                className="text-text-secondary text-body-base-project-result"
            >
                {improvement}
            </p>
        </li>
    );
}
