import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptoSign } from "../utils/createSign";

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://no23.lavina.tech" }),
  tagTypes: ["Book"],
  endpoints: (build) => ({
    // POST LOGIN INFORMATION
    login: build.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    getLoginData: build.query({
      query: () => {
        const key = localStorage.getItem("Key");
        return {
          url: "/myself",
          headers: {
            Key: key,
            Sign: cryptoSign("GET", "/myself"),
          },
        };
      },
    }),

    // GET THE BOOKS GLOBALLY BY SEARCHING THE TITLE
    searchBooks: build.query({
      query: (title) => {
        const key = localStorage.getItem("Key");
        return {
          url: `/books/${title}`,
          headers: {
            Key: key,
            Sign: cryptoSign("GET", `/books/${title}`),
          },
        };
      },
      providesTags: (result, error, id) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    // GET BOOKS FROM BOOK SHELF
    getBooks: build.query({
      query: () => {
        const key = localStorage.getItem("Key");
        return {
          url: "/books",
          headers: {
            Key: key,
            Sign: cryptoSign("GET", "/books"),
          },
        };
      },
      providesTags: (result, error, arg) =>
        result && result?.data
          ? [
              ...result?.data.map(({ id }) => ({ type: "Book", id })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    // ADD BOOK TO THE SHELF
    addBook: build.mutation({
      query: (bookNumber) => {
        const key = localStorage.getItem("Key");
        return {
          url: "/books",
          method: "POST",
          headers: {
            Key: key,
            Sign: cryptoSign(
              "POST",
              "/books",
              JSON.stringify({ isbn: bookNumber })
            ),
          },
          body: { isbn: bookNumber },
        };
      },
      invalidatesTags: ["Book"],
    }),

    // UPDATE BOOK STATUS
    updateBook: build.mutation({
      query: ({ id, status }) => {
        const key = localStorage.getItem("Key");
        return {
          url: `/books/${id}`,
          method: "PATCH",
          headers: {
            Key: key,
            Sign: cryptoSign(
              "PATCH",
              `/books/${id}`,
              JSON.stringify({ status })
            ),
          },
          body: { status },
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    // DELETE BOOK
    deleteBook: build.mutation({
      query: (id) => {
        const key = localStorage.getItem("Key");
        return {
          url: `/books/${id}`,
          method: "DELETE",
          headers: {
            Key: key,
            Sign: cryptoSign("DELETE", `/books/${id}`),
          },
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetLoginDataQuery,
  useGetBooksQuery,
  useSearchBooksQuery,
  useLazySearchBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = authApiSlice;
