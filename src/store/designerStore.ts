import { create } from 'zustand'
import { ILocation, IProject } from '../types/locationstypes'
import { devtools, persist } from 'zustand/middleware'
import { getLocations } from '../services/locationServices'

interface DesignerState {
  studyType: "theoretical" | "real"
  setStudyType: (type: "theoretical" | "real") => void
  location: ILocation | null
  setLocation: (location: ILocation | null) => void
  locations: ILocation[]
  getLocationsInformation: () => Promise<void>
  currentProject: IProject | null
  setCurrentProject: (project: IProject | null) => void
  previewProject: IProject | null
  setPreviewProject: (project: IProject | null) => void
}

export const useDesignerStore = create<DesignerState>()(
  devtools(
    persist(
      (set) => ({
        studyType: "theoretical",
        location: null,
        setStudyType: (type) => set({ studyType: type }),
        setLocation: (location) => set({ location: location }),
        currentProject: null,
        setCurrentProject: (project) => set({ currentProject: project }),
        previewProject: null,
        setPreviewProject: (project) => set({ previewProject: project }),
        locations: [],
        getLocationsInformation: async () => {
          const locations: any = await getLocations();
          set({ locations: locations });
        },
      }),
      { name: 'designerStore' },
    ),
  ),
)
