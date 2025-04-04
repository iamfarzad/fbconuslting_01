// Common Types
export type Size = 'default' | 'sm' | 'lg' | 'icon';
export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type Intent = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

export interface ComponentBase {
  className?: string;
  children?: React.ReactNode;
}

// Props with common features
export interface VariantProps extends ComponentBase {
  variant?: Variant;
  size?: Size;
  intent?: Intent;
}

// Button specific props
export interface ButtonProps extends VariantProps {
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

// Dialog/Sheet props
export interface DialogProps extends ComponentBase {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

// Form component props
export interface FormFieldProps extends ComponentBase {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Navigation props
export interface NavigationItemProps extends ComponentBase {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
}

// Toast/Alert props
export interface AlertProps extends VariantProps {
  title?: string;
  description?: string;
  onClose?: () => void;
}

// Removed problematic module augmentations and re-exports
// // For Shadcn UI components
// declare module "@/components/ui/*" {
//   const Component: React.ComponentType<any>;
//   export default Component;
// }

// // For Radix UI components
// declare module "@radix-ui/*" {
//   const Component: any;
//   export default Component;
// }

// // Re-export specific component types
// export * from './button'; // Removed - No such file
// export * from './chat'; // Removed - No such file
