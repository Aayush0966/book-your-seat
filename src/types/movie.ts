export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export interface Store {
    items: Movie[]
    isLoading: boolean
    error: string | null
    fetchItems: () => void
  }