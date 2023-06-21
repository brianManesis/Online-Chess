import './Chessboard.css';
import Square from './Square';
import { ChessBoardModel } from '../../../../model/ChessBoardModel';
import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, PlayerColor } from '../../../../utils/Constants';
import React from 'react';
import { SquareModel } from '../../../../model/SquareModel';

export default function Chessboard(props:{playerColor:PlayerColor}){
    const playerColor = props.playerColor;
    const chessBoard:ChessBoardModel = new ChessBoardModel(playerColor);
    const boardViewRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState< HTMLElement | null>(null);
    const [boardModel,setBoardModel] = useState(chessBoard);
    const [boardView, setBoardView] = useState([[],[],[],[],[],[],[],[]]);
        
    useEffect(()=>{
        makeChessBoard();
        // console.log(boardModel);
        // console.log(boardView);
    },[boardModel]);

    function makeChessBoard(){
        const boardViewTemp:any = [[],[],[],[],[],[],[],[]];
        const currentBoardModel:Array<Array<SquareModel>> = boardModel.getChessBoard();
        if(playerColor === PlayerColor.WHITE){
            for(let i = 0; i<BOARD_SIZE; i++){
                for(let j = 0; j<BOARD_SIZE; j++){
                    boardViewTemp[i].push(
                        <Square key={i+""+j} squareModel={currentBoardModel[i][j]}></Square>
                    );
                }
            }
        }
        else{
            for(let i = BOARD_SIZE-1; i>=0; i--){
                let k = 0;
                for(let j = BOARD_SIZE-1; j>=0; j--){
                    boardViewTemp[k].push(
                        <Square key={i+""+j} squareModel={currentBoardModel[i][j]}></Square>
                    );
                }
                k++;
            }
        }
        setBoardView(() => boardViewTemp);
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
            let startSquare = activePiece.parentElement;
            let endSquare: HTMLElement | null = element;
            let activePieceColor:PlayerColor = activePiece.id.includes("White")?
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
                const updatedBoardModel = boardModel.clone();
                const updatedBoard = updatedBoardModel.getChessBoard();
                let startPos = updatedBoardModel.posToArrayPos(startSquare.id);
                let endPos = updatedBoardModel.posToArrayPos(endSquare.id);
                if(startPos && endPos){
                    let valid = updatedBoardModel.validMove(
                        updatedBoard[startPos.i][startPos.j],
                        updatedBoard[endPos.i][endPos.j],
                        activePieceColor);
                    if(valid){
                        updatedBoardModel.pieceMove(
                            updatedBoard[startPos.i][startPos.j],
                            updatedBoard[endPos.i][endPos.j]
                        );
                    }
                }
                 setBoardModel(updatedBoardModel);
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