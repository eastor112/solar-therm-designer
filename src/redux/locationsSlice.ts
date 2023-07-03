import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocations } from '../services/locationServices';
import { ILocation, IProject, IWeather } from '../types/locationstypes';
import { createProjectService, getProjectService } from '../services/projectsServices';
import { RootState } from './store';
import { getWeatherDataService } from '../services/weatherServices';
import { storageKeys } from '../types/general';

export const getLocationsInformation = createAsyncThunk(
  `locations/fetchAllLocations`,
  async () => {
    const locations: any = await getLocations();
    return locations;
  }
)

export const createProject = createAsyncThunk(
  'locations/createProject',
  async (name: string) => {
    const project = await createProjectService(name);
    return project;
  }
)

export const getProject = createAsyncThunk(
  'locations/getProject',
  async (_, { getState }) => {
    const { locations: { currentProject } } = getState() as RootState;
    if (currentProject) {
      const project = await getProjectService(currentProject.id);
      return project;
    }
    return null
  }
)

export const getWeatherData = createAsyncThunk(
  'locations/getWeatherData',
  async (_, { getState }) => {
    const { locations } = getState() as RootState;
    const { currentLocation, date } = locations;

    const weatherData = await getWeatherDataService(currentLocation?.id, date)
    return weatherData;
  }
)

interface ILocationsState {
  projects: IProject[];
  currentProject: IProject | null,
  locations: ILocation[],
  currentLocation: ILocation | null,
  date: string | null,
  volumen: number | null,
  manifoldLength: number | null,
  pipeNumber: number | null,
  pipeType: number | null,
  weatherData: IWeather[],
  thereAreChanges: boolean
}

const initialState: ILocationsState = {
  projects: [],
  currentProject: null,
  locations: [],
  currentLocation: null,
  date: null,
  volumen: 0,
  manifoldLength: 0,
  pipeNumber: 0,
  pipeType: 0,
  weatherData: [],
  thereAreChanges: false
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<ILocation>) => {
      localStorage.setItem('location', JSON.stringify(action.payload))
      state.currentLocation = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      localStorage.setItem('date', action.payload)
      if (action.payload === 'null') {
        state.date = null;
      } else {
        state.date = action.payload;
      }
    },
    setVolumen: (state, action: PayloadAction<number>) => {
      localStorage.setItem('volumen', action.payload.toString())
      state.volumen = action.payload;
    },
    setManifoldLength: (state, action: PayloadAction<number>) => {
      localStorage.setItem('manifoldLength', action.payload.toString())
      state.manifoldLength = action.payload;
    },
    setPipeNumber: (state, action: PayloadAction<number>) => {
      localStorage.setItem('pipeNumber', action.payload.toString())
      state.pipeNumber = action.payload;
    },
    setPipeType: (state, action: PayloadAction<number>) => {
      localStorage.setItem('pipeType', action.payload.toString())
      state.pipeType = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<IProject>) => {
      state.currentProject = action.payload;
    },
    areThereChanges: (state) => {
      if (state.currentProject) {
        const {
          pipeline_number,
          pipeline_type,
          volumen,
          manifold,
          date,
          location
        } = state.currentProject;

        if (
          pipeline_number !== state.pipeNumber ||
          pipeline_type !== state.pipeType ||
          volumen !== state.volumen ||
          manifold !== state.manifoldLength ||
          date !== state.date ||
          location?.id !== state.currentLocation?.id) {
          state.thereAreChanges = true;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationsInformation.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        localStorage.removeItem(storageKeys.location);
        localStorage.removeItem(storageKeys.pipeType);
        localStorage.removeItem(storageKeys.date);
        localStorage.removeItem(storageKeys.manifoldLength);
        localStorage.removeItem(storageKeys.pipeNumber);
        localStorage.removeItem(storageKeys.volumen);

        state.currentProject = action.payload;
        state.date = initialState.date;
        state.currentLocation = initialState.currentLocation;
        state.volumen = initialState.volumen;
        state.manifoldLength = initialState.manifoldLength;
        state.pipeNumber = initialState.pipeNumber;
        state.pipeType = initialState.pipeType;
        state.weatherData = initialState.weatherData;
        state.thereAreChanges = initialState.thereAreChanges;
        localStorage.setItem(storageKeys.currentProject, JSON.stringify(action.payload))
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })
  }
});

export const {
  setCurrentLocation,
  setDate,
  setVolumen,
  setManifoldLength,
  setPipeNumber,
  setPipeType,
  setCurrentProject,
  areThereChanges
} = locationsSlice.actions;

export default locationsSlice.reducer;
