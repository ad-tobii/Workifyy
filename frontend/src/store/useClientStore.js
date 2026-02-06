import { create } from 'zustand'

const useClientStore = create((set, get) => ({
  mainTab: 'home',
  jobTab: 'Post Jobs',

  setMainTab: tab => set({ mainTab: tab, jobTab: 'Post Jobs' }),
  setJobTab: tab => set({ jobTab: tab }),
}))

export default useClientStore
