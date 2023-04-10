import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  StateStatus,
  RegistartionErrors,
  RegistrationFormSteps,
  RegistrationData,
  FirstFieldsRegistration,
  SecondFieldsRegistration,
  ThirdFieldsRegistration,
} from '@types';
import { LoadingConstants } from '@utils';
import { RootState, SlicesName } from '@store';

const name = SlicesName.Registration;

interface IRegistrationInitialState {
  status: StateStatus;
  error: RegistartionErrors | null;
  step: RegistrationFormSteps;
  data: RegistrationData;
}

const initialState: IRegistrationInitialState = {
  status: StateStatus.Idle,
  error: null,
  step: 1,
  data: {} as RegistrationData,
};

export const registrationSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitialRegistration: () => {
      return initialState;
    },
    setRegistrationStep: (state, action: PayloadAction<RegistrationFormSteps>) => {
      state.step = action.payload;
    },
    setFirstRegistrationData: (state, action: PayloadAction<FirstFieldsRegistration>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setSecondRegistrationData: (state, action: PayloadAction<SecondFieldsRegistration>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setThirdRegistrationData: (state, action: PayloadAction<ThirdFieldsRegistration>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setRegistrationRequest: (state, _: PayloadAction<RegistrationData>) => {
      state.error = null;
      state.status = StateStatus.Pending;
    },
    setRegistrationSuccess: (state) => {
      state.status = StateStatus.Succeeded;
    },
    setRegistrationFailure: (state, action: PayloadAction<RegistartionErrors>) => {
      state.status = StateStatus.Failed;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Rejected) && action.type.startsWith(name),
        (state, action) => {
          state.status = StateStatus.Failed;
          state.error = action.payload || null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Fulfilled) && action.type.startsWith(name),
        (state, _) => {
          state.status = StateStatus.Succeeded;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Pending) && action.type.startsWith(name),
        (state, _) => {
          state.error = null;
          state.status = StateStatus.Pending;
        }
      );
  },
});

export const { reducer: registrationReducer, actions: registrationActions } = registrationSlice;

export const selectRegistrationState = (state: RootState) => state.registration;
