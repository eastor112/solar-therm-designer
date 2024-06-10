import { create } from 'zustand'
import { ILocation, IProject } from '../types/locationstypes'
import { devtools, persist } from 'zustand/middleware'
import { getLocations } from '../services/locationServices'
import { getProjectService } from '../services/projectsServices'

interface DesignerState {
  studyType: "theoretical" | "real"
  setStudyType: (type: "theoretical" | "real") => void
  currentLocation: ILocation | null
  setCurrentLocation: (location: ILocation | null) => void
  locations: ILocation[]
  getLocationsInformation: () => Promise<void>
  currentProject: IProject | null
  setCurrentProject: (project: IProject | null) => void
  getProject: (id: number) => Promise<void>
  previewProject: IProject | null
  setPreviewProject: (project: IProject | null) => void
  // PARAMS
  date: string | null
  setDate: (date: string | null) => void
  pipeNumber: number | null
  setPipeNumber: (pipeNumber: number | null) => void
  pipeType: number | null
  setPipeType: (pipeType: number | null) => void
}

export const useDesignerStore = create<DesignerState>()(
  devtools(
    persist(
      (set) => ({
        studyType: "theoretical",
        currentLocation: null,
        setStudyType: (type) => set({ studyType: type }),
        setCurrentLocation: (location) => set({ currentLocation: location }),
        currentProject: null,
        setCurrentProject: (project) => set({ currentProject: project }),

        date: null,
        setDate: (date) => set({ date: date }),
        pipeNumber: null,
        setPipeNumber: (pipeNumber) => set({ pipeNumber: pipeNumber }),
        pipeType: null,
        setPipeType: (pipeType) => set({ pipeType: pipeType }),
        getProject: async (projectId: number) => {
          const project = await getProjectService(projectId);
          if (project.location) {
            set({ currentLocation: project.location })
          }
          set({ date: project.date })
          set({ pipeNumber: project.pipeline_number ? project.pipeline_number : 0 })
          set({ pipeType: project.pipeline_type ? project.pipeline_type : 0 })
        },
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
