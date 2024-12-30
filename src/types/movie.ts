export interface Movie {
    title: string;
    genre: string;
    duration: number;
    description: string;
    director: string;
    release: number;
    language: string;
    castMembers: string[];
}

export interface Show {
    startDate: number
    endDate : number
    screenId : string
    showTimes: string[]
    seats?: seat[]

}
export interface Price {
  screenId : string
  seatCategory : seat[]
  }

interface seat {
    seatType: string;
    price: number

}

export interface Store {
    items: Movie[]
    isLoading: boolean
    error: string | null
    fetchItems: () => void
  }