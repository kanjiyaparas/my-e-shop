import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,credentials: 'include',  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
  tagTypes: ['User', 'Product', 'Order'],
  endpoints: builder => ({})
});
                                                              