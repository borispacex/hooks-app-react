import * as z from "zod";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
}

export type TaskAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number };

// Validación
const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
})
const TaskStateScheme = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number()
})

export const getTasksInitialState = (): TaskState => {
    const localStorageState = localStorage.getItem('tasks-state');
    if (!localStorageState) {
        return {
            todos: [],
            completed: 0,
            pending: 0,
            length: 0,
        }
    }
    /// Validar mediante Zod
    const result = TaskStateScheme.safeParse(JSON.parse(localStorageState));

    if (result.error) {
        console.log(result.error);
        return {
            todos: [],
            completed: 0,
            pending: 0,
            length: 0,
        };
    }

    // ! Cuidado, porque el objeto puede haber sido manipulado
    return result.data;
}

export const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false
            }
            return {
                ...state,
                todos: [...state.todos, newTodo],
                length: state.todos.length + 1,
                pending: state.pending + 1,
                completed: state.completed
            }
        }
        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            const completedTodos = updatedTodos.filter(todo => todo.completed).length;
            const pendingTodos = updatedTodos.length - completedTodos;
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: completedTodos,
                pending: pendingTodos,
            };
        }
        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload ) {
                    return { ...todo,  completed: !todo.completed };
                }
                return todo;
            });
            const completedTodos = updatedTodos.filter(todo => todo.completed).length;
            const pendingTodos = updatedTodos.length - completedTodos;
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: completedTodos,
                pending: pendingTodos,
            };
        }

        default:
            return state;
    }
}