import './Chessboard.css';
import Square from './Square';
import { ChessBoardModel } from '../../../../model/ChessBoardModel';
import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, PlayerColor } from '../../../../Constants';
import React from 'react';
import { possiblePawnMoves } from '../../../../model/PossibleMoves';
export default function Chessboard(props:{playerColor:string}){
    const playerColor = props.playerColor;
    const chessBoard:ChessBoardModel = new ChessBoardModel(playerColor);
    const boardViewRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState< HTMLElement | null>(null);
    const [boardModel,setBoardModel] = useState(chessBoard.getChessBoard());
    const boardView:any = [[],[],[],[],[],[],[],[]];

        for(let i = 0; i<BOARD_SIZE; i++){
            for(let j = 0; j<BOARD_SIZE; j++){
                boardView[i].push(
                    <Square key={i+""+j} squareModel={boardModel[i][j]}></Square>
                );
            }
        }
    function handleClick(event: React.MouseEvent){
        if(activePiece){
            movePiece(event);
        }
        else{
            selectPiece(event);
        }
    }
    function selectPiece(event: React.MouseEvent){
        const element = event.target as HTMLElement;
        const currentBoard = boardViewRef.current;
        if(element.classList.contains("piece") && currentBoard && !activePiece){
            setActivePiece(element); 
        }       
    }
    function movePiece(event: React.MouseEvent){
        const element = event.target as HTMLElement;
        if(activePiece && boardViewRef.current){
            //need to update model
            let startSquare = activePiece.parentElement;
            let endSquare: HTMLElement | null = element;
            let activePieceColor:string = activePiece.id.includes("White")?
                PlayerColor.WHITE:PlayerColor.BLACK;

            if(endSquare.classList.contains("piece")){
                let endPieceColor = endSquare.id.includes("White")?
                PlayerColor.WHITE:PlayerColor.BLACK;

                if(endPieceColor == activePieceColor){
                    setActivePiece(endSquare);
                    return;
                }
                endSquare = endSquare.parentElement;
            }


            if(startSquare && endSquare){
                if(endSquare.children.length > 0){
                    endSquare.innerHTML = '';
                }
                if(startSquare.children.length > 0){
                    startSquare.removeChild(activePiece);

                }
                endSquare.appendChild(activePiece);
            }
            setActivePiece(null);
        }
    }
    // function grabPiece(event: React.MouseEvent){
    //     const element = event.target as HTMLElement;
    //     const currentBoard = boardViewRef.current;
    //     setGrabPiecePos(element.parentElement?.id+"");
    //     console.log(element.parentElement?.id);
    //     if(element.classList.contains("piece") && currentBoard){
    //         const BOARD_VIEW_HEIGHT = boardViewRef.current.clientHeight;
    //         const BOARD_VIEW_WIDTH = boardViewRef.current.clientWidth;
    //         const x = event.clientX-(BOARD_VIEW_WIDTH/16);
    //         const y = event.clientY-(BOARD_VIEW_HEIGHT/16);
    //         element.style.position = "absolute";
    //         element.style.left = `${x}px`;
    //         element.style.top = `${y}px`;
    //         setActivePiece(element);
    //     }
    // }
    
    // function movePiece(event: React.MouseEvent){
    //     if(activePiece && boardViewRef.current){
    //         const BOARD_VIEW_HEIGHT = boardViewRef.current.clientHeight;
    //         const BOARD_VIEW_WIDTH = boardViewRef.current.clientHeight;
    //         const minX = boardViewRef.current.offsetLeft;
    //         const minY = boardViewRef.current.offsetTop;
    //         const maxX = boardViewRef.current.offsetLeft + ((8/9)*BOARD_VIEW_WIDTH);
    //         const maxY = boardViewRef.current.offsetTop + ((8/9)*BOARD_VIEW_HEIGHT);

    //         const x = event.clientX-(BOARD_VIEW_WIDTH/16);
    //         const y = event.clientY-(BOARD_VIEW_HEIGHT/16);

    //         if (x < minX) {
    //             activePiece.style.left = `${minX}px`;
    //         }
    //         else if (x > maxX) {
    //             activePiece.style.left = `${maxX}px`;
    //         }
    //         else {
    //             activePiece.style.left = `${x}px`;
    //         }
    
    //         if (y < minY) {
    //             activePiece.style.top = `${minY}px`;
    //         }
    //         else if (y > maxY) {
    //             activePiece.style.top = `${maxY}px`;
    //         }
    //         else {
    //             activePiece.style.top = `${y}px`;
    //         }
    //     }
    // }
    
    // function dropPiece(event: React.MouseEvent){
    //     const element = event.target as HTMLElement;
    //     console.log(event);
    //     if(activePiece && boardViewRef.current){
    //         setActivePiece(null);
    //     }
    // }
    return(
        <div id = "chessboard"
        onClick={event=>handleClick(event)}
        ref={boardViewRef}>
            {boardView}
        </div>
    );
}