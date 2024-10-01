export interface User{
    id?:string;
    userName:string;
    password:string;
    games?:games[];

}

export interface games{
    id:string;
    date:Date;
    status:status;
}
export enum status{
    win="win",
    lose="lose",
    draw="draw"
}
