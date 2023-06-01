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

    public genChessBoard():Array<Array<SquareModel>>{
        return this.chessBoard;
    }
    private genPiece(col:string,row:number): PieceModel | undefined{
        if(row == 2){
            return new PieceModel("Pawn","White");
        }
        else if(row == 7){
            return new PieceModel("Pawn","Black");
        }
        else if(row == 1){
            if(col == 'a' || col == 'h'){
                return new PieceModel("Rook","White");
            }
            else if(col== 'b' || col == 'g'){
                return new PieceModel("Knight", "White");
            }
            else if(col== 'c' || col == 'f'){
                return new PieceModel("Bishop", "White");
            }
            else if(col == 'd'){
                return new PieceModel("Queen", "White");
            }
            else{
                return new PieceModel("King", "White");
            }
        }
        else if(row == 8){
            if(col == 'a' || col == 'h'){
                return new PieceModel("Rook","Black");
            }
            else if(col== 'b' || col == 'g'){
                return new PieceModel("Knight", "Black");
            }
            else if(col== 'c' || col == 'f'){
                return new PieceModel("Bishop", "Black");
            }
            else if(col == 'd'){
                return new PieceModel("Queen", "Black");
            }
            else{
                return new PieceModel("King", "Black");
            }
        }
        else{
            return undefined;
        }
    }
}