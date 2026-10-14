import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"div"> & { header: string };

export const Spoiler: React.FC<Props> = ({ header, className, ...props }) => {
	const [open, setOpen] = React.useState(false);
	const switchOpen = React.useCallback(() => setOpen((x) => !x), [setOpen]);
	return (
		<div className="flex w-full flex-col gap-4">
			<button
				type="button"
				aria-expanded={open}
				className="flex cursor-pointer items-center gap-2"
				onClick={switchOpen}
			>
				<span className="flex items-center gap-2">
					<span
						className={twMerge(
							"transform transition-all duration-200 ease-linear",
							open ? "rotate-90" : undefined,
						)}
					>
						▶
					</span>
					{header}
				</span>
				<span className="flex-1 border-t border-black" />
			</button>
			{open ? <div className={twMerge("pl-6", className)} {...props} /> : null}
		</div>
	);
};
