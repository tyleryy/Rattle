import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { Coordinate } from "../../../../interfaces/interfaces";
import { drawSpeedMultiplier } from "../constants";

function Canvas({ currCord, isDrawing, changeStrokes, currHistory }: { currCord: Coordinate, isDrawing: boolean, changeStrokes: (input: Coordinate[]) => void, currHistory: Coordinate[] }) {
    const [prevCoord, changePrevCoord] = useState<Coordinate>({ x: null, y: null });
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
        // now check if we're drawing
        if (isDrawing) {
            // remember the strokes
            let adjustedCoord = currCord;
            // console.log("in tick", currCord);
            // console.log(adjustedCoord.x, prevCoord.x)
            if (adjustedCoord.x) {
                // as if it was over time
                // adjustedCoord.x = adjustedCoord.x - (time + delta * 10);
                // console.log("Pushing", currCord);
                changeStrokes([...historyCopy, currCord]);
                changePrevCoord(adjustedCoord);
            } else {
                console.log("ADJUSTED NOT FOUND")
            }

        } else {
            // push null's
            const dummyCoord = { x: null, y: null }
            changeStrokes([...historyCopy, dummyCoord]);
            changePrevCoord(dummyCoord);
        }
        // console.log("End Delta");
    })

    useEffect(() => {
        // console.log(currCord)
    }, [currCord])


    function recreateStrokes(g: any) {
        // redraw based on history
        g.clear();
        g.lineStyle(4, 0xffd900, 1);
        g.beginFill(0xffd900);

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
                        g.moveTo(startX, startY);
                        g.lineTo(endX, endY);
                    }
                }
            }
        }
        if (isDrawing) {
            if (prevCoord.x && prevCoord.y) {
                const nextStroke = currHistory.at(-1);
                if (nextStroke && nextStroke.x !== null && nextStroke.y !== null) {
                    // console.log(nextStroke.x);
                    // console.log("DRAWING BETWEEN ", JSON.stringify(prevCoord), JSON.stringify(nextStroke));
                    // console.log(currHistory);
                    g.moveTo(prevCoord.x, prevCoord.y);
                    g.lineTo(nextStroke.x, nextStroke.y);
                }
            }
            g.endFill();
        }

    }
    return (
        <Graphics draw={recreateStrokes} />
    )
}

export default Canvas;