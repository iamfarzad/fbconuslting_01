// UI Component modules
declare module "@/components/ui/*" {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

// Radix UI components
declare module "@radix-ui/*" {
  const Component: any;
  export * from '@radix-ui/react-primitive';
}

// External libraries
declare module "dotted-map" {
  export default class DottedMap {
    constructor(options: { [key: string]: any });
    addPin(options: { lat: number; lng: number; [key: string]: any }): void;
    getSVG(): SVGElement;
  }
}

declare module "class-variance-authority" {
  export function cva(base: string, config?: any): (...args: any[]) => string;
  export type VariantProps<T> = T extends (...args: any[]) => any ? Parameters<T>[0] : never;
}

declare module "cmdk" {
  export const Command: React.ComponentType<any>;
  export const CommandInput: React.ComponentType<any>;
  export const CommandList: React.ComponentType<any>;
  export const CommandEmpty: React.ComponentType<any>;
  export const CommandGroup: React.ComponentType<any>;
  export const CommandItem: React.ComponentType<any>;
  export const CommandSeparator: React.ComponentType<any>;
  export const CommandShortcut: React.ComponentType<any>;
}

// Remove UI component re-exports from index.ts
export {};
