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
        let col = ROW_VALUES;
        let row = [...COL_VALUES].reverse();
       
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
    public move(fromSquare:SquareModel, toSquare:SquareModel){
        if(fromSquare && toSquare){
            let pieceOnFromSquare: PieceModel | undefined = fromSquare.getPiece();
            if(!pieceOnFromSquare) return;

            if(this.castleMove(fromSquare,toSquare)) return;
            if(!this.validMove(fromSquare,toSquare,pieceOnFromSquare.getColor())) return;
            
            pieceOnFromSquare.beenMoved = true;
            fromSquare.setPiece(undefined);
            toSquare.setPiece(pieceOnFromSquare);
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

    public isKingInCheck(kingColor:PlayerColor): boolean {
        const kingLocation = this.searchBoardForPiece(PieceType.KING, kingColor)
        const kingPos = kingLocation.pos;
        if(!kingPos) return false;

        const king = kingLocation.piece as KingModel;
        if(!king) return false;

        return king.kingInCheck(this,kingPos);
    }
    public castleMove(startSquare:SquareModel, endSquare:SquareModel){
        const king = startSquare.getPiece();
        let rookSquare = null;
        let newRookSquare = null;
        const endSquarePos = endSquare.getPos();
        console.log(endSquarePos);

        if(!king || king.getType() !== PieceType.KING) return false;
        if(king.beenMoved) return false;
        if( endSquarePos !== "c1" && endSquarePos !== "g1" &&
            endSquarePos !== "c8" && endSquarePos !== "g8") return false;
        const kingColor = king.getColor();
        const row = kingColor === PlayerColor.WHITE? 7:0;

        if(endSquarePos.charAt(0) === "g"){
            rookSquare = this.chessBoard[row][7];
            if( this.chessBoard[row][6].getPiece() ||
                this.chessBoard[row][5].getPiece()
            ) return false;
            newRookSquare = this.chessBoard[row][5];
        }
        else{
            rookSquare = this.chessBoard[row][0]; 
            if( this.chessBoard[row][3].getPiece() ||
                this.chessBoard[row][2].getPiece() ||
                this.chessBoard[row][1].getPiece()
            ) return false;
            newRookSquare = this.chessBoard[row][3];
        }
        const rook = rookSquare.getPiece();
        if(!rook || rook.getType() !== PieceType.ROOK) return false;
        if(rook.beenMoved) return false;

        rookSquare.setPiece(undefined);
        startSquare.setPiece(undefined);
        newRookSquare.setPiece(rook);
        endSquare.setPiece(king);
        king.beenMoved = true;
        rook.beenMoved = true;
        return true;
    }
    public searchBoardForPiece(pieceType:PieceType,pieceColor:PlayerColor):{pos:string | undefined, piece:PieceModel | undefined}{
        for(let row of this.chessBoard){
            for(let square of row){
                const piece = square.getPiece();
                if(piece && 
                   piece.getType() === pieceType &&
                   piece.getColor() === pieceColor
                   ) return {pos: square.getPos(), piece: piece};
            }
        }
        return {pos:undefined, piece:undefined};
    }
    public searchBoardFromPos(ignorePiece:PieceModel,startPos:string, directions:Object, pieceType:PieceType, callback:Function){
        const board = this.getChessBoard();
        const posArray = this.posToArrayPos(startPos);
        if(!posArray) return false;

        for(const [key,value] of Object.entries(directions)){
            let i = posArray.i;
            let j = posArray.j;

            let result = callback(board,ignorePiece,i,j,value,pieceType);
            if(result) return true;
        }

        return false;
    }
    public findPiece(board: Array<Array<SquareModel>>,ignorePiece:PieceModel,i:number,j:number,direction:{dx:number,dy:number}, pieceType:PieceType){
        i += direction.dy;
        j += direction.dx;
        if(ChessBoardModel.withinBoard(i,j)){
            const currentPiece = board[i][j].getPiece();
            if(currentPiece && currentPiece.getColor() !== ignorePiece.getColor()){
                if( currentPiece.getType() == pieceType ){
                        return true;
                }
                else{
                    return false;
                }
            }else if( currentPiece && 
                        currentPiece.getColor() === ignorePiece.getColor() &&
                        currentPiece !== ignorePiece){
                return false;
            }
        }
        return false;
    }
    public findPieceInDirection(board: Array<Array<SquareModel>>,ignorePiece:PieceModel,i:number,j:number,direction:{dx:number,dy:number}, pieceType:PieceType){
        let flag = true;
        while(flag){
            i += direction.dy;
            j += direction.dx;


            if(ChessBoardModel.withinBoard(i,j)){
                const currentPiece = board[i][j].getPiece();
                if(currentPiece && currentPiece.getColor() !== ignorePiece.getColor()){
                    if( currentPiece.getType() == pieceType){
                            return true;
                    }
                    else{
                        flag = false;
                    }
                }else if( currentPiece && 
                            currentPiece.getColor() === ignorePiece.getColor() &&
                            currentPiece !== ignorePiece){
                    flag = false;
                }
            }
            else flag = false;
        }       
        return false;  
    }
    public findPawnAttack(ignorePiece:PieceModel,kingPos:string){
        let pawnDirection = PawnModel.pawnDirections(ignorePiece.getColor());
        const posArray = this.posToArrayPos(kingPos);
        if(!posArray) return false;
        let leftTakes = pawnDirection.takes.left;
        let rightTakes = pawnDirection.takes.right;

        return this.findPiece(this.chessBoard,ignorePiece,posArray.i,posArray.j,leftTakes,PieceType.PAWN) ||
               this.findPiece(this.chessBoard,ignorePiece,posArray.i,posArray.j,rightTakes,PieceType.PAWN)
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
    public static withinBoard(i:number, j:number){
        return i>=0 &&
               i<BOARD_SIZE &&
               j>=0 &&
               j<BOARD_SIZE;
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