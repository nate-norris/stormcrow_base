import { describe, expect, test } from "vitest";
import { relativeAngle } from "./windCalculations";

describe("relativeAngle", () => {
    test.each([
        // Same direction
        { gun: 0, wind: 0, expected: 0 },
        { gun: 90, wind: 90, expected: 0 },
        { gun: 270, wind: 270, expected: 0 },

        // Simple offsets
        { gun: 0, wind: 90, expected: 90 },
        { gun: 0, wind: 180, expected: 180 },
        { gun: 0, wind: 270, expected: 270 },

        // Gun rotated
        { gun: 45, wind: 90, expected: 45 },
        { gun: 90, wind: 180, expected: 90 },
        { gun: 180, wind: 270, expected: 90 },

        // Crossing north boundary
        { gun: 350, wind: 10, expected: 20 },
        { gun: 355, wind: 5, expected: 10 },
        { gun: 359, wind: 1, expected: 2 },

        // Opposite crossing
        { gun: 10, wind: 350, expected: 340 },
        { gun: 5, wind: 355, expected: 350 },
        { gun: 1, wind: 359, expected: 358 },

        // Full circle
        { gun: 359, wind: 359, expected: 0 },
        { gun: 0, wind: 359.9, expected: 359.9 },
        { gun: 359.9, wind: 0, expected: 0.1 },

    ])(
        "gun=$gun°, wind=$wind° => relative=$expected°",
        ({ gun, wind, expected }) => {
            expect(relativeAngle(gun, wind))
                .toBeCloseTo(expected);
        }
    );
});