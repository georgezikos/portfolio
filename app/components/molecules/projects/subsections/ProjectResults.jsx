import ProjectResult from "../ProjectResult";

export default function ProjectResults({ results = [] }) {
    const fallbackResults = Array.from({ length: 4 }, (_, index) => (
        <ProjectResult key={`fallback-${index}`} />
    ));

    const hasRealData = results.length > 0;

    return (
        <ul
            data-block="project-results"
            className="gap-x-grid-gutter gap-y-project-results-row-gap flex w-full flex-wrap"
            role="list"
            aria-label={
                hasRealData ? "Project results" : "Loading project results"
            }
        >
            {hasRealData
                ? results.map((result, index) => (
                      <ProjectResult
                          key={result.id || result.metric || `result-${index}`}
                          result={result}
                          resultIndex={index}
                          totalResults={results.length}
                      />
                  ))
                : fallbackResults}
        </ul>
    );
}
