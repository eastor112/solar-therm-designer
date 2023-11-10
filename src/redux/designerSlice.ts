import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateParamService, createParamsService } from '../services/paramsServices';
import { IParams, IParamsBody } from '../types/paramsTypes';
import { createPipelineService } from '../services/pipelineServices';
import { IPipeline } from '../types/pipelinesTypes';
import { RootState } from './store';
import { IRegister } from '../types/registersTypes';
import { getAllRegistersParamService } from '../services/registerServices';
import { registers, testParams } from './testData';

export const computeResults = createAsyncThunk(
  'designer/createPipeline',
  async (_, { getState, dispatch }) => {

    const state = getState() as RootState
    const {
      externalDiameter,
      internalDiameter,
      pipelineLength,
      pipelineSeparation,
      granularity,
      azimuth,
      inclination
    } = state.designer

    const { currentLocation } = state.locations

    const pipeline = await createPipelineService({
      external_diameter: externalDiameter / 1000,
      internal_diameter: internalDiameter / 1000,
      length: pipelineLength
    })

    dispatch(setCurrentPipeline(pipeline))

    const param = await createParamsService({
      inclination_deg: inclination,
      azimuth_deg: azimuth,
      granularity,
      pipeline_separation: pipelineSeparation,
      location_id: currentLocation!.id,
      pipeline_id: pipeline.id
    })

    await calculateParamService(param.id)
    dispatch(setCurrentParam(param))

    const registers = await getAllRegistersParamService(param.id)
    dispatch(setCurrentRegister(registers))

    return registers;
  })

export const createParam = createAsyncThunk(
  'designer/createParam',
  async (body: IParamsBody) => {
    const param = await createParamsService(body);
    return param;
  }
);

export const calculateParam = createAsyncThunk(
  'designer/calculateParam',
  async (paramID: number) => {
    const param = await calculateParamService(paramID);
    return param;
  }
);

export const getRegisters = createAsyncThunk(
  'designer/getAllRegisters',
  async (_) => {
    return registers
  }
)

export const getAllProjectParams = createAsyncThunk(
  'designer/getAllParams',
  async (_) => {
    return testParams
  }
)

interface IDesignerState {
  data: any;
  city?: string;
  date?: string;
  lat?: number;
  long?: number;
  internalDiameter: number;
  externalDiameter: number;
  pipelineLength: number;
  granularity: number,
  pipelineSeparation: number,
  inclination: number,
  azimuth: number,
  currentParam: IParams | null,
  allParams: IParams[],
  currentPipeline: IPipeline | null,
  currentRegister: IRegister[],
  registers: IRegister[][],
  isLoading: boolean,
  dataType: "weather" | "energy",
  returnRoute: string,
  selectedParams: number[]
}

const initialState: IDesignerState = {
  data: [],
  city: 'piura',
  internalDiameter: 43.02,
  externalDiameter: 58.36,
  pipelineLength: 1.8,
  granularity: 12,
  pipelineSeparation: 0.2,
  inclination: 30,
  azimuth: 150,
  currentParam: null,
  allParams: [],
  currentPipeline: null,
  currentRegister: [],
  registers: [],
  isLoading: false,
  dataType: "weather",
  returnRoute: "/dashboard/designer",
  selectedParams: []
};

export const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setLat: (state, action: PayloadAction<number>) => {
      state.lat = action.payload;
    },
    setLong: (state, action: PayloadAction<number>) => {
      state.long = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setInternalDiameter: (state, action: PayloadAction<number>) => {
      state.internalDiameter = action.payload;
    },
    setExternalDiameter: (state, action: PayloadAction<number>) => {
      state.externalDiameter = action.payload;
    },
    setPipelineLength: (state, action: PayloadAction<number>) => {
      state.pipelineLength = action.payload;
    },
    setGranularity: (state, action: PayloadAction<number>) => {
      state.granularity = action.payload;
    },
    setPipelineSeparation: (state, action: PayloadAction<number>) => {
      state.pipelineSeparation = action.payload;
    },
    setInclination: (state, action: PayloadAction<number>) => {
      state.inclination = action.payload;
    },
    setAzimuth: (state, action: PayloadAction<number>) => {
      state.azimuth = action.payload;
    },
    setCurrentParam: (state, action: PayloadAction<IParams>) => {
      state.currentParam = action.payload;
    },
    setCurrentPipeline: (state, action: PayloadAction<IPipeline>) => {
      state.currentPipeline = action.payload;
    },
    setCurrentRegister: (state, action: PayloadAction<IRegister[]>) => {
      state.currentRegister = action.payload;
    },
    setDataType: (state, action: PayloadAction<"weather" | "energy">) => {
      state.dataType = action.payload;
    },
    setReturnRoute: (state, action: PayloadAction<string>) => {
      state.returnRoute = action.payload;
    },
    setRegisters: (state, action: PayloadAction<IRegister[][]>) => {
      state.registers = action.payload;
    },
    setSelectedParams: (state, action: PayloadAction<number[]>) => {
      state.selectedParams = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createParam.fulfilled, (state, action) => {
        state.currentParam = action.payload;
      })
      .addCase(calculateParam.pending, (state, _action) => {
        state.isLoading = true;
      })
      .addCase(computeResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRegister = action.payload;
      })
      .addCase(getRegisters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registers = action.payload;
      })
      .addCase(getAllProjectParams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allParams = action.payload;
      })
  },
});

export const {
  setData,
  setDate,
  setCity,
  setLat,
  setLong,
  setInternalDiameter,
  setExternalDiameter,
  setPipelineLength,
  setGranularity,
  setPipelineSeparation,
  setInclination,
  setAzimuth,
  setCurrentParam,
  setCurrentPipeline,
  setCurrentRegister,
  setDataType,
  setReturnRoute,
  setSelectedParams
} = designerSlice.actions;

export default designerSlice.reducer;
