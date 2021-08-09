import {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  ReactNode,
} from "react";
import { Class } from "../../types/index";

type ACTION_TYPE = { type: string; payload: Class[] };

type Props = {
  children: ReactNode;
};

const ClassStateContext = createContext<Class[] | undefined>(undefined);
const ClassDispatchContext = createContext<Dispatch<ACTION_TYPE> | undefined>(
  undefined
);

const initialState: Class[] = [];

const reducer = (state: typeof initialState, action: ACTION_TYPE) => {
  switch (action.type) {
    case "LOAD_DATA":
      return [...action.payload];
    default:
      return state;
  }
};

export const ClassProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ClassDispatchContext.Provider value={dispatch}>
      <ClassStateContext.Provider value={state}>
        {children}
      </ClassStateContext.Provider>
    </ClassDispatchContext.Provider>
  );
};

export const useClass = () => {
  const classes = useContext(ClassStateContext);
  const dispatch = useContext(ClassDispatchContext);

  if (!dispatch || !classes)
    throw new Error("useClass must be used within a provider");

  return [classes, dispatch] as const;
};
