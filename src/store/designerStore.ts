import { create } from 'zustand';
import { IProjectData } from '../types/locationstypes';
import { devtools, persist } from 'zustand/middleware';
import {
  ICalculateParamsBody,
  createProjectService,
  getAllProjectsService,
  getProjectResults,
  getProjectService,
} from '../services/projectsServices';
import { clearProjectStorage } from '../utils/clearProjectStorage';
import { INewProject } from '../types/projects';

interface GetAllProjectsParams {
  limit: number;
  page: number;
  filter?: string;
}

interface DesignerState {
  studyType: 'theoretical' | 'real';
  setStudyType: (type: 'theoretical' | 'real') => void;
  currentProject: INewProject | null;
  setCurrentProject: (project: INewProject | null) => void;
  getProject: (id: number) => Promise<void>;
  previewProject: INewProject | null;
  setPreviewProject: (project: INewProject | null) => void;

  createProject: (projectName: string) => void;

  projectsData: IProjectData | null;
  recentFiles: IProjectData | null;
  getAllProjects: (params: GetAllProjectsParams) => Promise<void>;
  getRecentFiles: (params: GetAllProjectsParams) => Promise<void>;
  openProject: (project: INewProject) => void;
  updateProject: () => Promise<void>;
  closeProject: () => void;
  projectsPerPage: number;

  calculate: () => Promise<void>;
  results: any;

  // PARAMS
  name_project: string;
  setName_project: (name_project: string) => void;
  place: number;
  setPlace: (place: number) => void;
  latitud: number;
  setLatitud: (latitud: number) => void;
  longitud: number;
  setLongitud: (longitud: number) => void;
  t_amb: number;
  setT_amb: (t_amb: number) => void;
  v_viento: number;
  setV_viento: (v_viento: number) => void;
  altura: number;
  setAltura: (altura: number) => void;
  date: string | null;
  setDate: (date: string | null) => void;

  // ANGLE PARAMS
  inclination: number;
  setInclination: (inclination: number) => void;
  azimuth: number;
  setAzimuth: (azimuth: number) => void;

  // TANK PARAMS
  vol_tk: number;
  setVol_tk: (vol_tk: number) => void;
  e_tk: number;
  setE_tk: (e_tk: number) => void;
  e_aisl: number;
  setE_aisl: (e_aisl: number) => void;
  e_cub: number;
  setE_cub: (e_cub: number) => void;
  // MODAL TANK PARAMS
  h_int: number;
  setH_int: (h_int: number) => void;
  h_ext: number;
  setH_ext: (h_ext: number) => void;
  k_tk: number;
  setK_tk: (k_tk: number) => void;
  k_aisl: number;
  setK_aisl: (k_aisl: number) => void;
  k_cub: number;
  setK_cub: (k_cub: number) => void;

  // PIPELINE PARAMS
  d_int: number;
  setD_int: (d_int: number) => void;
  d_ext: number;
  setD_ext: (d_ext: number) => void;
  l_tubo: number;
  setL_tubo: (l_tubo: number) => void;
  s_sep: number;
  setS_sep: (s_sep: number) => void;
  n_tubos: number;
  setN_tubos: (n_tubos: number) => void;
  // MODAL PIPELINE PARAMS
  tau_glass: number;
  setTau_glass: (tau_glas: number) => void;
  alpha_glass: number;
  setAlpha_glass: (alpha_glass: number) => void;

  // MODAL OTHER GENERAL PARAMS
  n_div: number;
  setN_div: (n_div: number) => void;
  nn: number;
  setNn: (nn: number) => void;
  beta_coef: number;
  setBeta_coef: (beta_coef: number) => void;
  f_flujo: number;
  setF_flujo: (f_flujo: number) => void;
}

export const useDesignerStore = create<DesignerState>()(
  devtools(
    persist(
      (set, get) => ({
        studyType: 'theoretical',

        setStudyType: type => set({ studyType: type }),

        currentProject: null,

        setCurrentProject: project => set({ currentProject: project }),

        getProject: async (projectId: number) => {
          const project = await getProjectService(projectId);
          set({ date: project.date_time });
        },

        previewProject: null,

        setPreviewProject: project => set({ previewProject: project }),

        createProject: async (projectName: string) => {
          const newProject = await createProjectService(projectName);
          set({ currentProject: newProject });
        },

        projectsData: null,

        getAllProjects: async params => {
          const projects = await getAllProjectsService(
            params.limit,
            params.page,
            params.filter
          );
          set({ projectsData: projects });
        },

        recentFiles: null,

        getRecentFiles: async params => {
          const projects = await getAllProjectsService(
            params.limit,
            params.page
          );
          set({ recentFiles: projects });
        },

        updateProject: async () => {
          const body: ICalculateParamsBody = {
            name_project: get().name_project,
            place: get().place,
            latitud: get().latitud,
            longitud: get().longitud,
            t_amb: get().t_amb,
            v_viento: get().v_viento,
            altitud: get().altura,
            date_time: get().date,
            inclinacion: get().inclination,
            azimuth: get().azimuth,
            vol_tank: get().vol_tk,
            e_tank: get().e_tk,
            e_aisl: get().e_aisl,
            e_cub: get().e_cub,
            h_int: get().h_int,
            h_ext: get().h_ext,
            k_tank: get().k_tk,
            k_aisl: get().k_aisl,
            k_cub: get().k_cub,
            d_int: get().d_int / 1000,
            d_ext: get().d_ext / 1000,
            longitud_tubo: get().l_tubo,
            s_sep: get().s_sep,
            num_tubos: get().n_tubos,
            tau_glass: get().tau_glass,
            alfa_glass: get().alpha_glass,
            n_div: get().n_div,
            nn: get().nn,
            beta_coef: get().beta_coef,
            f_flujo: get().f_flujo,
          };

          console.log('save project', body);
        },

        closeProject: () => {
          set({ currentProject: null });
          clearProjectStorage();
        },

        projectsPerPage: 4,

        openProject: project => {
          set({
            currentProject: project,
            date: project.date_time,
            // currentLocation: //!!!!!!!!!
            // volumen
            // manifoldLength
            // pipeNumber
            // pipeType
          });
        },

        calculate: async () => {
          const body: ICalculateParamsBody = {
            name_project: get().name_project,
            place: get().place,
            latitud: get().latitud,
            longitud: get().longitud,
            t_amb: get().t_amb,
            v_viento: get().v_viento,
            altitud: get().altura,
            date_time: get().date,
            inclinacion: get().inclination,
            azimuth: get().azimuth,
            vol_tank: get().vol_tk,
            e_tank: get().e_tk,
            e_aisl: get().e_aisl,
            e_cub: get().e_cub,
            h_int: get().h_int,
            h_ext: get().h_ext,
            k_tank: get().k_tk,
            k_aisl: get().k_aisl,
            k_cub: get().k_cub,
            d_int: get().d_int / 1000,
            d_ext: get().d_ext / 1000,
            longitud_tubo: get().l_tubo,
            s_sep: get().s_sep,
            num_tubos: get().n_tubos,
            tau_glass: get().tau_glass,
            alfa_glass: get().alpha_glass,
            n_div: get().n_div,
            nn: get().nn,
            beta_coef: get().beta_coef,
            f_flujo: get().f_flujo,
          };

          const results = await getProjectResults(body);
          set({ results: results });
        },

        results: undefined,

        // ======== PARAMS =======
        name_project: '',

        setName_project: (name_project: string) =>
          set({ name_project: name_project }),

        place: 0,

        setPlace: (place: number) => set({ place: place }),

        latitud: -8.11599,

        setLatitud: (latitud: number) => set({ latitud: latitud }),

        longitud: -79.02998,

        setLongitud: (longitud: number) => set({ longitud: longitud }),

        t_amb: 25,

        setT_amb: (t_amb: number) => set({ t_amb: t_amb }),

        v_viento: 2.5,

        setV_viento: (v_viento: number) => set({ v_viento: v_viento }),

        altura: 33,

        setAltura: (altura: number) => set({ altura: altura }),

        date: '2020-12-31T12:00:00-05:00',

        setDate: date => set({ date: date }),

        // ANGLE PARAMS
        inclination: 15,

        setInclination: (inclination: number) =>
          set({ inclination: inclination }),

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

        // MODAL TANK PARAMS
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

        // PIPELINE PARAMS
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

        // MODAL PIPELINE PARAMS
        tau_glass: 0.93,

        setTau_glass: (tau_glas: number) => set({ tau_glass: tau_glas }),

        alpha_glass: 0.89,

        setAlpha_glass: (alpha_glass: number) =>
          set({ alpha_glass: alpha_glass }),

        // MODAL GENERAL PARAMS
        n_div: 12,

        setN_div: (n_div: number) => set({ n_div: n_div }),

        nn: 360,

        setNn: (nn: number) => set({ nn: nn }),

        beta_coef: 0.000257,

        setBeta_coef: (beta_coef: number) => set({ beta_coef: beta_coef }),

        f_flujo: 0.45,

        setF_flujo: (f_flujo: number) => set({ f_flujo: f_flujo }),
      }),
      { name: 'designerStore' }
    )
  )
);
