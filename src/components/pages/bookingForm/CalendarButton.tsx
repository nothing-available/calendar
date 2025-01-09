import { AriaButtonProps, useButton } from "@react-aria/button";
import { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import { useFocusRing } from "@react-aria/focus";
import { Button } from "@/components/ui/button";
import { mergeProps } from "@react-aria/utils";

export function CalendarButton(
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();

  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      disabled={props.isDisabled}
      variant='outline'
      size='icon'>
      {props.children}
    </Button>
  );
}
