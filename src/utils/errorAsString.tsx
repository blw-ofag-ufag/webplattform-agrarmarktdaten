import React from "react";

export const errorAsString = function (error: unknown): React.ReactNode {
  return error instanceof Error ? error.message : `${error}`;
};
