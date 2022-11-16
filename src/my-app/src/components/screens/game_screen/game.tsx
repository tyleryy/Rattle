import { Stage } from '@inlet/react-pixi'
import { useState } from 'react';
import Canvas from './canvas/canvas';
import { coordinate } from '../../../interfaces/interfaces';

function Game() {
    const [strokes, changeStrokes] = useState<coordinate[]>([]);
    const [nextStrokes, changeNextStrokes] = useState<coordinate[]>([]);


    return (
        <Stage onPointerMove={(e: any) => {
            // when we move, we want to add the coordinate to the array
            const coordinate = {
                x: Math.floor(e.clientX - e.target.offsetLeft), // subtract to account for the stage position
                y: Math.floor(e.clientY - e.target.offsetTop)
            }
            // let currStrokes = strokes;
            // currStrokes.push(coordinate);
            // changeStrokes(currStroke)
            // console.log(currStrokes)
            changeStrokes([...strokes, coordinate]);
            changeNextStrokes([...nextStrokes, coordinate]);
            console.log([...nextStrokes, coordinate]);
            // console.log(currStrokes);
        }}>
            {/* <Sprite ref={stageRef} image="./bunny.png" x={100} y={100} /> */}
            <Canvas nextStrokes={nextStrokes} />
        </Stage>
    )
}

export default Game;