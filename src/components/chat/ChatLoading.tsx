export function ChatLoading() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="flex space-x-2 justify-end">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-primary/20 rounded w-2/3 ml-auto animate-pulse" />
          <div className="h-4 bg-primary/20 rounded w-1/2 ml-auto animate-pulse" />
        </div>
        <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
      </div>
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
