import { Container, Graphics, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { coordinate } from "../../../../interfaces/interfaces";

function Canvas({ nextStrokes }: { nextStrokes: coordinate[] }) {
    // useTick((delta) => {
    //     console.log("Frame");
    // })


    function recreateStrokes(g: any) {
        const strokes = nextStrokes;
        if (strokes.length !== 0) {
            g.clear()
            g.lineStyle(4, 0xffd900, 1);
            g.beginFill(0xffd900);
            for (let i = 0; i < strokes.length - 1; i++) {
                const start = strokes.at(i);
                if (!start) {
                    console.log("Start is undefined")
                    return;
                }
                const startX = start.x;
                const startY = start.y;
                const end = strokes.at(i + 1);
                if (!end) {
                    console.log("End is undefined")
                    return
                }
                const endX = end.x;
                const endY = end.y;
                // lastX = endX;
                // lastY = endY;
                g.moveTo(startX, startY);
                g.lineTo(endX, endY);
            }
            // g.moveTo(lastCoord.x, lastCoord.y);
            // const end = strokes.at(0);
            // g.lineTo(end.x, end.y);
            g.endFill();
            // changeLastCoord({ x: end.x, y: end.y })
            // changeNextStrokes([]);
        }
    }
    return (
        <Graphics draw={recreateStrokes} />
    )
}

export default Canvas;