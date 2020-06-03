import React, {useReducer} from 'react';
import Square from "./Square"
import Player from "./Player"

export default (props) => {

    const initState = () => ({
        winner : false,
        board :[null,null,null,null,null,null,null,null,null],
        currentPlayer : 0,
        player: "Player 1"
    });

    const winPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]];

    const verification = (state) => {


        // state.board.map((element, index) => {
        //     if(element === 'X'){
        //         winPositions.map( posX => {
        //
        //         })
        //     } else
        //     {
        //
        //     }
        // })



        for( let i = 0; i < 3; i++){
            // Ligne
            if(
                state.board[(3*i)] !== null &&
                state.board[(3*i) + 1] !== null &&
                state.board[(3*i) + 2] !== null &&
                state.board[(3*i)] === state.board[(3*i) + 1] &&
                state.board[(3*i)] === state.board[(3*i) + 2]
            ) {

                console.log('winner H :' + state.player)
            }

            // Colone
            if(
                state.board[(3*i)] !== null &&
                state.board[(3*i) + 3] !== null &&
                state.board[(3*i) + 6] !== null &&
                state.board[(3*i)] === state.board[(3*i) + 3] &&
                state.board[(3*i)] === state.board[(3*i) + 6]
            ) {

                console.log('winner V:' + state.player)
            }

            // DIag 1

            if(
                state.board[(3*i)] !== null &&
                state.board[(3*i) + 4] !== null &&
                state.board[(3*i) + 8] !== null &&
                state.board[(3*i)] === state.board[(3*i) + 4] &&
                state.board[(3*i)] === state.board[(3*i) + 8]
            ) {

                console.log('winner X:' + state.player)
            }

            // DIag 2

            if(
                state.board[(3*i) + 2] !== null &&
                state.board[(3*i) + 4] !== null &&
                state.board[(3*i) + 6] !== null &&
                state.board[(3*i) + 2] === state.board[(3*i) + 4] &&
                state.board[(3*i) + 2] === state.board[(3*i) + 6]
            ) {

                console.log('winner X:' + state.player)
            }

        }


    };


    const updateBoard = (state,action) => {

        switch(action.type){

            case 'update' :

                const board = state.board;
                const currentPlayer = state.currentPlayer;


                board[action.payload] = state.currentPlayer ? "O" : "X";
                verification(state);
                return({board : board, currentPlayer : (currentPlayer ? 0 : 1), player : (currentPlayer ? 'Player 1' : 'Player 2') });

            case 'reset' :

                return(state);
            default :
                throw new Error;
        }


    };

    const play = (id) =>{

        dispatch({
            type:'update',
            payload:id,

        })
    };

    const [state,dispatch] = useReducer(updateBoard,initState());



    let id = 0;

    return (
        <div className="gameBoard">
            <header>
                <div className="playerStatus">{state.player}
                    <span className="symbol mdl-button--fab mdl-button--colored">X</span></div>
            </header>
            <div className="board-squares">
                {
                    state.board.map((line,l) => {

                        return (
                            l%3 === 0 && <div key={l} className="board-row">
                                {

                                    state.board.map((square,s)=> {

                                        return(
                                            s%3 === 0 && <Square id={id++}
                                                                 handleClick={play}
                                                                 choice={state.board}
                                                                 key={s} />
                                        )
                                    })
                                }
                            </div>
                        )
                    })

                }
            </div>
            <div className="winPopin disabled">
                <div className="message">Congratulations Player 1 ! you've won !!</div>
                <button
                    className="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect">Reset
                </button>
            </div>
        </div>
    );
}
