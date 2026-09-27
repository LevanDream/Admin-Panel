export type TodosType = {
  id: number | string;
  task: string;
  completed: boolean;
};

export type CreateTodoType = {
  task: string;
  completed: boolean;
};