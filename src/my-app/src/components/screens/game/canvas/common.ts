import { Coordinate } from './../../../../interfaces/interfaces';
import { circleDrawingRadius, circleIdleRadius } from "../constants";

/**
 * 
 * @param g pixi graphics
 * @param isDrawing boolean to represent if the player is drawing or not (render strokes or not)
 * @param circleRad current radius of the circle 
 * @param animateHistory the strokes to draw
 * @param lastNonNull the last position (same as the player position)
 * @param changeCircleRad function to update player circle size
 * @param strokeX the starting x position of strokes
 * @param playerX the player x position
 */
export function recreateStrokes(g: any, isDrawing: boolean, circleRad: number, animateHistory: Coordinate[], lastNonNull: Coordinate, changeCircleRad: (input: number) => void, strokeX: number, playerX: number, p2Coord: Coordinate) {
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

    // draw opponent player
    const fakeCoord = {
        x: p2Coord.x,
        y: lastNonNull.y! + Math.floor(Math.random() * 100)
    }
    drawPlayerCircle(g, playerX, fakeCoord, circleIdleRadius, 0x334DFF, 0xFFD233);

    // use this function if want to render player2 movement
    // drawPlayerCircle(g, playerX, p2Coord, circleIdleRadius, 0x334DFF, 0xFFD233);


    // draw client player
    drawPlayerCircle(g, playerX, lastNonNull, newRadius, 0xff3300, 0xffd900);

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

function drawPlayerCircle(g: any, playerXPos: number, playerCoord: Coordinate, playerRadius: number, outerColor: number, innerColor: number) {
    // g.lineStyle(4, 0xff3300, 1);
    // g.beginFill(0xff3300)
    g.lineStyle(4, outerColor, 1);
    g.beginFill(outerColor);

    const circleX = playerXPos;
    // draw larger outer circle for player
    g.drawCircle(circleX, playerCoord.y, playerRadius)
    g.endFill()

    // draw inner circle for player
    g.lineStyle(4, 0xffd900, 1);
    g.beginFill(0xffd900)
    g.drawCircle(circleX, playerCoord.y, playerRadius - 2)
    g.endFill();
}