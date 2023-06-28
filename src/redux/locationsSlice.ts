import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getLocations } from '../services/locationServices';
import { Location } from '../types/locationstypes';

export const getLocationsInformation = createAsyncThunk(
  `locations/fetchAllLocations`,
  async () => {
    const locations: any = await getLocations();
    return locations;
  }
)

interface ILocationsState {
  locations: Location[],
  currentLocation: Location | null,
  date: string | null,
}

const initialState: ILocationsState = {
  locations: [],
  currentLocation: null,
  date: null
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationsInformation.fulfilled, (state, action) => {
      state.locations = action.payload;
    })
  }
});

export const { setLocation, setDate } =
  locationsSlice.actions;

export default locationsSlice.reducer;
