import {ReactNode } from "react";

export type PropsWithMandChildren<P = unknown> = P & { children: ReactNode };