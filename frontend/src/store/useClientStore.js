import { create } from 'zustand'

const useClientStore = create((set, get) => ({
  mainTab: 'home',
  jobTab: 'Ongoing Jobs',
  postJobFlowTrigger: 0,

  setMainTab: tab => set({ mainTab: tab, jobTab: 'Ongoing Jobs' }),
  setJobTab: tab => set({ jobTab: tab }),
  triggerPostJobFlow: () =>
    set(state => ({
      jobTab: 'Post Jobs',
      postJobFlowTrigger: state.postJobFlowTrigger + 1,
    })),
}))

export default useClientStore
