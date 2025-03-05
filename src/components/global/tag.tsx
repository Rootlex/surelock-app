import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
    "flex px-3 py-1.5 items-center rounded-full w-fit gap-x-2",
    {
        variants: {
            variant: {
                good: "bg-[#EDFEE6] text-[#5DA04E]",
                bad: "bg-[#FEEFEE] text-[#D83B3B]",
                neutral: "bg-[#F5F5F5] text-[#5F5F5F]",
            },
        },
        defaultVariants: {
            variant: "good",
        },
    }
);

export interface TagProps extends VariantProps<typeof tagVariants> {
    text: string;
    asChild?: boolean;
}

const Tag = ({ variant, text }: TagProps) => {
    return (
        <div className={cn(tagVariants({ variant }))}>
            <div
                className={cn(
                    "w-2 h-2 rounded-full",
                    variant === "good"
                        ? "bg-[#5DA04E]"
                        : variant === "bad"
                        ? "bg-[#D83B3B]"
                        : variant === "neutral"
                        ? "bg-[#5F5F5F]"
                        : "bg-[#5F5F5F]"
                )}
            />
            <p className="text-xs font-semibold">{text}</p>
        </div>
    );
};

export default Tag;
