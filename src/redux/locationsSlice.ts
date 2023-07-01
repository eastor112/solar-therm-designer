import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocations } from '../services/locationServices';
import { ILocation, IProject } from '../types/locationstypes';
import { createProjectService } from '../services/projectsServices';

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

interface ILocationsState {
  projects: IProject[];
  currentProject: IProject | null,
  locations: ILocation[],
  currentLocation: ILocation | null,
  date: string | null,
}

const initialState: ILocationsState = {
  projects: [],
  currentProject: null,
  locations: [],
  currentLocation: null,
  date: null
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<ILocation>) => {
      state.currentLocation = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
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
      })
  }
});

export const { setCurrentLocation, setDate } =
  locationsSlice.actions;

export default locationsSlice.reducer;
