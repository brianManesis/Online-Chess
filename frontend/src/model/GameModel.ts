import { PlayerColor } from "../utils/Constants";
import { ChessBoardModel } from "./ChessBoardModel";

export class GameModel{
    private boardModel:ChessBoardModel;
    public turn:PlayerColor;

    public constructor(){
        this.turn = PlayerColor.WHITE;
        this.boardModel = new ChessBoardModel();
    }

    public move(startPos:string,endPos:string){
        console.log(this.turn);

        if(this.boardModel.move(startPos,endPos)){
            this.turn = this.turn === PlayerColor.WHITE?
            PlayerColor.BLACK:
            PlayerColor.WHITE;
        }
    }
    public getBoardModel(){
        return this.boardModel;
    }
    public setBoardModel(boardModel:ChessBoardModel){
        this.boardModel = boardModel;
    }
}