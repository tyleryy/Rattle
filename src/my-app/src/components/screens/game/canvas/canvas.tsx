import { Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { Coordinate } from "../../../../interfaces/interfaces";
import { drawSpeedMultiplier } from "../constants";

function Canvas({ currCord, isDrawing, changeStrokes, currHistory }: { currCord: Coordinate, isDrawing: boolean, changeStrokes: (input: Coordinate[]) => void, currHistory: Coordinate[] }) {
    const [prevCoord, changePrevCoord] = useState<Coordinate>({ x: null, y: null });
    const [time, changeTime] = useState(0);
    useTick((delta) => {
        const newTime = time + delta;
        changeTime(newTime);
        // update the history with the new delta x
        let historyCopy = [...currHistory];
        for (let stroke of historyCopy) {
            if (stroke.x) {
                stroke.x = stroke.x - delta * drawSpeedMultiplier;
            }
        }
        // now check if we're drawing
        if (isDrawing) {
            // remember the strokes
            let adjustedCoord = currCord;
            if (adjustedCoord.x) {
                // as if it was over time
                // adjustedCoord.x = adjustedCoord.x - (time + delta * 10);
            }
            changeStrokes([...historyCopy, currCord]);
            changePrevCoord(adjustedCoord);
        } else {
            // push null's
            const dummyCoord = { x: null, y: null }
            changeStrokes([...historyCopy, dummyCoord]);
            changePrevCoord(dummyCoord);
        }
    })


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
            // ! This is hacking it, can't get deepStrictEqual to work
            if (JSON.stringify(prevCoord) !== JSON.stringify({ x: null, y: null }) && JSON.stringify(prevCoord) !== JSON.stringify({ y: null, x: null })) {
                const nextStroke = currHistory.at(-1);
                if (nextStroke && nextStroke.x !== null && nextStroke.y !== null) {
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