import { apiSlice } from "../../../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    counts: builder.query({
      query: () => `/dashboard`,
    }),
  }),
});

export const { useCountsQuery } = dashboardApiSlice;
