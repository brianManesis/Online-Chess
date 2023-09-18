import './Chessboard.css';
import Square from './Square';
import { ChessBoardModel } from '../../../../model/ChessBoardModel';
import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, PlayerColor } from '../../../../utils/Constants';
import React from 'react';
import { SquareModel } from '../../../../model/SquareModel';

export default function Chessboard(props:{socket:any,playerColor:PlayerColor,opponent:string}){
    const playerColor = props.playerColor;
    const socket = props.socket;
    const boardViewRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState< HTMLElement | null>(null);
    const [boardModel,setBoardModel] = useState(new ChessBoardModel());
    const [boardView, setBoardView] = useState([[],[],[],[],[],[],[],[]]);

    useEffect(()=>{
        const handleMove = (move:{start:string,end:string}) =>{
            makeMove(move.start,move.end);
        }
        socket.on('move', handleMove);
        return () => {
            socket.off('move', handleMove);
          };
     },[boardModel]);

        
    useEffect(()=>{
        makeChessBoard();
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
        if( element.classList.contains("piece") && 
            currentBoard && 
            !activePiece
          )
        {
            let elementColor:PlayerColor = element.id.includes("White")?
                PlayerColor.WHITE:PlayerColor.BLACK;
            
            if(elementColor === playerColor) setActivePiece(element); 
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

                if(endPieceColor === activePieceColor){
                    setActivePiece(endSquare);
                    return;
                }
                endSquare = endSquare.parentElement;
            }


            if(startSquare && endSquare){
                makeMove(startSquare.id,endSquare.id);       
                socket.emit("move", {start:startSquare.id,end:endSquare.id});
            }
            setActivePiece(null);
        }
    }
    function makeMove(start:string,end:string){
        const updatedBoardModel = boardModel.clone();
        updatedBoardModel.move(
            start,
            end
        );        

        setBoardModel(updatedBoardModel);
    }
    
    return(
        <div id = "chessboard"
        onClick={event=>handleClick(event)}
        ref={boardViewRef}>
            {boardView}
        </div>
    );
}