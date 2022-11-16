import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { Coordinate } from "../../../../interfaces/interfaces";
import { drawSpeedMultiplier, lockedX, circleDrawingRadius, circleIdleRadius } from "../constants";

function Canvas({ currCord, lastNonNull, changeStrokes, currHistory, isDrawing }: { currCord: Coordinate, lastNonNull: Coordinate, changeStrokes: (input: Coordinate[]) => void, currHistory: Coordinate[], isDrawing: boolean }) {
    const [time, changeTime] = useState(0);
    useTick((delta) => {
        // console.log("Start Delta");
        const newTime = time + delta;
        changeTime(newTime);

        // update the history with the new delta x
        let historyCopy = [...currHistory];
        let deltaX = delta * drawSpeedMultiplier;
        if (deltaX > 4) {
            // console.log("delta is", delta)
            // console.log("Delta X is ", deltaX);
            deltaX = 3;
        }
        // console.log(historyCopy)
        for (let stroke of historyCopy) {
            // if (prevStroke.x && stroke.x) {
            //     if (Math.abs(prevStroke.x - stroke.x) > 4) {
            //         console.log("Weird")
            //     }
            // }
            if (stroke.x) {
                stroke.x = stroke.x - deltaX;
            } else {
                // console.log("x is null")
            }
        }
        changeStrokes([...historyCopy]);
        // now check if we're drawing
    })

    const [circleRad, changeCircleRad] = useState(circleIdleRadius);


    function recreateStrokes(g: any) {
        // must clear to animate
        g.clear();

        // draw player circle
        const animationSpeed = 1;
        // let newRadius: number = circleRad;
        // if (isDrawing) {
        //     // make circle larger like an animation
        //     if (circleRad < circleDrawingRadius) {
        //         changeCircleRad(circleRad + animationSpeed);
        //         newRadius = newRadius + animationSpeed;
        //     }
        // } else {
        //     // make circle shrink like an animation
        //     if (circleRad > circleIdleRadius) {
        //         changeCircleRad(circleRad - animationSpeed)
        //         newRadius = newRadius - animationSpeed;
        //     }
        // }
        const newRadius = isDrawing ? circleDrawingRadius : circleIdleRadius
        g.lineStyle(4, 0xff3300, 1);
        g.beginFill(0xff3300)
        // console.log(newRadius)   
        g.drawCircle(lockedX, lastNonNull.y, newRadius)
        g.endFill()

        g.lineStyle(4, 0xffd900, 1);
        g.beginFill(0xffd900)
        g.drawCircle(lockedX, lastNonNull.y, newRadius - 2)
        g.endFill();

        // redraw strokes based on history
        g.lineStyle(circleDrawingRadius, 0xffd900, 1);

        if (currHistory.length !== 0) {
            for (let i = 0; i < currHistory.length - 1; i++) {
                // check if our current or prev is null
                const start = currHistory.at(i);
                const end = currHistory.at(i + 1);

                if (start && end) {
                    const startX = start.x;
                    const startY = start.y;
                    const endX = end.x;
                    const endY = end.y;
                    if (startX && startY && endX && endY) {
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
    return (
        <Graphics draw={recreateStrokes} />
    )
}

export default Canvas;