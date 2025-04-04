import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
// Import sub-components directly from cmdk
import { Command as CommandPrimitive, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Keep Command aliased as CommandPrimitive for the main wrapper if desired, or rename
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive // Use the alias here for the main component
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// Use the directly imported CommandInput
const CommandInputComponent = React.forwardRef<
  React.ElementRef<typeof CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandInput>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandInput // Use direct import
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

// Assign displayName to the new component name
CommandInputComponent.displayName = CommandInput.displayName

// Use the directly imported CommandList
const CommandListComponent = React.forwardRef<
  React.ElementRef<typeof CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandList>
>(({ className, ...props }, ref) => (
  <CommandList // Use direct import
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

// Assign displayName to the new component name
CommandListComponent.displayName = CommandList.displayName

// Use the directly imported CommandEmpty
const CommandEmptyComponent = React.forwardRef<
  React.ElementRef<typeof CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandEmpty>
>((props, ref) => (
  <CommandEmpty // Use direct import
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

// Assign displayName to the new component name
CommandEmptyComponent.displayName = CommandEmpty.displayName

// Use the directly imported CommandGroup
const CommandGroupComponent = React.forwardRef<
  React.ElementRef<typeof CommandGroup>,
  React.ComponentPropsWithoutRef<typeof CommandGroup>
>(({ className, ...props }, ref) => (
  <CommandGroup // Use direct import
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

// Assign displayName to the new component name
CommandGroupComponent.displayName = CommandGroup.displayName

// Use the directly imported CommandSeparator
const CommandSeparatorComponent = React.forwardRef<
  React.ElementRef<typeof CommandSeparator>,
  React.ComponentPropsWithoutRef<typeof CommandSeparator>
>(({ className, ...props }, ref) => (
  <CommandSeparator // Use direct import
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
// Assign displayName to the new component name
CommandSeparatorComponent.displayName = CommandSeparator.displayName

// Use the directly imported CommandItem
const CommandItemComponent = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem>
>(({ className, ...props }, ref) => (
  <CommandItem // Use direct import
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))

// Assign displayName to the new component name
CommandItemComponent.displayName = CommandItem.displayName

// CommandShortcut remains the same as it doesn't use CommandPrimitive
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

// Export the renamed components
export {
  Command,
  CommandDialog,
  CommandInputComponent as CommandInput, // Export with original name
  CommandListComponent as CommandList, // Export with original name
  CommandEmptyComponent as CommandEmpty, // Export with original name
  CommandGroupComponent as CommandGroup, // Export with original name
  CommandItemComponent as CommandItem, // Export with original name
  CommandShortcut,
  CommandSeparatorComponent as CommandSeparator, // Export with original name
}
