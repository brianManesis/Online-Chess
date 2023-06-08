import { PieceModel } from "./PieceModel";
import { SquareModel } from "./SquareModel";
import { ROW_VALUES, COL_VALUES, PlayerColor, PieceType, BOARD_SIZE} from "../Constants";

export class ChessBoardModel{
    private chessBoard: Array<Array<SquareModel>>;
    private playerColor:string;

    public constructor(playerColor:string){
        this.playerColor = playerColor;
        let col = playerColor =="White"?
        ROW_VALUES:[...ROW_VALUES].reverse();

        let row = playerColor == "White"?
        [...COL_VALUES].reverse():COL_VALUES;
       
        this.chessBoard = [[],[],[],[],[],[],[],[]];
        for(let i = 0; i< BOARD_SIZE; i++){
            for(let j = 0; j< BOARD_SIZE; j++){

                let pos:string = col[j]+row[i];
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
    private genPiece(col:string,row:number): PieceModel | undefined{
        if(row == 2){
            return new PieceModel(PieceType.PAWN,"White");
        }
        else if(row == 7){
            return new PieceModel(PieceType.PAWN,"Black");
        }
        else if(row == 1){
            if(col == 'a' || col == 'h'){
                return new PieceModel(PieceType.ROOK,"White");
            }
            else if(col== 'b' || col == 'g'){
                return new PieceModel(PieceType.KNIGHT, "White");
            }
            else if(col== 'c' || col == 'f'){
                return new PieceModel(PieceType.BISHOP, "White");
            }
            else if(col == 'd'){
                return new PieceModel(PieceType.QUEEN, "White");
            }
            else{
                return new PieceModel(PieceType.KING, "White");
            }
        }
        else if(row == 8){
            if(col == 'a' || col == 'h'){
                return new PieceModel(PieceType.ROOK,"Black");
            }
            else if(col== 'b' || col == 'g'){
                return new PieceModel(PieceType.KNIGHT, "Black");
            }
            else if(col== 'c' || col == 'f'){
                return new PieceModel(PieceType.BISHOP, "Black");
            }
            else if(col == 'd'){
                return new PieceModel(PieceType.QUEEN, "Black");
            }
            else{
                return new PieceModel(PieceType.KING, "Black");
            }
        }
        else{
            return undefined;
        }
    }
}