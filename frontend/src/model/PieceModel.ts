
export class PieceModel{
    protected type:string;
    protected color:string;
    public imageURI:string;

    public constructor(type: string, color: string){
        this.type = type;
        this.color = color;
        this.imageURI = `/assets/images/${color+type}.png`
    }
    public getType(): string{
        return this.type;
    }
    public getColor(): string{
        return this.color;
    }

}