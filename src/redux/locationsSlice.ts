import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocations } from '../services/locationServices';
import { RootState } from './store';
import { getWeatherDataService } from '../services/weatherServices';
import { storageKeys } from '../types/general';
import { convertDateToIso } from '../utils/datesUtils';
import { setOpenModal } from './UISlice';
import {
  ILocation,
  IPayloadUpdateProject,
  IProject,
  IProjectData,
  IWeather,
} from '../types/locationstypes';
import {
  createProjectService,
  getAllProjectsService,
  getProjectService,
  updateProjectService,
} from '../services/projectsServices';
import { clearProjectStorage } from '../utils/clearProjectStorage';

export const getLocationsInformation = createAsyncThunk(
  `locations/fetchAllLocations`,
  async () => {
    const locations: any = await getLocations();
    return locations;
  }
);

export const createProject = createAsyncThunk(
  'locations/createProject',
  async (name: string) => {
    const project = await createProjectService(name);
    return project;
  }
);

export const getProject = createAsyncThunk(
  'locations/getProject',
  async (projectId: number, { dispatch }) => {
    const project = await getProjectService(projectId);
    if (project.location) {
      dispatch(
        setCurrentLocation(project.location)
      );
    }
    dispatch(setDate(project.date));
    dispatch(setVolumen(project.volumen ? project.volumen : 0));
    dispatch(setManifoldLength(project.manifold ? project.manifold : 0));
    dispatch(setPipeNumber(project.pipeline_number ? project.pipeline_number : 0));
    dispatch(setPipeType(project.pipeline_type ? project.pipeline_type : 0));
    return project;
  }
);

interface GetAllProjectsParams {
  limit: number;
  page: number;
  filter?: string;
}

export const getAllProjects = createAsyncThunk(
  'locations/getProjects',
  async (params: GetAllProjectsParams) => {
    const projects = await getAllProjectsService(params.limit, params.page, params.filter);
    return projects;
  }
);

export const getRecentFiles = createAsyncThunk(
  'locations/getRecentFiles',
  async (params: GetAllProjectsParams) => {
    const projects = await getAllProjectsService(params.limit, params.page);
    return projects;
  }
);

interface UpdateProject {
  closeOnFinish: boolean;
}

export const updateProject = createAsyncThunk(
  'locations/updateProject',
  async (params: UpdateProject, { getState, dispatch }) => {
    const { closeOnFinish } = params;
    const { locations } = getState() as RootState;

    const payload: IPayloadUpdateProject = {
      name: locations.currentProject?.name,
      pipeline_number: locations.pipeNumber || undefined,
      pipeline_type: locations.pipeType || undefined,
      volumen: locations.volumen || undefined,
      manifold: locations.manifoldLength || undefined,
      date: convertDateToIso(locations.date) || undefined,
      location_id: locations.currentLocation?.id || undefined,
    };

    const updatedProject = await updateProjectService(
      locations?.currentProject?.id!,
      payload
    );

    if (closeOnFinish) {
      dispatch(setOpenModal(false));
    }

    return updatedProject;
  }
);

export const getWeatherData = createAsyncThunk(
  'locations/getWeatherData',
  async (_, { getState }) => {
    const { locations } = getState() as RootState;
    const { currentLocation, date } = locations;

    const weatherData = await getWeatherDataService(currentLocation?.id, date);
    return weatherData;
  }
);

interface ILocationsState {
  projectsData: IProjectData | null;
  recentFiles: IProjectData | null;
  currentProject: IProject | null;
  previewProject: IProject | null;
  locations: ILocation[];
  currentLocation: ILocation | null;
  date: string | null;
  volumen: number | null;
  manifoldLength: number | null;
  pipeNumber: number | null;
  pipeType: number | null;
  weatherData: IWeather[];
  thereAreChanges: boolean;
  wantsToSave: boolean;
  nextModalAction: string | null;
  projectsPerPage: number
}

const initialState: ILocationsState = {
  projectsData: null,
  recentFiles: null,
  currentProject: null,
  previewProject: null,
  locations: [],
  currentLocation: null,
  date: null,
  volumen: 0,
  manifoldLength: 0,
  pipeNumber: 0,
  pipeType: 0,
  weatherData: [],
  thereAreChanges: false,
  wantsToSave: true,
  nextModalAction: null,
  projectsPerPage: 4
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<ILocation>) => {
      localStorage.setItem(
        storageKeys.location,
        JSON.stringify(action.payload)
      );
      state.currentLocation = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      localStorage.setItem(storageKeys.date, action.payload);
      if (action.payload === 'null') {
        state.date = null;
      } else {
        state.date = action.payload;
      }
    },
    setVolumen: (state, action: PayloadAction<number>) => {
      localStorage.setItem(storageKeys.volumen, action.payload.toString());
      state.volumen = action.payload;
    },
    setManifoldLength: (state, action: PayloadAction<number>) => {
      localStorage.setItem(
        storageKeys.manifoldLength,
        action.payload.toString()
      );
      state.manifoldLength = action.payload;
    },
    setPipeNumber: (state, action: PayloadAction<number>) => {
      localStorage.setItem(storageKeys.pipeNumber, action.payload.toString());
      state.pipeNumber = action.payload;
    },
    setPipeType: (state, action: PayloadAction<number>) => {
      localStorage.setItem(storageKeys.pipeType, action.payload.toString());
      state.pipeType = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<IProject>) => {
      state.currentProject = action.payload;
    },
    areThereChanges: state => {
      if (state.currentProject) {
        const {
          pipeline_number,
          pipeline_type,
          volumen,
          manifold,
          date,
          location,
        } = state.currentProject;

        if (
          pipeline_number !== state.pipeNumber ||
          pipeline_type !== state.pipeType ||
          volumen !== state.volumen ||
          manifold !== state.manifoldLength ||
          date !== convertDateToIso(state.date) ||
          location?.id !== state.currentLocation?.id
        ) {
          state.thereAreChanges = true;
        } else {
          state.thereAreChanges = false;
        }
      }
    },
    closeProject: () => {
      clearProjectStorage()
      return initialState;
    },
    setPreviewProject: (state, action: PayloadAction<IProject>) => {
      state.previewProject = action.payload;
    },
    setWantsToSave: (state, action: PayloadAction<boolean>) => {
      state.wantsToSave = action.payload;
    },
    setNextModalAction: (state, action: PayloadAction<string | null>) => {
      state.nextModalAction = action.payload;
    },
    openProject: (state, action: PayloadAction<IProject>) => {
      state.currentProject = action.payload;
      state.date = action.payload.date
      state.currentLocation = action.payload.location
      state.volumen = action.payload.volumen
      state.manifoldLength = action.payload.manifold
      state.pipeNumber = action.payload.pipeline_number
      state.pipeType = action.payload.pipeline_type

      localStorage.setItem(
        storageKeys.currentProject,
        JSON.stringify(action.payload)
      );
    },
    clearWeather: (state) => {
      state.weatherData = initialState.weatherData;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getLocationsInformation.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        clearProjectStorage()

        state.currentProject = action.payload;
        state.date = initialState.date;
        state.currentLocation = initialState.currentLocation;
        state.volumen = initialState.volumen;
        state.manifoldLength = initialState.manifoldLength;
        state.pipeNumber = initialState.pipeNumber;
        state.pipeType = initialState.pipeType;
        state.weatherData = initialState.weatherData;
        state.thereAreChanges = initialState.thereAreChanges;
        localStorage.setItem(
          storageKeys.currentProject,
          JSON.stringify(action.payload)
        );
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        state.thereAreChanges = false;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projectsData = action.payload;
      })
      .addCase(getRecentFiles.fulfilled, (state, action) => {
        state.recentFiles = action.payload;
      });
  },
});

export const {
  setCurrentLocation,
  setDate,
  setVolumen,
  setManifoldLength,
  setPipeNumber,
  setPipeType,
  setCurrentProject,
  areThereChanges,
  closeProject,
  setPreviewProject,
  setWantsToSave,
  setNextModalAction,
  openProject,
  clearWeather
} = locationsSlice.actions;

export default locationsSlice.reducer;
