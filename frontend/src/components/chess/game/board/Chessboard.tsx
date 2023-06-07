import './Chessboard.css';
import Square from './Square';
import { ChessBoardModel } from '../../../../model/ChessBoardModel';
import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, PlayerColor } from '../../../../Constants';
import React from 'react';
import { possiblePawnMoves } from '../../../../model/PossibleMoves';
export default function Chessboard(props:{playerColor:string}){
    const playerColor = props.playerColor;
    const boardViewRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState< HTMLElement | null>(null);
    const boardModel = new ChessBoardModel(playerColor).genChessBoard();
    const boardView:any = [[],[],[],[],[],[],[],[]];
    console.log(possiblePawnMoves(boardModel[7][7],playerColor));

    for(let i = 0; i<BOARD_SIZE; i++){
        for(let j = 0; j<BOARD_SIZE; j++){
            boardView[i].push(
                <Square key={i+""+j} squareModel={boardModel[i][j]}></Square>
            );
        }
    }
    function handleClick(event: React.MouseEvent){
        //console.log(activePiece);
        if(activePiece){
            movePiece(event);
        }
        else{
            selectPiece(event);
        }
    }
    function selectPiece(event: React.MouseEvent){
        console.log(event.target); 
        const element = event.target as HTMLElement;
        const currentBoard = boardViewRef.current;
        if(element.classList.contains("piece") && currentBoard && !activePiece){
            setActivePiece(element); 
        }       
    }
    function movePiece(event: React.MouseEvent){
        console.log(event.target);
        const element = event.target as HTMLElement;
        if(activePiece && boardViewRef.current){
            let startSquare = activePiece.parentElement;
            let endSquare: HTMLElement | null = element;
            let activePieceID = activePiece.id;
            let activePieceColor:string = activePieceID.includes("White")?
                PlayerColor.WHITE:PlayerColor.BLACK;

            if(element.classList.contains("piece")){
                // Need to fix selectPiece for when endSquare has piece
                // of the same color as activePiece
                // and also cant capture piece of the same color
                // let endPieceColor = endSquare.id.includes("White")?
                // PlayerColor.WHITE:PlayerColor.BLACK;

                // if(endPieceColor == activePieceColor){
                //     selectPiece(event);
                //     return;
                // }
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