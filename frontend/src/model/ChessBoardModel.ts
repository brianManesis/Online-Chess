import { PieceModel } from "./pieces/PieceModel";
import { PawnModel } from "./pieces/PawnModel";
import { RookModel } from "./pieces/RookModel";
import { KnightModel } from "./pieces/KnightModel";
import { BishopModel } from "./pieces/BishopModel";
import { QueenModel } from "./pieces/QueenModel";
import { KingModel } from "./pieces/KingModel";
import { SquareModel } from "./SquareModel";
import { ROW_VALUES, COL_VALUES, PlayerColor, PieceType, BOARD_SIZE} from "../utils/Constants";

export class ChessBoardModel{
    private chessBoard: Array<Array<SquareModel>>;
    private playerColor:PlayerColor;
    private posMap:Map<string,{i:number,j:number}> = new Map();
    private moveList:Array<{fromSquare:string, toSquare:string}>;

    public constructor(playerColor:PlayerColor){
        this.playerColor = playerColor;
        this.moveList = [];
        let col = //playerColor =="White"?
        ROW_VALUES;//:[...ROW_VALUES].reverse();

        let row = //playerColor == "White"?
        [...COL_VALUES].reverse();//:COL_VALUES;
       
        this.chessBoard = [[],[],[],[],[],[],[],[]];
        for(let i = 0; i< BOARD_SIZE; i++){
            for(let j = 0; j< BOARD_SIZE; j++){

                let pos:string = col[j]+row[i];
                this.posMap.set(pos,{i:i, j:j});
                let color = (j+i+2) % 2 == 0? PlayerColor.WHITE:PlayerColor.BLACK
                let piece:PieceModel | undefined = this.genPiece(col[j],row[i]);
                
                if(piece){
                    this.chessBoard[i].push(
                        new SquareModel(color,pos,piece)
                    );
                }else{
                    this.chessBoard[i].push(
                        new SquareModel(color,pos)
                    );
                }
            }
        }
    }

    public getChessBoard():Array<Array<SquareModel>>{
        return this.chessBoard;
    }
    public getMoveList(){
        return this.moveList;
    }
    public getPosMap():Map<string,{i:number,j:number}>{
        return this.posMap;
    }
    public pieceMove(fromSquare:SquareModel, toSquare:SquareModel){
        if(fromSquare && toSquare){
            let pieceOnFromSquare: PieceModel | undefined = fromSquare.getPiece();
            if(pieceOnFromSquare){
                pieceOnFromSquare.beenMoved = true;
                fromSquare.setPiece(undefined);
                toSquare.setPiece(pieceOnFromSquare);
            }
        }
    }
    public validMove(startSquare:SquareModel, endSquare:SquareModel, playerColor:PlayerColor){
        const pieceMove = startSquare.getPiece();
        if(pieceMove &&
           pieceMove.validMove(this,startSquare,endSquare,playerColor)){
           return true;
        }
        return false;
    }

    public isKingInCheck(king: PieceModel): boolean {
        let kingPos: string | undefined;
        const playerColor = king.getColor();
        const opponentColor = playerColor === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE;

        this.chessBoard.forEach((row) => {
          row.forEach((square) => {
            const piece = square.getPiece();
            if (piece?.getType() === PieceType.KING && piece.getColor() === playerColor) {
              kingPos = square.getPos();
            }
          });
        });

        if (kingPos) {
            let kingSquare = this.getSquareByPos(kingPos);

            for (let i = 0; i < BOARD_SIZE; i++) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    const square = this.chessBoard[i][j];
                    const piece = square.getPiece();
                    
                    if (piece && piece.getColor() !== playerColor && kingSquare &&
                        this.validMove(square, kingSquare, opponentColor)) {
                        return true;
                    }
                }
            }
        }
      
        return false;
    }

    public posToArrayPos(pos: string){
        return this.posMap.get(pos);
    }

    public getSquareByPos(pos: string){
        let arrayPos = this.posMap.get(pos);
        if(!arrayPos) return null;

        let iPos = arrayPos.i;
        let jPos = arrayPos.j;

        if(!iPos || !jPos) return null;

        return this.chessBoard[iPos][jPos];
    }

    private genPiece(col:string,row:number): PieceModel | undefined{
        if(row == 2){
            return new PawnModel(PieceType.PAWN,PlayerColor.WHITE);
        }
        else if(row == 7){
            return new PawnModel(PieceType.PAWN,PlayerColor.BLACK);
        }
        else if(row == 1){
            if(col == 'a' || col == 'h'){
                return new RookModel(PieceType.ROOK,PlayerColor.WHITE);
            }
            else if(col== 'b' || col == 'g'){
                return new KnightModel(PieceType.KNIGHT, PlayerColor.WHITE);
            }
            else if(col== 'c' || col == 'f'){
                return new BishopModel(PieceType.BISHOP, PlayerColor.WHITE);
            }
            else if(col == 'd'){
                return new QueenModel(PieceType.QUEEN, PlayerColor.WHITE);
            }
            else{
                return new KingModel(PieceType.KING, PlayerColor.WHITE);
            }
        }
        else if(row == 8){
            if(col == 'a' || col == 'h'){
                return new RookModel(PieceType.ROOK,PlayerColor.BLACK);
            }
            else if(col== 'b' || col == 'g'){
                return new KnightModel(PieceType.KNIGHT, PlayerColor.BLACK);
            }
            else if(col== 'c' || col == 'f'){
                return new BishopModel(PieceType.BISHOP, PlayerColor.BLACK);
            }
            else if(col == 'd'){
                return new QueenModel(PieceType.QUEEN, PlayerColor.BLACK);
            }
            else{
                return new KingModel(PieceType.KING, PlayerColor.BLACK);
            }
        }
        else{
            return undefined;
        }
    }

    public clone():ChessBoardModel{
        const clone = new ChessBoardModel(this.playerColor);

        clone.chessBoard = this.chessBoard.map((row) =>
            row.map((square) => {
            const clonedSquare = new SquareModel(square.getColor(), square.getPos());
            const piece = square.getPiece();
            if (piece) {
                const clonedPiece = Object.assign(Object.create(Object.getPrototypeOf(piece)), piece)
                clonedSquare.setPiece(clonedPiece);
            }
            return clonedSquare;
            })
        );

        clone.posMap = new Map(this.posMap);
        return clone;
    }
}