import { Stage, Sprite } from '@inlet/react-pixi'
import { useState, useEffect, useRef } from 'react';
import DrawCanvas from './canvas/drawCanvas';
import { Coordinate } from '../../../interfaces/interfaces';
import { lockedX } from './constants';

function Game() {
    // remember the strokes done

    /** Static stroke history recording the y */
    const [strokeHistory, changeStrokeHistory] = useState<(number | null)[]>([]);

    /** Animated stroke history where the canvas will be animating the position of the stroke. This will change over time */
    const [animatedStrokeHistory, changeAnimatedStrokeHistory] = useState<Coordinate[]>([]);

    /** Controls whether the key to draw is being pressed or not */
    const [isDrawing, flipDrawingKey] = useState<boolean>(false);

    /** Remember whether we just drew or not */
    const [justDrew, flipJustDrew] = useState<boolean>(false);

    /** Position of the mouse at all times (relative to the stage), used to control the player circle */
    const [lastNonNullPos, changeLastNonNullPos] = useState<Coordinate>({ x: null, y: null })

    /** Interval function to run repeatedly (attempt to draw while standing still) */
    const stageRef = useRef(null);

    // stage size
    const [stageW, changeW] = useState<number>(800);
    const [stageH, changeH] = useState<number>(600);

    useEffect(() => {
        // get the width of the screen
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        changeW(vw);
        // changeW(vw);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        changeH(vh);

        // default starting position of the circle
        changeLastNonNullPos({ x: lockedX, y: vh / 2 });

        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);
        // loopPosition(isDrawing, prevCoord, currCoord);
        // window.addEventListener("mousemove", mouseInPlay);
    }, []);

    // when we change the drawing status, reset the looping
    // useEffect(() => {
    //     // console.log(currCoord)
    //     if (loopInterval) {
    //         clearInterval(loopInterval);
    //         loopPosition(isDrawing, prevCoord, currCoord)
    //     }
    // }, [isDrawing, prevCoord, currCoord])

    const drawKey = "Space"

    function keysDown(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {
            flipDrawingKey(true);
            // console.log("Key down " + drawKey);
        }
    }


    function keysUp(e: KeyboardEvent) {
        const key = e.code;
        if (key === drawKey) {
            flipDrawingKey(false);
        }
    }

    // function loopPosition(isDrawing: boolean, prevCoord: Coordinate, currCoord: Coordinate) {
    //     // console.log("Resetting interval", isDrawing)
    //     const handler = setInterval(() => {
    //         if (isDrawing) {
    //             // console.log("Ui")
    //             // console.log(currCoord);
    //             // console.log(prevCoord)
    //             if (prevCoord.y && currCoord.y && prevCoord.x && currCoord.x) {
    //                 if (Math.abs(prevCoord.y - currCoord.y) <= 1) {
    //                     // standing still but trying to draw
    //                     console.log("STANDING STILL")
    //                     changeStrokeHistory([...strokeHistory, currCoord]);
    //                     changeAnimatedStrokeHistory([...animatedStrokeHistory, currCoord]);
    //                     // console.log("stading still?")
    //                 }
    //             }
    //             // if (currCoord.x === prevCoord.x && currCoord.y === prevCoord.y) {
    //             //     // trying to draw but not moving
    //             //     console.log("TRYING TO DRAW")
    //             //     let tinyCoord = currCoord;
    //             //     if (tinyCoord.x) {
    //             //         tinyCoord.x = tinyCoord.x + 0.00001;
    //             //         changeCurrCord(tinyCoord);
    //             //     }
    //             // }
    //         }
    //     }, 20);
    //     changeLoopInterval(handler);
    // }


    return (
        <Stage width={stageW} height={stageH} style={{ left: 0, position: "absolute" }} onPointerMove={(e: any) => {
            // when we move, we want to add the coordinate to the array
            let coordinate: Coordinate = {
                // x: Math.floor(e.clientX - e.target.offsetLeft), // subtract to account for the stage position
                x: Math.floor(lockedX),
                y: Math.floor(e.clientY - e.target.offsetTop)
            }

            changeLastNonNullPos(coordinate);


            if (!isDrawing) {
                // push null
                // console.log("NULL")
                coordinate = {
                    x: null,
                    y: null
                }
            }
            changeStrokeHistory([...strokeHistory, coordinate.y]);

            // iterate through the strokes to remove the old ones out of the screen
            const lengthThreshold = 150;
            // const lengthThreshold = 10;
            // if we have a defined coordinate
            if (coordinate.x && coordinate.y && isDrawing) {
                flipJustDrew(true);
                if (animatedStrokeHistory.length > lengthThreshold * 3) {
                    // delete the first few values to maintain performance
                    changeAnimatedStrokeHistory([...animatedStrokeHistory.slice(lengthThreshold), coordinate]);
                } else {
                    changeAnimatedStrokeHistory([...animatedStrokeHistory, coordinate]);
                }
            } else if (!coordinate.x && !coordinate.y && justDrew) {
                // we did not draw yet, add a null value to separate the strokes
                changeAnimatedStrokeHistory([...animatedStrokeHistory, coordinate])
                flipJustDrew(false);
            }
        }}>
            <Sprite ref={stageRef} image="./game_sprites/back.png" x={100} y={100} />
            <DrawCanvas lastNonNull={lastNonNullPos} changeAnimatedStrokes={changeAnimatedStrokeHistory} animateHistory={animatedStrokeHistory} isDrawing={isDrawing} />
        </Stage>

    )
}

export default Game;