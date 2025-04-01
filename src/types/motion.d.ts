import { HTMLMotionProps } from "framer-motion";

declare module "framer-motion" {
  export interface MotionProps {
    className?: string;
    initial?: any;
    animate?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    variants?: any;
    [key: string]: any;
  }

  export interface HTMLMotionProps<T> extends React.HTMLAttributes<T>, MotionProps {
    className?: string;
    [key: string]: any;
  }
}
