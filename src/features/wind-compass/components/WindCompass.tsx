import { CompassCardinals } from "./CompassCardinals";
import { MA5B } from "./MA5B";
import { CompassTicks } from "./CompassTicks";
import { WindThresholdRing } from "./WindThresholdRing";
import { WindVectors } from "./WindVectors";

const INNER_RADIUS = 86;

export function WindCompass() {

    return (
        <div className="w-full aspect-square">
            <svg
                width="400"
                height="400"
                viewBox="0 0 200 200" 
                className="w-full h-full text-secondary-foreground"
            >
                {/* outer compass ring */}
                <circle
                    cx={100}
                    cy={100}
                    r={99}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                />
                {/* inner compass ring */}
                <circle
                    cx={100}
                    cy={100}
                    r={INNER_RADIUS}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={0.5}
                />
                <CompassTicks radius={INNER_RADIUS} />
                {/* rifle orientation: always up */}
                <MA5B />
                {/* center point */}
                <circle
                    cx={100}
                    cy={100}
                    r={3}
                    fill="currentColor"
                />
                {/* Cardinal directions */}
                <CompassCardinals />
                {/* threshold visual indicator */}
                <WindThresholdRing radius={INNER_RADIUS} />
                <WindVectors radius={INNER_RADIUS} />
            </svg>
        </div>
    );
}