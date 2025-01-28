import { http, HttpResponse } from 'msw';
import defaultData from './__fixtures__/default.json';
import errorData from './__fixtures__/error.json';

export const tasksRouterHandler = [
  http.get('/api/trpc/taskRouter.getAll', async () => {
    return HttpResponse.json(defaultData, {
      status: 200,
    });
  }),

  http.get('/api/trpc/taskRouter.getAll', async () => {
    return HttpResponse.json(errorData, {
      status: 400,
    });
  }),
];
