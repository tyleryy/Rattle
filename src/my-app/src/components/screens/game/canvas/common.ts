import { Coordinate } from './../../../../interfaces/interfaces';
import { circleDrawingRadius, circleIdleRadius } from "../constants";

export function recreateStrokes(g: any, isDrawing: boolean, circleRad: number, animateHistory: Coordinate[], lastNonNull: Coordinate, changeCircleRad: (input: number) => void, strokeX: number, playerX: number) {
    // must clear to animate
    g.clear();

    // draw player circle
    const animationSpeed = 1;
    let newRadius: number = circleRad;
    if (isDrawing) {
        // make circle larger like an animation
        if (circleRad < circleDrawingRadius) {
            changeCircleRad(circleRad + animationSpeed);
            newRadius = newRadius + animationSpeed;
        }
    } else {
        // make circle shrink like an animation
        if (circleRad > circleIdleRadius) {
            changeCircleRad(circleRad - animationSpeed)
            newRadius = newRadius - animationSpeed;
        }
    }
    // const newRadius = isDrawing ? circleDrawingRadius : circleIdleRadius
    g.lineStyle(4, 0xff3300, 1);
    g.beginFill(0xff3300)
    // console.log(newRadius) 
    const circleX = playerX;
    g.drawCircle(circleX, lastNonNull.y, newRadius)
    g.endFill()

    g.lineStyle(4, 0xffd900, 1);
    g.beginFill(0xffd900)
    g.drawCircle(circleX, lastNonNull.y, newRadius - 2)
    g.endFill();

    // redraw strokes based on history
    g.lineStyle(circleDrawingRadius, 0xffd900, 1);

    if (animateHistory.length !== 0) {
        // console.log("Drawing " + animateHistory.length + " strokes")
        for (let i = 0; i < animateHistory.length - 1; i++) {
            // check if our current or prev is null
            const start = animateHistory.at(i);
            const end = animateHistory.at(i + 1);

            if (start && end) {
                const startX = start.x;
                const startY = start.y;
                const endX = end.x;
                const endY = end.y;
                if (startX !== null && startY !== null && endX !== null && endY !== null) {
                    // console.log("redrawing from", startX, startY, "to", endX, endY);
                    g.beginFill(0xffd900);

                    g.moveTo(startX, startY);
                    g.lineTo(endX, endY);
                    g.endFill();

                }
            }
        }
    }
}