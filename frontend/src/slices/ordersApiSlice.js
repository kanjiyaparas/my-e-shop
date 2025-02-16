import { ORDERS_URL, RAZORPAY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      invalidatesTags: ['Order']
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      providesTags: ['Order']
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      providesTags: ['Order']
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details }
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      invalidatesTags: ['Order']
    }),
    updateDeliver: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT'
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      invalidatesTags: ['Order']
    }),
    getRazorpayApiKey: builder.query({
      query: () => ({
        url: `${RAZORPAY_URL}/razorpay/config`
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      providesTags: ['Order']
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL
      }),
      headers: (headers, { getState }) => {
        const token = getState().auth.token; // Get token from Redux store
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
      providesTags: ['Order']
    })
  })
});

export const {
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useUpdateDeliverMutation,
  useGetRazorpayApiKeyQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery
} = ordersApiSlice;
