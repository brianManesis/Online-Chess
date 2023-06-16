import { ChessBoardModel } from "../ChessBoardModel";
import { SquareModel } from "../SquareModel";
import { PlayerColor, PieceType } from "../../utils/Constants";
import { PieceModel } from "./PieceModel";

export class PawnModel extends PieceModel{
    public constructor(type: PieceType, color: PlayerColor){
        super(type, color);
    }
    public validMove(boardModel:ChessBoardModel, startSquare:SquareModel,
                    endSquare:SquareModel, playerColor:PlayerColor): boolean {
        const pos = endSquare.getPos();
        return this.updatePossibleMoves(boardModel,startSquare,playerColor).has(pos);    
    }

    private updatePossibleMoves(boardModel:ChessBoardModel, square:SquareModel, playerColor:PlayerColor):Set<string>{
        const pawn = square.getPiece();
        this.possibleMoves.clear();

        if(pawn){
            const board = boardModel.getChessBoard();
            const pieceDirections = this.pawnDirections(pawn);
            const chessNotation = square.getPos();
            const posArray = boardModel.posToArrayPos(chessNotation);

            if(posArray){
                let fowardI = posArray.i+pieceDirections.dy;
                let fowardJ = posArray.j+pieceDirections.dx;
                if(this.withinBoard(fowardI,fowardJ)){
                    let forwardSquare = board[fowardI][fowardJ];
                    let forwardSquarePiece = forwardSquare.getPiece();
                    if(forwardSquarePiece === undefined){
                        this.possibleMoves.add(forwardSquare.getPos());
                    }
                    if(!pawn.beenMoved && forwardSquarePiece === undefined){
                        let fowardI = posArray.i+2*pieceDirections.dy;
                        let fowardJ = posArray.j+2*pieceDirections.dx;
                        if(this.withinBoard(fowardI,fowardJ)){
                            let forwardSquare = board[fowardI][fowardJ];
                            let forwardSquarePiece = forwardSquare.getPiece();
                            if(forwardSquarePiece === undefined){
                                this.possibleMoves.add(forwardSquare.getPos());
                            }
                        }
                    }
                }
                
                let leftTakes = pieceDirections.takes.left;
                let leftI = posArray.i+leftTakes.dy;
                let leftJ = posArray.j+leftTakes.dx;
                if(this.withinBoard(leftI,leftJ)){
                    let leftSquare = board[leftI][leftJ];
                    let leftSquarePiece = leftSquare.getPiece();
                    if(leftSquarePiece && leftSquarePiece.getColor() !== playerColor){
                        this.possibleMoves.add(leftSquare.getPos());
                    }
                }

                let rightTakes = pieceDirections.takes.right;
                let rightI = posArray.i+rightTakes.dy;
                let rightJ = posArray.j+rightTakes.dx;
                if(this.withinBoard(rightI,rightJ)){
                    let rightSquare = board[rightI][rightJ];
                    let rightSquarePiece = rightSquare.getPiece();
                    if(rightSquarePiece && rightSquarePiece.getColor() !== playerColor){
                        this.possibleMoves.add(rightSquare.getPos());
                    }
                }
            }
        }
        return this.possibleMoves;
    }
    private pawnDirections(pawn:PieceModel){
        return pawn.getColor() === PlayerColor.WHITE?
        {
            dx: 0,
            dy: -1,
            takes: {
                left:{
                    dx: -1,
                    dy: -1
                },
                right:{
                    dx: 1,
                    dy: -1
                }
            }
        }:
        {
            dx: 0,
            dy: 1,
            takes: {
                left:{
                    dx: -1,
                    dy: 1
                },
                right:{
                    dx: 1,
                    dy: 1
                }
            }
        }
    }
    
}