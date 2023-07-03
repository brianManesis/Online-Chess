import { ROW_VALUES, COL_VALUES, PlayerColor, PieceType, BOARD_SIZE } from "../utils/Constants";
import { PieceModel } from "./pieces/PieceModel";
import { PawnModel } from "./pieces/PawnModel";
import { RookModel } from "./pieces/RookModel";
import { KnightModel } from "./pieces/KnightModel";
import { BishopModel } from "./pieces/BishopModel";
import { QueenModel } from "./pieces/QueenModel";
import { KingModel } from "./pieces/KingModel";
import { SquareModel } from "./SquareModel";

export class ChessBoardModel{
    private chessBoard: Array<Array<SquareModel>>;
    private posMap:Map<string,{i:number,j:number}> = new Map();
    private whitePieces:Array<PieceModel>;
    private blackPieces:Array<PieceModel>;
    private moveList:Array<{fromSquare:string, toSquare:string}>=[];
    public turn:PlayerColor;

    public constructor(){
        this.whitePieces = whitePieces;
        this.blackPieces = blackPieces;
        this.chessBoard = [[],[],[],[],[],[],[],[]];
        this.initBoard();
        this.turn = PlayerColor.WHITE;
    }

    public move(startPos:string, endPos:string){
        const fromSquare = this.getSquareByPos(startPos);
        const toSquare = this.getSquareByPos(endPos);

        if(!fromSquare || !toSquare) return false;

        let pieceOnFromSquare: PieceModel | undefined = fromSquare.getPiece();
        if(!pieceOnFromSquare) return false;

        let pieceColor = pieceOnFromSquare.getColor();
        if(pieceColor !== this.turn) return false;
        if(this.checkmate(pieceColor)) return false;
        if(this.castleMove(fromSquare,toSquare)) return true;
        if(this.queeningMove(fromSquare,toSquare)) return true;
        if(this.enPassant(fromSquare,toSquare)) return true;
        if(!this.validMove(fromSquare,toSquare,pieceColor)) return false;

        pieceOnFromSquare.beenMoved = true;
        fromSquare.setPiece(undefined);
        toSquare.setPiece(pieceOnFromSquare);
        this.moveList.push({fromSquare:fromSquare.getPos(),toSquare:toSquare.getPos()});
        this.changeTurn();
        return true;
    }
    public checkmate(pieceColor:PlayerColor){
        const search = this.searchBoardForPiece(PieceType.KING,pieceColor);
        const king = search.piece as KingModel;
        const kingPos = search.pos;
        if(!king || !kingPos) return false;
        if(!king.kingInCheck(this,kingPos)) return false;
    }
    public validMove(startSquare:SquareModel, endSquare:SquareModel, playerColor:PlayerColor){
        const pieceMove = startSquare.getPiece();
        if(pieceMove &&
           pieceMove.validMove(this,startSquare,endSquare,playerColor)){
           return true;
        }
        return false;
    }

    public castleMove(startSquare:SquareModel, endSquare:SquareModel){
        const king = startSquare.getPiece() as KingModel;
        let rookSquare = null;
        let newRookSquare = null;
        const endSquarePos = endSquare.getPos();

        if(!king || king.getType() !== PieceType.KING) return false;
        if(king.beenMoved) return false;
        if( endSquarePos !== "c1" && endSquarePos !== "g1" &&
            endSquarePos !== "c8" && endSquarePos !== "g8") return false;
        const kingColor = king.getColor();
        const row = kingColor === PlayerColor.WHITE? 7:0;

        if(endSquarePos.charAt(0) === "g"){
            rookSquare = this.chessBoard[row][7];
            if( this.chessBoard[row][6].getPiece() || king.kingInCheck(this,this.chessBoard[row][6].getPos())||
                this.chessBoard[row][5].getPiece() || king.kingInCheck(this,this.chessBoard[row][5].getPos())
            ) return false;
            newRookSquare = this.chessBoard[row][5];
        }
        else{
            rookSquare = this.chessBoard[row][0]; 
            if( this.chessBoard[row][3].getPiece() || king.kingInCheck(this,this.chessBoard[row][3].getPos())||
                this.chessBoard[row][2].getPiece() || king.kingInCheck(this,this.chessBoard[row][2].getPos())||
                this.chessBoard[row][1].getPiece() || king.kingInCheck(this,this.chessBoard[row][1].getPos())
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
        this.moveList.push({fromSquare:startSquare.getPos(),toSquare:endSquare.getPos()});
        this.changeTurn();
        return true;
    }
    private queeningMove(startSquare:SquareModel, endSquare:SquareModel){
        const pawn = startSquare.getPiece();
        const endSquarePos = this.posToArrayPos(endSquare.getPos());
        if(!pawn || pawn.getType() !== PieceType.PAWN) return false;
        if(!endSquarePos) return false;
        
        const pawnColor = pawn.getColor();
        let endRow = pawnColor === PlayerColor.WHITE? 0:7;
        let endSquareRow = endSquarePos.i;
        
        if(pawnColor===PlayerColor.WHITE && endSquareRow!==endRow) return false;
        else if(pawnColor===PlayerColor.BLACK && endSquareRow!==endRow) return false;

        startSquare.setPiece(undefined);
        endSquare.setPiece(new QueenModel(PieceType.QUEEN,pawnColor));
        this.moveList.push({fromSquare:startSquare.getPos(),toSquare:endSquare.getPos()});
        this.changeTurn();
        return true;
    }
    private enPassant(startSquare:SquareModel, endSquare:SquareModel){
        const board = this.chessBoard;
        const pawn = startSquare.getPiece();
        const startSquarePos = this.posToArrayPos(startSquare.getPos());
        if(this.moveList.length === 0) return false;

        const lastMove = this.getMoveList().slice(-1)[0];
        const pieceLastMovedNewPos = this.posToArrayPos(lastMove.toSquare);
        const pieceLastMovedOldPos = this.posToArrayPos(lastMove.fromSquare);

        if(!pawn || pawn.getType() !== PieceType.PAWN) return false;
        if(!startSquarePos) return false;
        if(!pieceLastMovedNewPos || !pieceLastMovedOldPos) return false;

        let direction = PawnModel.pawnDirections(pawn.getColor());
        
        const pieceLastMoved = board[pieceLastMovedNewPos.i][pieceLastMovedNewPos.j];

        let pieceLeft;
        let pieceRight;
        if(ChessBoardModel.withinBoard(startSquarePos.i,startSquarePos.j-1)){
            pieceLeft = board[startSquarePos.i][startSquarePos.j-1];
        }
        if(ChessBoardModel.withinBoard(startSquarePos.i,startSquarePos.j+1)){
            pieceRight = board[startSquarePos.i][startSquarePos.j+1];
        }
        let pieceLeftTakes = board[startSquarePos.i+direction.takes.left.dy][startSquarePos.j+direction.takes.left.dx];
        let pieceRightTakes = board[startSquarePos.i+direction.takes.right.dy][startSquarePos.j+direction.takes.right.dx];
        let pieceLastMovedDx = Math.abs(pieceLastMovedNewPos.j-pieceLastMovedOldPos.j);
        let pieceLastMovedDy = Math.abs(pieceLastMovedNewPos.i-pieceLastMovedOldPos.i);
        if(pieceLastMoved === pieceLeft && pieceLastMovedDx===0 && pieceLastMovedDy===2 && endSquare === pieceLeftTakes){
            startSquare.setPiece(undefined);
            pieceLeft.setPiece(undefined);
            pieceLeftTakes.setPiece(pawn);
            this.moveList.push({fromSquare:startSquare.getPos(),toSquare:endSquare.getPos()});
            this.changeTurn();
            return true;
        }
        if(pieceLastMoved === pieceRight && pieceLastMovedDx===0 && pieceLastMovedDy===2 && endSquare === pieceRightTakes){
            startSquare.setPiece(undefined);
            pieceRight.setPiece(undefined);
            pieceRightTakes.setPiece(pawn);
            this.moveList.push({fromSquare:startSquare.getPos(),toSquare:endSquare.getPos()});
            this.changeTurn();
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

        for(const [,value] of Object.entries(directions)){
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
                if( currentPiece.getType() === pieceType ){
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
                    if( currentPiece.getType() === pieceType){
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
    public getChessBoard():Array<Array<SquareModel>>{
        return this.chessBoard;
    }
    public getMoveList(){
        return this.moveList;
    }
    public getPosMap():Map<string,{i:number,j:number}>{
        return this.posMap;
    }
    public posToArrayPos(pos: string){
        return this.posMap.get(pos);
    }

    public getSquareByPos(pos: string){
        let arrayPos = this.posMap.get(pos);
        if(!arrayPos) return null;

        let iPos = arrayPos.i;
        let jPos = arrayPos.j;
        const square = this.chessBoard[iPos][jPos];
        if(!square) return null;

        return square;
    }
    public static withinBoard(i:number, j:number){
        return i>=0 &&
               i<BOARD_SIZE &&
               j>=0 &&
               j<BOARD_SIZE;
    }
    private changeTurn() {
        this.turn = this.turn === PlayerColor.WHITE?
            PlayerColor.BLACK:
            PlayerColor.WHITE;
    }

    private initBoard(){
        let col = ROW_VALUES;
        let row = [...COL_VALUES].reverse();
        let k = 0, n = 0;
        for(let i = 0; i< BOARD_SIZE; i++){
            for(let j = 0; j< BOARD_SIZE; j++){

                let pos:string = col[j]+row[i];
                this.posMap.set(pos,{i:i, j:j});
                let color = (j+i+2) % 2 === 0? PlayerColor.WHITE:PlayerColor.BLACK;
                
                if(i===0 || i===1){
                    this.chessBoard[i].push(
                        new SquareModel(color,pos,this.blackPieces[k])
                    );
                    k++;
                }
                else if(i===6 || i===7){
                    this.chessBoard[i].push(
                        new SquareModel(color,pos,this.whitePieces[n])
                    );
                    n++;
                }
                else{
                    this.chessBoard[i].push(
                        new SquareModel(color,pos)
                    );
                }
            }
        }
    }

    public clone():ChessBoardModel{
        const clone =Object.assign(Object.create(Object.getPrototypeOf(this)), this);
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
 const whitePieces = [
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
    new RookModel(PieceType.ROOK,PlayerColor.WHITE),
    new KnightModel(PieceType.KNIGHT, PlayerColor.WHITE),
    new BishopModel(PieceType.BISHOP, PlayerColor.WHITE),
    new QueenModel(PieceType.QUEEN, PlayerColor.WHITE),
    new KingModel(PieceType.KING, PlayerColor.WHITE),
    new BishopModel(PieceType.BISHOP, PlayerColor.WHITE),
    new KnightModel(PieceType.KNIGHT, PlayerColor.WHITE),
    new RookModel(PieceType.ROOK,PlayerColor.WHITE)
];

 const blackPieces = [
    new RookModel(PieceType.ROOK,PlayerColor.BLACK),
    new KnightModel(PieceType.KNIGHT, PlayerColor.BLACK),
    new BishopModel(PieceType.BISHOP, PlayerColor.BLACK),
    new QueenModel(PieceType.QUEEN, PlayerColor.BLACK),
    new KingModel(PieceType.KING, PlayerColor.BLACK),
    new BishopModel(PieceType.BISHOP, PlayerColor.BLACK),
    new KnightModel(PieceType.KNIGHT, PlayerColor.BLACK),
    new RookModel(PieceType.ROOK,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
    new PawnModel(PieceType.PAWN,PlayerColor.BLACK)
];