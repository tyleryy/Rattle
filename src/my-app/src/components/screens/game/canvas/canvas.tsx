import { Container, Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { Coordinate } from "../../../../interfaces/interfaces";

function Canvas({ currCord, isDrawing, changeStrokes, currHistory }: { currCord: Coordinate, isDrawing: boolean, changeStrokes: (input: Coordinate[]) => void, currHistory: Coordinate[] }) {
    const [prevCoord, changePrevCoord] = useState<Coordinate>({ x: -100, y: -100 });
    useTick((delta) => {
        if (isDrawing) {
            // remember the strokes
            changeStrokes([...currHistory, currCord]);
            changePrevCoord(currCord);
        } else {
            // push -100's
            const dummyCoord = { x: -100, y: -100 }
            changeStrokes([...currHistory, dummyCoord]);
            changePrevCoord(dummyCoord);
        }

    })


    function recreateStrokes(g: any) {
        // ! This is hacking it, can't get deepStrictEqual to work
        if (JSON.stringify(prevCoord) !== JSON.stringify({ x: -100, y: -100 }) && JSON.stringify(prevCoord) !== JSON.stringify({ y: -100, x: -100 })) {
            const nextStroke = currHistory.at(-1);
            if (nextStroke && nextStroke.x !== -100 && nextStroke.y !== -100) {
                console.log("DRAWING BETWEEN ", prevCoord, nextStroke)
                g.lineStyle(4, 0xffd900, 1);
                g.beginFill(0xffd900);
                g.moveTo(prevCoord.x, prevCoord.y);
                g.lineTo(nextStroke.x, nextStroke.y);
                g.endFill();
            }
        }
    }
    return (
        <Graphics draw={isDrawing ? recreateStrokes : () => { }} />
    )
}

export default Canvas;