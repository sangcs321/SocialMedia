import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./configureStore";
import { AppState } from "./store";

type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
