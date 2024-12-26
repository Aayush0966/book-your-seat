import { nowPlayingApiUrl } from '@/lib/constants'
import {Store } from '@/types/movie'
import axios from 'axios'
import {create} from 'zustand'

const useMovieStore = create<Store>((set) => ({
  items: [],
  isLoading: true, 
  error: null,
  fetchItems: async () => {
    try {
        const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(`${nowPlayingApiUrl}?api_key=${api_key}`);
        const data = response.data.results;
      set({ items: data, isLoading: false }) 
    } catch (error) {
      set({ error: `Failed to fetch items: ${error}`, isLoading: false }) 
    }
  },
}))

useMovieStore.getState().fetchItems()

export default useMovieStore

