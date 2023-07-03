// import { SquareModel } from "../model/SquareModel";
// import { BishopModel } from "../model/pieces/BishopModel";
// import { KingModel } from "../model/pieces/KingModel";
// import { KnightModel } from "../model/pieces/KnightModel";
// import { PawnModel } from "../model/pieces/PawnModel";
// import { QueenModel } from "../model/pieces/QueenModel";
// import { RookModel } from "../model/pieces/RookModel";

export const ROW_VALUES = ['a','b','c','d','e','f','g','h'];

export const COL_VALUES = [1,2,3,4,5,6,7,8];

export const BOARD_SIZE = 8;

export enum PieceType{
    PAWN = 'Pawn',
    BISHOP = 'Bishop',
    KNIGHT = 'Knight',
    ROOK = 'Rook',
    QUEEN = 'Queen',
    KING = 'King'
}

export enum PlayerColor{
    WHITE = 'White',
    BLACK = 'Black'
}
// const whitePieces = [
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new PawnModel(PieceType.PAWN,PlayerColor.WHITE),
//     new RookModel(PieceType.ROOK,PlayerColor.WHITE),
//     new KnightModel(PieceType.KNIGHT, PlayerColor.WHITE),
//     new BishopModel(PieceType.BISHOP, PlayerColor.WHITE),
//     new QueenModel(PieceType.QUEEN, PlayerColor.WHITE),
//     new KingModel(PieceType.KING, PlayerColor.WHITE),
//     new BishopModel(PieceType.BISHOP, PlayerColor.WHITE),
//     new KnightModel(PieceType.KNIGHT, PlayerColor.WHITE),
//     new RookModel(PieceType.ROOK,PlayerColor.WHITE)
// ];

//  const blackPieces = [
//     new RookModel(PieceType.ROOK,PlayerColor.BLACK),
//     new KnightModel(PieceType.KNIGHT, PlayerColor.BLACK),
//     new BishopModel(PieceType.BISHOP, PlayerColor.BLACK),
//     new QueenModel(PieceType.QUEEN, PlayerColor.BLACK),
//     new KingModel(PieceType.KING, PlayerColor.BLACK),
//     new BishopModel(PieceType.BISHOP, PlayerColor.BLACK),
//     new KnightModel(PieceType.KNIGHT, PlayerColor.BLACK),
//     new RookModel(PieceType.ROOK,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK),
//     new PawnModel(PieceType.PAWN,PlayerColor.BLACK)
// ];
