// all the gameplay constants are here

/** Location of the bar */
export const lockedX = 200;

/** How fast the strokes leave. Smaller the number, the slower it goes */
export const drawSpeedMultiplier = 10;

/** Size of player circle if not drawing */
export const circleIdleRadius = 5;

/** Size of player circle if drawing */
export const circleDrawingRadius = 10;

/** how many pixels the strokes will move */
export const deltaX = drawSpeedMultiplier * 0.3;

/** Where the strokes will spawn during the play phase */
export const strokeSpawnX = 1000;