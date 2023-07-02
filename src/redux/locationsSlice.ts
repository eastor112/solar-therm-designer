import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocations } from '../services/locationServices';
import { ILocation, IProject, IWeather } from '../types/locationstypes';
import { createProjectService } from '../services/projectsServices';
import { RootState } from './store';
import { getWeatherDataService } from '../services/weatherServices';

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
  weatherData: IWeather[]
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
  weatherData: []
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
      state.date = action.payload;
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationsInformation.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
        localStorage.setItem('currentProject', JSON.stringify(action.payload))
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload
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
  setCurrentProject
} = locationsSlice.actions;

export default locationsSlice.reducer;
