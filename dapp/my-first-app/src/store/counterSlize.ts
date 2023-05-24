import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface BalanceState {
  hasFetchedInitialBalance: boolean;
  value: string;
}

const initialState: BalanceState = {
  hasFetchedInitialBalance: false,
  value: ''
}


export const counterSlice = createSlice({
  name: 'balance',
  initialState: initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setHasFetchedInitialBalanceTrue: (state) => {
      state.hasFetchedInitialBalance = true
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setValue
} = counterSlice.actions

export default counterSlice.reducer