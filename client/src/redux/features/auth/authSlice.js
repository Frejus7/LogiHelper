import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
    try {
        const { data } = await axios.post('/routes/auth/login', {
            username,
            password,
        });
        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
});


export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password }) => {
    try {
        const { data } = await axios.post('/routes/auth/register', {
            username,
            password,
        });
        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
});


export const getMe = createAsyncThunk('auth/me', async() =>{
    try{
        const {data} = await axios.get('/routes/auth/me')
        return data
    }catch (error) {
        console.log(error)
    }
},
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.status = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Register user
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.status = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload?.message;
          state.user = action.payload?.user;
          state.token = action.payload?.token;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.status = action.error?.message || 'Failed to register';
          state.isLoading = false;
        })
  
        // Login user
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
          state.status = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload?.message;
          state.user = action.payload?.user;
          state.token = action.payload?.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = action.error?.message || 'Failed to login';
          state.isLoading = false;
        })
  
        // Get me
        .addCase(getMe.pending, (state) => {
          state.isLoading = true;
          state.status = null;
        })
        .addCase(getMe.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload?.user;
          state.token = action.payload?.token;
        })
        .addCase(getMe.rejected, (state, action) => {
          state.status = action.error?.message || 'Failed to fetch user data';
          state.isLoading = false;
        });
    },
  });
  

export const checkIsAuth = (state) => Boolean(state.auth?.token);

export const {logout} = authSlice.actions
export default authSlice.reducer