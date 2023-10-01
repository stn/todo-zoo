import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Task {
  id: string
  name: string
  completed: boolean
}

export type Tasks = Task[]

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTasks: build.query<Tasks, void>({
      query: () => `task`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks", id } as const)),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    addTask: build.mutation<Task, string>({
      query(name) {
        const body = {
          name,
          completed: false,
        }
        return {
          url: `task`,
          method: "POST",
          body,
        }
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    getTask: build.query<Task, string>({
      query: (id) => `task/${id}`,
      providesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
    updateTask: build.mutation<Task, Partial<Task>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `task/${id}`,
          method: "PUT",
          body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    deleteTask: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `task/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi
