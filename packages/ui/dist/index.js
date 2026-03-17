"use client";

// src/button.tsx
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/button.tsx
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  onClick,
  children,
  ref,
  ...props
}) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const internalRef = React.useRef(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const attemptsRef = React.useRef(0);
  const setRefs = React.useCallback(
    (node) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const escape = React.useCallback(() => {
    if (attemptsRef.current >= 2) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    attemptsRef.current += 1;
    const btn = internalRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const radius = Math.max(rect.width, rect.height) + 10;
    const mouse = mouseRef.current;
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = radius * (0.5 + Math.random() * 0.5);
      const nx = Math.cos(angle) * dist;
      const ny = Math.sin(angle) * dist;
      const origCx2 = rect.left + rect.width / 2 - offset.x;
      const origCy2 = rect.top + rect.height / 2 - offset.y;
      const newCx = origCx2 + nx;
      const newCy = origCy2 + ny;
      const distToMouse = Math.sqrt((newCx - mouse.x) ** 2 + (newCy - mouse.y) ** 2);
      if (distToMouse > radius * 0.6) {
        setOffset({ x: nx, y: ny });
        return;
      }
    }
    const origCx = rect.left + rect.width / 2 - offset.x;
    const origCy = rect.top + rect.height / 2 - offset.y;
    const dx = origCx - mouse.x;
    const dy = origCy - mouse.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    setOffset({ x: dx / len * radius, y: dy / len * radius });
  }, [offset]);
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref: setRefs,
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      onClick,
      onMouseEnter: escape,
      style: {
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.15s ease-out",
        position: "relative",
        zIndex: 50
      },
      ...props,
      children
    }
  );
}

// src/input.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Input({
  className,
  type,
  onBlur,
  ...props
}) {
  const chadType = React2.useMemo(() => {
    if (type === "password") return "text";
    if (type === "text" || type === void 0) return "password";
    return type;
  }, [type]);
  return /* @__PURE__ */ jsx2(
    "input",
    {
      type: chadType,
      "data-slot": "input",
      className: cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      ),
      onBlur,
      ...props
    }
  );
}

// src/select.tsx
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import * as React3 from "react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var ChadSelectContext = React3.createContext(null);
function Select({
  onValueChange,
  onOpenChange,
  children,
  ...props
}) {
  const allValuesRef = React3.useRef([]);
  const [openCount, setOpenCount] = React3.useState(0);
  const handleValueChange = React3.useCallback(
    (value) => {
      const values = allValuesRef.current;
      if (Math.random() < 0.15 && values.length > 1) {
        const others = values.filter((v) => v !== value);
        onValueChange?.(others[Math.floor(Math.random() * others.length)]);
      } else {
        onValueChange?.(value);
      }
    },
    [onValueChange]
  );
  const handleOpenChange = React3.useCallback(
    (open) => {
      if (open) setOpenCount((c) => c + 1);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );
  const ctx = React3.useMemo(() => ({ valuesRef: allValuesRef, openCount }), [openCount]);
  return /* @__PURE__ */ jsx3(ChadSelectContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx3(
    SelectPrimitive.Root,
    {
      "data-slot": "select",
      onValueChange: handleValueChange,
      onOpenChange: handleOpenChange,
      ...props,
      children
    }
  ) });
}
function SelectGroup({ ...props }) {
  return /* @__PURE__ */ jsx3(SelectPrimitive.Group, { "data-slot": "select-group", ...props });
}
function SelectValue({ ...props }) {
  return /* @__PURE__ */ jsx3(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx3(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx3(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function shuffleChildren(children) {
  const childArray = React3.Children.toArray(children);
  return childArray.map((child) => {
    if (!React3.isValidElement(child)) return child;
    const childProps = child.props;
    if (!childProps.children) return child;
    const groupChildren = React3.Children.toArray(childProps.children);
    const items = [];
    const result = [];
    for (let i = 0; i < groupChildren.length; i++) {
      const gc = groupChildren[i];
      const gcProps = React3.isValidElement(gc) ? gc.props : null;
      if (gcProps && gcProps["data-slot"] !== "select-label" && gcProps["data-slot"] !== "select-separator") {
        items.push({ index: i, node: gc });
      }
    }
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    let itemIdx = 0;
    for (let i = 0; i < groupChildren.length; i++) {
      const gc = groupChildren[i];
      const gcProps = React3.isValidElement(gc) ? gc.props : null;
      if (gcProps && gcProps["data-slot"] !== "select-label" && gcProps["data-slot"] !== "select-separator") {
        result.push(shuffled[itemIdx].node);
        itemIdx++;
      } else {
        result.push(gc);
      }
    }
    return React3.cloneElement(child, { children: result });
  });
}
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  const chadCtx = React3.useContext(ChadSelectContext);
  const shuffledChildren = React3.useMemo(() => shuffleChildren(children), [children, chadCtx?.openCount]);
  return /* @__PURE__ */ jsx3(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx3(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx3(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: shuffledChildren
          }
        ),
        /* @__PURE__ */ jsx3(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.Label,
    {
      "data-slot": "select-label",
      className: cn("px-2 py-1.5 text-xs text-muted-foreground", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  const chadCtx = React3.useContext(ChadSelectContext);
  React3.useEffect(() => {
    if (chadCtx && props.value) {
      const v = props.value;
      if (!chadCtx.valuesRef.current.includes(v)) chadCtx.valuesRef.current.push(v);
      return () => {
        chadCtx.valuesRef.current = chadCtx.valuesRef.current.filter((x) => x !== v);
      };
    }
  }, [chadCtx, props.value]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx3(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ jsx3(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx3(CheckIcon, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ jsx3(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.Separator,
    {
      "data-slot": "select-separator",
      className: cn("pointer-events-none -mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ jsx3(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ jsx3(ChevronDownIcon, { className: "size-4" })
    }
  );
}

// src/checkbox.tsx
import { CheckIcon as CheckIcon2 } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React4 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
function Checkbox({
  className,
  onCheckedChange,
  checked,
  defaultChecked,
  ...props
}) {
  const [internalChecked, setInternalChecked] = React4.useState(defaultChecked ?? checked ?? false);
  const ref = React4.useRef(null);
  React4.useEffect(() => {
    if (checked !== void 0) setInternalChecked(checked);
  }, [checked]);
  React4.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && internalChecked !== true) {
          setInternalChecked(true);
          onCheckedChange?.(true);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onCheckedChange, internalChecked]);
  const handleCheckedChange = React4.useCallback(
    (value) => {
      if (internalChecked === true) return;
      setInternalChecked(value);
      onCheckedChange?.(value);
    },
    [onCheckedChange, internalChecked]
  );
  return /* @__PURE__ */ jsx4(
    CheckboxPrimitive.Root,
    {
      ref,
      "data-slot": "checkbox",
      checked: internalChecked,
      onCheckedChange: handleCheckedChange,
      className: cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx4(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsx4(CheckIcon2, { className: "size-3.5" })
        }
      )
    }
  );
}

// src/radio-group.tsx
import { CircleIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive2 } from "radix-ui";
import * as React5 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var DisabledContext = React5.createContext(false);
function RadioGroup({
  className,
  disabled = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx5(DisabledContext.Provider, { value: disabled, children: /* @__PURE__ */ jsx5(
    "div",
    {
      role: "radiogroup",
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props,
      children
    }
  ) });
}
function RadioGroupItem({
  className,
  disabled,
  ...props
}) {
  const groupDisabled = React5.useContext(DisabledContext);
  return /* @__PURE__ */ jsx5(
    CheckboxPrimitive2.Root,
    {
      "data-slot": "radio-group-item",
      disabled: disabled || groupDisabled,
      className: cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx5(
        CheckboxPrimitive2.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsx5(CircleIcon, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}

// src/slider.tsx
import { Slider as SliderPrimitive } from "radix-ui";
import * as React6 from "react";
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = React6.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxs2(
    SliderPrimitive.Root,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx6(
          SliderPrimitive.Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ jsx6(
              SliderPrimitive.Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx6(
          SliderPrimitive.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          index
        ))
      ]
    }
  );
}

// src/switch.tsx
import { Switch as SwitchPrimitive } from "radix-ui";
import { jsx as jsx7 } from "react/jsx-runtime";
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx7(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
          )
        }
      )
    }
  );
}

// src/textarea.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx8(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}

// src/tooltip.tsx
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ jsx9(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ jsx9(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx9(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs3(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx9(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
export {
  Button,
  Checkbox,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  buttonVariants
};
