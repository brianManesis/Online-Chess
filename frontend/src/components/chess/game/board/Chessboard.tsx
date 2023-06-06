import './Chessboard.css';
import Square from './Square';
import { ChessBoardModel } from '../../../../model/ChessBoardModel';
import { useRef, useState } from 'react';
import { BOARD_SIZE } from '../../../../Constants';

export default function Chessboard(props:{playerColor:string}){
    const playerColor = props.playerColor;
    const boardRef = useRef<HTMLDivElement>(null);
    let activePiece: HTMLElement | null = null;

    const boardModel = new ChessBoardModel(playerColor).genChessBoard();
    const boardView:any = [[],[],[],[],[],[],[],[]];

    const [chessboard,setChessBoard] = useState(boardModel);

    for(let i = 0; i<BOARD_SIZE; i++){
        for(let j = 0; j<BOARD_SIZE; j++){
            boardView[i].push(
                <Square key={i+""+j} squareModel={boardModel[i][j]}></Square>
            );
        }
    }

    function grabPiece(event: React.MouseEvent){
        const element = event.target as HTMLElement;
    
        if(element.classList.contains("piece")){
            const x = event.clientX-50;
            const y = event.clientY-50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            activePiece = element;
        }
    }
    
    function movePiece(event: React.MouseEvent){
        if(activePiece && boardRef.current){
            const minX = boardRef.current.offsetLeft;
            const minY = boardRef.current.offsetTop;
            const maxX = boardRef.current.offsetLeft + boardRef.current.clientWidth-75;
            const maxY = boardRef.current.offsetTop + boardRef.current.clientHeight-75;

            const x = event.clientX-50;
            const y = event.clientY-50;

            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            }
            else {
                activePiece.style.left = `${x}px`;
            }
    
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            }
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            }
            else {
                activePiece.style.top = `${y}px`;
            }
        }
    }
    
    function dropPiece(event: React.MouseEvent){

        if(activePiece){
            activePiece = null;
        }
    }
    return(
        <div id = "chessboard"
        onMouseMove={event => movePiece(event)}   
        onMouseDown={event => grabPiece(event)}
        onMouseUp={event => dropPiece(event)}
        ref={boardRef}>
            {boardView}
        </div>
    );
}