import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/product");
    return response.data;
  }
);

interface IProps {
  title: string;
  price: number;
}

export const saveProduct = createAsyncThunk(
  "products/saveProduct",
  async ({ title, price }: IProps) => {
    const response = await axios.post("http://localhost:5000/product", {
      title,
      price,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct", // Change the key to make it distinct
  async (id: string) => {
    await axios.delete(`http://localhost:5000/product/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    id,
    title,
    price,
  }: {
    id: string;
    title: string;
    price: number;
  }) => {
    const response = await axios.patch(`http://localhost:5000/product/${id}`, {
      id,
      title,
      price,
    });
    return response.data;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product: { title: string; id: string; price: number }) =>
    product.id,
});

const productSlice = createSlice({
  name: "products",
  initialState: productEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload);
    });
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      productEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
  },
});

export const productSelectors = productEntity.getSelectors(
  (state: any) => state.products
);

export default productSlice.reducer;
