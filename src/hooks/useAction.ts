import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useMemo} from "react";
import {ActionCreator} from "@reduxjs/toolkit";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppStore = useStore.withTypes<AppStore>();


export const useAction = (actionCreator) => {
    const dispatch = useAppDispatch();

    return useMemo(() => {
        return (...args) => dispatch(actionCreator(...args));
    }, [dispatch, actionCreator]);
};
