import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
    name: "category",
    initialState: {
      categories: [],
      selectedCategory: {},
    },
    reducers: {
       mainCategories: (state, action) => {
            state.categories = action.payload;

          },

      selectCategory: (state, action) => {

          state.selectedCategory = action.payload
          

      },
    },
  });
  
export const { selectCategory, mainCategories } = categorySlice.actions;
  
export default categorySlice