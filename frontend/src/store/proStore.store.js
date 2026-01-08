import { create } from 'zustand'
import api from '../api/axios.api'

const useProStore = create((set, get) => ({
  mainTab: 'home',
  jobTab: 'Find Jobs',

  setMainTab: tab => set({ mainTab: tab, jobTab: 'Find Jobs' }),
  setJobTab: tab => set({ jobTab: tab }),
}))
export default useProStore
