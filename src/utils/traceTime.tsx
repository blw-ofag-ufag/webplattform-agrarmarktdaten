type Promiser<Args extends any[], T> = (...args: Args) => Promise<T>;

const SHOULD_TRACE = process.env.NODE_DEBUG ?? false;

export const traceTime = <T, Args extends any[]>(
  message: string,
  promiser: Promiser<Args, T>
): Promiser<Args, T> => {
  return async (...args: Args): Promise<T> => {
    const start = performance.now();
    const result = await promiser(...args);
    if (SHOULD_TRACE) {
      console.log("Time", message, performance.now() - start);
    }
    return result;
  };
};
