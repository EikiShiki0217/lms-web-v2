// videoUploadSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploading: false,
  videoUrl: null,
  error: null,
};

const videoUploadSlice = createSlice({
  name: "videoUpload",
  initialState,
  reducers: {
    startUpload: (state) => {
      state.uploading = true;
      state.videoUrl = null;
      state.error = null;
    },
    uploadSuccess: (state, action) => {
      state.uploading = false;
      state.videoUrl = action.payload.videoUrl;
    },
    uploadFailure: (state, action) => {
      state.uploading = false;
      state.error = action.payload.error;
    },
  },
});

export const { startUpload, uploadSuccess, uploadFailure } =
  videoUploadSlice.actions;

export default videoUploadSlice.reducer;
