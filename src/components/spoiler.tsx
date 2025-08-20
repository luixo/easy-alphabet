import React from "react";

import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"div"> & { header: string };

export const Spoiler: React.FC<Props> = ({ header, className, ...props }) => {
  const [isOpen, setOpen] = React.useState(false);
  const switchOpen = React.useCallback(() => setOpen((x) => !x), [setOpen]);
  return (
    <div className="flex w-full flex-col gap-4">
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={switchOpen}
      >
        <div className="flex items-center gap-2">
          <div
            className={twMerge(
              "transform transition-all duration-200 ease-linear",
              isOpen ? "rotate-90" : undefined,
            )}
          >
            ▶
          </div>
          {header}
        </div>
        <div className="flex-1 border-t border-black" />
      </div>
      {isOpen ? (
        <div className={twMerge("pl-6", className)} {...props} />
      ) : null}
    </div>
  );
};
