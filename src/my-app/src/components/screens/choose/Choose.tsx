import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonChar from '../../buton/ButtonChar';
import SmallButton from "../../buton/SmallButton";
import { useState, useEffect, useContext } from 'react';
import { Context } from "../../../providers/provider";
import { Stage, AnimatedSprite } from '@inlet/react-pixi'
import "./Choose.css";

// interface charSpriteMap {
//     [key: number]: string[]
// }

// interface aniSpriteMap {
//     [key: number]: JSX.Element
// }

function Choose() {
    const states: any = useContext(Context);
    const [lobby_code, ] = states.lobby_state;
    const [player, ] = states.player_state;
    const [socket, ] = states.socket_state;
    const [, changeChar] = states.character_state;
    const [, changeChar2] = states.char2_state;

    // stage size
    // const [, changeW] = useState<number>(800);
    // const [, changeH] = useState<number>(600);
    // const [player1, changeChar1] = useState({
    //     image: "./game_sprites/char1.png",
    //     character: 0
    // });
    const navigate = useNavigate();


    // const animatedSpriteMap: aniSpriteMap = {
    //     0: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/back.png", "./game_sprites/back2.png"]} anchor={0.5}/>,
    //     1: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.5}/>,
    //     2: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame2.png"]} anchor={0.5}/>,
    //     3: <AnimatedSprite animationSpeed={0.05} isPlaying={true} images={["./game_sprites/char3.png", "./game_sprites/char3frame2.png"]} anchor={0.5}/>
    // }

    // const charToFrames: charSpriteMap = 
    const [char1_active, checkActiveChar1] = useState(false)
    const [char2_active, checkActiveChar2] = useState(false)
    const [char3_active, checkActiveChar3] = useState(false)

    const [otherchar1_active, othercheckActiveChar1] = useState(false)
    const [otherchar2_active, othercheckActiveChar2] = useState(false)
    const [otherchar3_active, othercheckActiveChar3] = useState(false)


    // const [p1Frames, setP1Frames] = useState<any[]>([])

    useEffect(() => {
        if (char1_active === true) {
            checkActiveChar2(false);
            checkActiveChar3(false);
        }
    }, [char1_active]);

    useEffect(() => {
        if (char2_active === true) {
            checkActiveChar1(false);
            checkActiveChar3(false);
        }
    }, [char2_active])

    useEffect(() => {
        if (char3_active === true) {
            checkActiveChar2(false);
            checkActiveChar1(false);
        }
    }, [char3_active])

    useEffect(() => {
        if (otherchar1_active === true) {
            othercheckActiveChar2(false);
            othercheckActiveChar3(false);
        }
    }, [otherchar1_active]);

    useEffect(() => {
        if (otherchar2_active === true) {
            othercheckActiveChar1(false);
            othercheckActiveChar3(false);
        }
    }, [otherchar2_active])

    useEffect(() => {
        if (otherchar3_active === true) {
            othercheckActiveChar2(false);
            othercheckActiveChar1(false);
        }
    }, [otherchar3_active])


    useEffect(() => {
         
        socket.on('Go Home', () => {
            navigate('/');
        });

        socket.on('go_to_options', () => {
            navigate("/options");
        })

        socket.on('updateSelectScreen', (data: any) => {
            console.log("updating select screen")
            console.log(data)
            let curr_player: any;
            let other_player: any;
            if (player === "Player 1") {
                curr_player = data.p1;
                other_player = data.p2;
            } else if (player === "Player 2") {
                curr_player = data.p2
                other_player = data.p1
            }

            switch (curr_player) {
                case '1':
                    checkActiveChar1(true)
                    break;
                case '2':
                    checkActiveChar2(true)
                    break;
                case '3':
                    checkActiveChar3(true)
                    break;
                default:
                    break;
            }
            if (other_player) {
                switch (other_player) {
                    case '1':
                        othercheckActiveChar1(true)
                        break;
                    case '2':
                        othercheckActiveChar2(true)
                        break;
                    case '3':
                        othercheckActiveChar3(true)
                        break;
                    default:
                        break;
                }
            }
            changeChar(curr_player);
            changeChar2(other_player);

        })
        // get the width of the screen
        // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        // changeW(vw);
        // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        // changeH(vh);

        // console.log("current player " + character)
        // console.log("opponent player " + other_char)
        return () => { socket.removeAllListeners() };
    }, [socket, changeChar, changeChar2, navigate, player]);

    return (
        <div className="background">
            <img src="./game_sprites/cyc.png" alt="logo" className="cyc" />
            <div className="roomCode">Room Code: {lobby_code}</div>
            <div className="parent">

                <div className="column">
                    <div className="stage">
                        <Stage width={400} height={680} options={{ backgroundAlpha: 0 }}>
                            {/* <Sprite image={player1.image} scale={ {x: 0.8 , y: 0.8} }/> */}
                            <AnimatedSprite animationSpeed={0.05} isPlaying={char1_active} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible={char1_active} />
                            <AnimatedSprite animationSpeed={0.05} isPlaying={char2_active} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={char2_active} />
                            <AnimatedSprite animationSpeed={0.05} isPlaying={char3_active} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={0.01} visible={char3_active} />
                        </Stage>
                    </div>
                </div>

                <div className="column">
                    <ButtonChar char="1" imageEnter="./game_sprites/char1_but_.png" imageLeave="./game_sprites/char1_but_2.png" setCheck={checkActiveChar1}></ButtonChar>

                    <ButtonChar char="2" imageEnter="./game_sprites/char2_but_.png" imageLeave="./game_sprites/char2_but_2.png" setCheck={checkActiveChar2}></ButtonChar>

                    <ButtonChar char="3" imageEnter="./game_sprites/char3_but_.png" imageLeave="./game_sprites/char3_but_2.png" setCheck={checkActiveChar3}></ButtonChar>
                </div>

                <div className="column">
                    <div className="stage_right">
                        <Stage width={400} height={680} options={{ backgroundAlpha: 0 }}>
                            {/* <Sprite image="./game_sprites/back.png" /> */}
                            <AnimatedSprite animationSpeed={0.05} isPlaying={otherchar1_active} images={["./game_sprites/char1.png", "./game_sprites/char1frame2.png"]} anchor={0.01} visible={otherchar1_active} />
                            <AnimatedSprite animationSpeed={0.05} isPlaying={otherchar2_active} images={["./game_sprites/char2_frames/char2frame1.png", "./game_sprites/char2_frames/char2frame3.png"]} anchor={0.01} visible={otherchar2_active} />
                            <AnimatedSprite animationSpeed={0.05} isPlaying={otherchar3_active} images={["./game_sprites/petrframe1.png", "./game_sprites/char3frame2.png"]} anchor={0.01} visible={otherchar3_active} />
                            {/* {p1Ani} */}
                        </Stage>
                    </div>
                </div>
            </div>
            <img className="youArrow" src="./game_sprites/you.png" alt="" />
            <div className="parent">
                <SmallButton imageEnter="./game_sprites/back.png" imageLeave="./game_sprites/back2.png" routesPath="/" socketEmitEvent="" />
                <SmallButton imageEnter="./game_sprites/select.png" imageLeave="./game_sprites/select2.png" routesPath="/options" socketEmitEvent="go_to_options" />
            </div>
        </div>
    )
}

export default Choose;