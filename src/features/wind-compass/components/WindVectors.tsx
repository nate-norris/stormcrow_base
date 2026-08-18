import { useAtomValue } from "jotai";

import { compassDataAtom } from "../state/compassAtom";
import { WindVector } from "./WindVector";

interface WindVectorProps {
    radius: number;
}

export function WindVectors({ radius }: WindVectorProps) {
    const compassEvents = useAtomValue(compassDataAtom);

    return (
        <>
            {Object.entries(compassEvents).map(([siteId, compassEvent]) => (
                <WindVector
                    siteId={siteId}
                    event={compassEvent}
                    radius={radius}
                />
            ))}
        </>
    );
}