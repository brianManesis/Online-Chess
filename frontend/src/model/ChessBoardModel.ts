import { PieceModel } from "./PieceModel";
import { SquareModel } from "./SquareModel";
import { ROW_VALUES, COL_VALUES, PlayerColor, PieceType, BOARD_SIZE} from "../Constants";
import { possiblePawnMoves } from "./PossibleMoves";

export class ChessBoardModel{
    public chessBoard: Array<Array<SquareModel>>;
    private playerColor:PlayerColor;
    private posMap:Map<string,{i:number,j:number}> = new Map();

    public constructor(playerColor:PlayerColor){
        this.playerColor = playerColor;
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
    public getPosMap():Map<string,{i:number,j:number}>{
        return this.posMap;
    }
    public pieceMove(fromSquare:SquareModel, toSquare:SquareModel){
        if(fromSquare && toSquare){
            let pieceOnFromSquare: PieceModel | undefined = fromSquare.getPiece();
            if(pieceOnFromSquare){
                fromSquare.setPiece(undefined);
                toSquare.setPiece(pieceOnFromSquare);
            }
        }
    }
    public posToArrayPos(pos: string){
        return this.posMap.get(pos);
    }
    public validPawnMove(square:SquareModel, playerColor:PlayerColor){
        const pos = square.getPos();

        return possiblePawnMoves(this,square,playerColor).has(pos);
    }
    private genPiece(col:string,row:number): PieceModel | undefined{
        if(row == 2){
            return new PieceModel(PieceType.PAWN,PlayerColor.WHITE);
        }
        else if(row == 7){
            return new PieceModel(PieceType.PAWN,PlayerColor.BLACK);
        }
        else if(row == 1){
            if(col == 'a' || col == 'h'){
                return new PieceModel(PieceType.ROOK,PlayerColor.WHITE);
            }
            else if(col== 'b' || col == 'g'){
                return new PieceModel(PieceType.KNIGHT, PlayerColor.WHITE);
            }
            else if(col== 'c' || col == 'f'){
                return new PieceModel(PieceType.BISHOP, PlayerColor.WHITE);
            }
            else if(col == 'd'){
                return new PieceModel(PieceType.QUEEN, PlayerColor.WHITE);
            }
            else{
                return new PieceModel(PieceType.KING, PlayerColor.WHITE);
            }
        }
        else if(row == 8){
            if(col == 'a' || col == 'h'){
                return new PieceModel(PieceType.ROOK,PlayerColor.BLACK);
            }
            else if(col== 'b' || col == 'g'){
                return new PieceModel(PieceType.KNIGHT, PlayerColor.BLACK);
            }
            else if(col== 'c' || col == 'f'){
                return new PieceModel(PieceType.BISHOP, PlayerColor.BLACK);
            }
            else if(col == 'd'){
                return new PieceModel(PieceType.QUEEN, PlayerColor.BLACK);
            }
            else{
                return new PieceModel(PieceType.KING, PlayerColor.BLACK);
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
                const clonedPiece = new PieceModel(piece.getType(), piece.getColor());
                clonedSquare.setPiece(clonedPiece);
            }
            return clonedSquare;
            })
        );

        clone.posMap = new Map(this.posMap);
        return clone;
    }
}