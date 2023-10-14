export interface ShowImage {
    medium: string
}

export interface ShowRating {
    average: number
}

export interface ShowsChedule {
    days: string[]; 
    time: string
}

export interface ShowDetails {
    id: number;
    name?: string;
    image?: ShowImage;
    genres: string[];
    rating: ShowRating;
    url: string;
    status: string;
    schedule: ShowsChedule;
    summary: string;
}

export interface ShowItem {
    id: number;
    name: string;
    image: ShowImage;
    rating: ShowRating;
}

export interface Show {
    id: number;
    show: ShowItem;
}
