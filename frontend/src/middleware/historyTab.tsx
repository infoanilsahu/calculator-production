import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface HistoryTabProp {
    children: JSX.Element;
}

export function HistoryTab({ children }: HistoryTabProp) {
    if (window.innerWidth < 1024) {
        return children;
    } 
    else return <Navigate to="/" replace />
}