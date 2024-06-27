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
  // PARAMS
  // ANGLE PARAMS
  inclination: number
  setInclination: (inclination: number) => void
  azimuth: number
  setAzimuth: (azimuth: number) => void
  // TANK PARAMS
  vol_tk: number
  setVol_tk: (vol_tk: number) => void
  e_tk: number
  setE_tk: (e_tk: number) => void
  e_aisl: number
  setE_aisl: (e_aisl: number) => void
  e_cub: number
  setE_cub: (e_cub: number) => void
  h_int: number
  setH_int: (h_int: number) => void
  h_ext: number
  setH_ext: (h_ext: number) => void
  k_tk: number
  setK_tk: (k_tk: number) => void
  k_aisl: number
  setK_aisl: (k_aisl: number) => void
  k_cub: number
  setK_cub: (k_cub: number) => void

  //PIPELINE PARAMS
  d_int: number,
  setD_int: (d_int: number) => void,
  d_ext: number,
  setD_ext: (d_ext: number) => void,
  l_tubo: number,
  setL_tubo: (l_tubo: number) => void,
  s_sep: number,
  setS_sep: (s_sep: number) => void,
  n_tubos: number,
  setN_tubos: (n_tubos: number) => void,
  //   tau_glas
  // alpha_glass
  // setTau_glas
  // setAlpha_glass
  tau_glass: number,
  setTau_glass: (tau_glas: number) => void,
  alpha_glass: number,
  setAlpha_glass: (alpha_glass: number) => void,
}

export const useDesignerStore = create<DesignerState>()(
  devtools(
    persist(
      (set) => ({
        studyType: "theoretical",

        setStudyType: (type) => set({ studyType: type }),

        currentLocation: null,

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

        // PARAMS
        // ANGLE PARAMS
        inclination: 15,

        setInclination: (inclination: number) => set({ inclination: inclination }),

        azimuth: 180,

        setAzimuth: (azimuth: number) => set({ azimuth: azimuth }),

        // TANK PARAMS
        vol_tk: 0.3,

        setVol_tk: (vol_tk: number) => set({ vol_tk: vol_tk }),

        e_tk: 0.0004,

        setE_tk: (e_tk: number) => set({ e_tk: e_tk }),

        e_aisl: 0.005,

        setE_aisl: (e_aisl: number) => set({ e_aisl: e_aisl }),

        e_cub: 0.0004,

        setE_cub: (e_cub: number) => set({ e_cub: e_cub }),

        h_int: 10,

        setH_int: (h_int: number) => set({ h_int: h_int }),

        h_ext: 25,

        setH_ext: (h_ext: number) => set({ h_ext: h_ext }),

        k_tk: 14.9,

        setK_tk: (k_tk: number) => set({ k_tk: k_tk }),

        k_aisl: 0.06,

        setK_aisl: (k_aisl: number) => set({ k_aisl: k_aisl }),

        k_cub: 14.9,

        setK_cub: (k_cub: number) => set({ k_cub: k_cub }),
        //PIPELINE PARAMS
        d_int: 48,

        setD_int: (d_int: number) => set({ d_int: d_int }),

        d_ext: 58,

        setD_ext: (d_ext: number) => set({ d_ext: d_ext }),

        l_tubo: 1.8,

        setL_tubo: (l_tubo: number) => set({ l_tubo: l_tubo }),

        s_sep: 0.056,

        setS_sep: (s_sep: number) => set({ s_sep: s_sep }),

        n_tubos: 30,

        setN_tubos: (n_tubos: number) => set({ n_tubos: n_tubos }),

        tau_glass: 0.93,

        setTau_glass: (tau_glas: number) => set({ tau_glass: tau_glas }),

        alpha_glass: 0.89,

        setAlpha_glass: (alpha_glass: number) => set({ alpha_glass: alpha_glass }),
      }),
      { name: 'designerStore' },
    ),
  ),
)
