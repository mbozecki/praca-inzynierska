export interface Beat {
    uid: string;
    name: string;
    price: number;
    img?: string;
    producedby: string;
    playcount: number;
    type: string[];
    BPM: number;
}