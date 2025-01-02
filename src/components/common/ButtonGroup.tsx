"use client";

import { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonGroupsProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}

export function ButtonGroup({ className, children }: ButtonGroupsProps) {
  const totalButton = Children.count(children);

  return (
    <div className={cn("flex w-full", className)}>
      {Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === totalButton - 1;

        return cloneElement(child, {
          className: cn(
            {
              "rounded-l-none": !isFirst,
              "rounded-r-none": !isLast,
              "border-l-0": !isFirst,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}
