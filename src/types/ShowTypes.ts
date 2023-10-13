export interface ShowDetails {
    id: number;
    name: string;
    image: { medium: string} ;
    genres: string[];
    rating: { average: number };
    url: string;
    status: string;
    schedule: { days: string[]; time: string };
    summary: string;
}

export interface ShowItem {
    id: number
    name: string;
    image: { medium: string };
    rating: { average: number };
}

export interface Show {
    id: number;
    show: ShowItem;
}