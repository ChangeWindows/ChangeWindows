import { Button as ButtonPrimitive } from "@base-ui/react";
import clsx from "clsx";

export default function Button({ icon, className, ...props }: ButtonPrimitive.Props & { icon?: boolean }) {
    return (
        <ButtonPrimitive
            className={clsx(
                // Layout
                "m-0 flex h-9 items-center justify-center px-3.5",
                {
                    "size-9": icon,
                },

                // Typography
                "text-base text-zinc-900",

                // Surface and border
                "rounded-md border border-transparent",

                // Interaction and accessibility
                "outline-0 select-none",
                "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800",
                "cursor-pointer",

                // Hover
                "hover:border-zinc-300 hover:bg-white hover:data-disabled:bg-zinc-50",

                // Active
                "active:inset-shadow-lg active:border-t-zinc-300 active:bg-zinc-200",
                "active:data-disabled:border-t-zinc-200 active:data-disabled:bg-zinc-50 active:data-disabled:shadow-none",

                // Disabled
                "data-disabled:text-zinc-500",
                className,
            )}
            {...props}
        />
    );
}
