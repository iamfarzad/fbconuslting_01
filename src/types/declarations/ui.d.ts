declare interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

declare interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isHoverable?: boolean;
  isClickable?: boolean;
}

declare interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

declare interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isClosable?: boolean;
}

declare interface FormControlProps {
  id?: string;
  label?: string;
  error?: string;
  helpText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  children?: React.ReactNode;
}
