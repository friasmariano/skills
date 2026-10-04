import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        data: {
            isDark: true,
            deviceSetting: true
        },
    },
    reducers: {
        toggle: (state) => {
            state.data.isDark = !state.data.isDark;
        },
        setDark: (state) => {
            state.data.deviceSetting = false;
            state.data.isDark = true;
        },
        setLight: (state) => {
            state.data.deviceSetting = false;
            state.data.isDark = false;
        },
        setDeviceSettingOn: (state) => {
            state.data.deviceSetting = true
        },
        setThemeFromDevice: (state, action) => {
            state.data.isDark = action.payload;
        },
        setDeviceSettingOff: (state) => {
            state.data.deviceSetting = false
        }
    }
})

export const { setLight, setDark, toggle, setDeviceSettingOff, setDeviceSettingOn, setThemeFromDevice } = themeSlice.actions;
export default themeSlice.reducer;