import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "production"
      ? "https://oneenbackend.vercel.app/api/"
      : "/api",
  credentials: "include",
});

export const certificateApi = createApi({
  reducerPath: "certificateApi",
baseQuery,
 tagTypes: ["Certificate"],
  endpoints: (builder) => ({

    createCertificate: builder.mutation({
  query: (formData) => ({
    url: `/certificate/create`,
    method: "POST",
    body: formData,
    // IMPORTANT: Let fetch know it's form data — do NOT set Content-Type header here, browser handles it
  }),
  invalidatesTags: ["Certificate"],
}),



    getCertificates: builder.query({
      query: () => "/certificate/get",
      providesTags: ["Certificate"],
    }),
   getCertificateById: builder.query({
      query: (id) => `/certificate/get/${id}`,
      providesTags: ["Certificate"],
    }),
    updateCertificate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/certificate/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `/certificate/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certificate"],
    }),
  }),
})
export const {
  useGetCertificatesQuery,
  useGetCertificateByIdQuery,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
  useCreateCertificateMutation
} = certificateApi;
 