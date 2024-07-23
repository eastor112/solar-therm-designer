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

const defaultValues = {
  currentProject: null,
  studyType: 'real' as "real" | "theoretical",
  previewProject: null,
  name_project: '',
  projectsData: null,
  recentFiles: null,
  projectsPerPage: 4,
  place: 0,
  latitud: -8.11599,
  longitud: -79.02998,
  t_amb: 25,
  v_viento: 2.5,
  altitud: 33,
  date_time: '2020-12-31T12:00:00-05:00',
  inclinacion: 15,
  azimuth: 180,
  vol_tank: 0.3,
  e_tank: 0.0004,
  e_aisl: 0.005,
  e_cub: 0.0004,
  h_int: 10,
  h_ext: 25,
  k_tank: 14.9,
  k_aisl: 0.06,
  k_cub: 14.9,
  d_int: 48,
  d_ext: 58,
  longitud_tubo: 1.8,
  s_sep: 0.056,
  num_tubos: 30,
  tau_glass: 0.93,
  alfa_glass: 0.89,
  n_div: 12,
  nn: 360,
  beta_coef: 0.000257,
  f_flujo: 0.45,
  results: undefined
}

const resetState = {
  name_project: defaultValues.name_project,
  place: defaultValues.place,
  latitud: defaultValues.latitud,
  longitud: defaultValues.longitud,
  t_amb: defaultValues.t_amb,
  v_viento: defaultValues.v_viento,
  altura: defaultValues.altitud, //
  date: defaultValues.date_time, //
  inclination: defaultValues.inclinacion, //
  azimuth: defaultValues.azimuth,
  vol_tk: defaultValues.vol_tank, //
  e_tk: defaultValues.e_tank, //
  e_aisl: defaultValues.e_aisl,
  e_cub: defaultValues.e_cub,
  h_int: defaultValues.h_int,
  h_ext: defaultValues.h_ext,
  k_tk: defaultValues.k_tank, //
  k_aisl: defaultValues.k_aisl,
  k_cub: defaultValues.k_cub,
  d_int: defaultValues.d_int,
  d_ext: defaultValues.d_ext,
  l_tubo: defaultValues.longitud_tubo, //
  s_sep: defaultValues.s_sep,
  n_tubos: defaultValues.num_tubos, //
  tau_glass: defaultValues.tau_glass,
  alpha_glass: defaultValues.alfa_glass, //
  n_div: defaultValues.n_div,
  nn: defaultValues.nn,
  beta_coef: defaultValues.beta_coef,
  f_flujo: defaultValues.f_flujo,
}



const assignToState = (newValues: INewProject) => {
  return {
    name_project: newValues.name_project,
    place: newValues.place,
    latitud: newValues.latitud,
    longitud: newValues.longitud,
    t_amb: newValues.t_amb,
    v_viento: newValues.v_viento,
    altura: newValues.altitud, //
    date: newValues.date_time, //
    inclination: newValues.inclinacion, //
    azimuth: newValues.azimuth,
    vol_tk: newValues.vol_tank, //
    e_tk: newValues.e_tank, //
    e_aisl: newValues.e_aisl,
    e_cub: newValues.e_cub,
    h_int: newValues.h_int,
    h_ext: newValues.h_ext,
    k_tk: newValues.k_tank, //
    k_aisl: newValues.k_aisl,
    k_cub: newValues.k_cub,
    d_int: newValues.d_int,
    d_ext: newValues.d_ext,
    l_tubo: newValues.longitud_tubo, //
    s_sep: newValues.s_sep,
    n_tubos: newValues.num_tubos, //
    tau_glass: newValues.tau_glass,
    alpha_glass: newValues.alfa_glass, //
    n_div: newValues.n_div,
    nn: newValues.nn,
    beta_coef: newValues.beta_coef,
    f_flujo: newValues.f_flujo,
  }
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
        studyType: defaultValues.studyType,

        setStudyType: type => set({ studyType: type }),

        currentProject: defaultValues.currentProject,

        setCurrentProject: project => set({ currentProject: project }),

        getProject: async (projectId: number) => {
          const project = await getProjectService(projectId);
          set({ date: project.date_time });
        },

        previewProject: defaultValues.previewProject,

        setPreviewProject: project => set({ previewProject: project }),

        createProject: async (name_project: string) => {
          const newProject = await createProjectService({ ...defaultValues, name_project });
          const newState = { ...resetState, currentProject: newProject, name_project }
          set(newState)
        },

        projectsData: defaultValues.projectsData,

        getAllProjects: async params => {
          const projects = await getAllProjectsService(
            params.limit,
            params.page,
            params.filter
          );
          set({ projectsData: projects });
        },

        recentFiles: defaultValues.recentFiles,

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

        projectsPerPage: defaultValues.projectsPerPage,

        openProject: project => {
          const newValues = assignToState(project)
          const newState = { ...newValues, currentProject: project }
          set(newState);
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

        results: defaultValues.results,

        // ======== PARAMS =======
        name_project: defaultValues.name_project,

        setName_project: (name_project: string) =>
          set({ name_project: name_project }),

        place: defaultValues.place,

        setPlace: (place: number) => set({ place: place }),

        latitud: defaultValues.latitud,

        setLatitud: (latitud: number) => set({ latitud: latitud }),

        longitud: defaultValues.longitud,

        setLongitud: (longitud: number) => set({ longitud: longitud }),

        t_amb: defaultValues.t_amb,

        setT_amb: (t_amb: number) => set({ t_amb: t_amb }),

        v_viento: defaultValues.v_viento,

        setV_viento: (v_viento: number) => set({ v_viento: v_viento }),

        altura: defaultValues.altitud,

        setAltura: (altura: number) => set({ altura: altura }),

        date: defaultValues.date_time,

        setDate: date => set({ date: date }),

        // ANGLE PARAMS
        inclination: defaultValues.inclinacion,

        setInclination: (inclination: number) =>
          set({ inclination: inclination }),

        azimuth: defaultValues.azimuth,

        setAzimuth: (azimuth: number) => set({ azimuth: azimuth }),

        // TANK PARAMS
        vol_tk: defaultValues.vol_tank,

        setVol_tk: (vol_tk: number) => set({ vol_tk: vol_tk }),

        e_tk: defaultValues.e_tank,

        setE_tk: (e_tk: number) => set({ e_tk: e_tk }),

        e_aisl: defaultValues.e_aisl,

        setE_aisl: (e_aisl: number) => set({ e_aisl: e_aisl }),

        e_cub: defaultValues.e_cub,

        setE_cub: (e_cub: number) => set({ e_cub: e_cub }),

        // MODAL TANK PARAMS
        h_int: defaultValues.h_int,

        setH_int: (h_int: number) => set({ h_int: h_int }),

        h_ext: defaultValues.h_ext,

        setH_ext: (h_ext: number) => set({ h_ext: h_ext }),

        k_tk: defaultValues.k_tank,

        setK_tk: (k_tk: number) => set({ k_tk: k_tk }),

        k_aisl: defaultValues.k_aisl,

        setK_aisl: (k_aisl: number) => set({ k_aisl: k_aisl }),

        k_cub: defaultValues.k_cub,

        setK_cub: (k_cub: number) => set({ k_cub: k_cub }),

        // PIPELINE PARAMS
        d_int: defaultValues.d_int,

        setD_int: (d_int: number) => set({ d_int: d_int }),

        d_ext: defaultValues.d_ext,

        setD_ext: (d_ext: number) => set({ d_ext: d_ext }),

        l_tubo: defaultValues.longitud_tubo,

        setL_tubo: (l_tubo: number) => set({ l_tubo: l_tubo }),

        s_sep: defaultValues.s_sep,

        setS_sep: (s_sep: number) => set({ s_sep: s_sep }),

        n_tubos: defaultValues.num_tubos,

        setN_tubos: (n_tubos: number) => set({ n_tubos: n_tubos }),

        // MODAL PIPELINE PARAMS
        tau_glass: defaultValues.tau_glass,

        setTau_glass: (tau_glas: number) => set({ tau_glass: tau_glas }),

        alpha_glass: defaultValues.alfa_glass,

        setAlpha_glass: (alpha_glass: number) =>
          set({ alpha_glass: alpha_glass }),

        // MODAL GENERAL PARAMS
        n_div: defaultValues.n_div,

        setN_div: (n_div: number) => set({ n_div: n_div }),

        nn: defaultValues.nn,

        setNn: (nn: number) => set({ nn: nn }),

        beta_coef: defaultValues.beta_coef,

        setBeta_coef: (beta_coef: number) => set({ beta_coef: beta_coef }),

        f_flujo: defaultValues.f_flujo,

        setF_flujo: (f_flujo: number) => set({ f_flujo: f_flujo }),
      }),
      { name: 'designerStore' }
    )
  )
);
