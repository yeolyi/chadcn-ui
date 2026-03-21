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
  onChange,
  ...props
}) {
  const chadType = type === "password" ? "text" : type;
  const handleChange = React2.useCallback(
    (e) => {
      const value = e.target.value;
      if (value.length >= 2 && Math.random() < 0.05) {
        const swapped = value.slice(0, -2) + value[value.length - 1] + value[value.length - 2];
        e.target.value = swapped;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(e.target, swapped);
      }
      onChange?.(e);
    },
    [onChange]
  );
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
      ...props,
      onChange: handleChange
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
  const items = [];
  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i];
    const props = React3.isValidElement(child) ? child.props : null;
    if (props && props["data-slot"] !== "select-separator" && props["data-slot"] !== "select-label") {
      items.push({ index: i, node: child });
    }
  }
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const result = [];
  let itemIdx = 0;
  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i];
    const props = React3.isValidElement(child) ? child.props : null;
    if (props && props["data-slot"] !== "select-separator" && props["data-slot"] !== "select-label") {
      result.push(shuffled[itemIdx].node);
      itemIdx++;
    } else {
      result.push(child);
    }
  }
  return result;
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
  const isDisabled = props.disabled ?? false;
  const [internalChecked, setInternalChecked] = React4.useState(
    isDisabled ? true : defaultChecked ?? checked ?? false
  );
  const ref = React4.useRef(null);
  React4.useEffect(() => {
    if (isDisabled) {
      setInternalChecked(true);
    } else if (checked !== void 0) {
      setInternalChecked(checked);
    }
  }, [checked, isDisabled]);
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
var DAMPING = 0.96;
var BOUNCE = 0.7;
var HIT_RADIUS = 12;
function Slider({
  className,
  defaultValue,
  value: controlledValue,
  min = 0,
  max = 100,
  onValueChange,
  ref,
  ...props
}) {
  const isControlled = controlledValue !== void 0;
  const [initArray] = React6.useState(() => {
    const v = controlledValue ?? defaultValue ?? [min, max];
    return Array.isArray(v) ? v : [v];
  });
  const [values, setValues] = React6.useState(initArray);
  const _values = isControlled ? Array.isArray(controlledValue) ? controlledValue : [controlledValue] : values;
  const valuesRef = React6.useRef(_values);
  valuesRef.current = _values;
  const onValueChangeRef = React6.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const physics = React6.useRef(initArray.map(() => ({ vx: 0 })));
  const cursor = React6.useRef({ x: 0, vx: 0, t: 0, on: false });
  const rootRef = React6.useRef(null);
  const raf = React6.useRef(0);
  const lt = React6.useRef(0);
  const setRef = React6.useCallback(
    (node) => {
      ;
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );
  const updateValues = React6.useCallback(
    (nv) => {
      const c = nv.map((v) => Math.max(min, Math.min(max, v)));
      const cur = valuesRef.current;
      if (c.every((v, i) => Math.abs(v - (cur[i] ?? 0)) < 0.01)) return;
      valuesRef.current = c;
      if (!isControlled) setValues(c);
      onValueChangeRef.current?.(c);
    },
    [min, max, isControlled]
  );
  React6.useEffect(() => {
    let running = true;
    lt.current = 0;
    const tick = (time) => {
      if (!running) return;
      if (lt.current === 0) {
        lt.current = time;
        raf.current = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min((time - lt.current) / 1e3, 0.033);
      lt.current = time;
      const el = rootRef.current;
      if (!el) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      const trackW = el.getBoundingClientRect().width;
      if (trackW === 0) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      const vs = valuesRef.current;
      const ps = physics.current;
      while (ps.length < vs.length) ps.push({ vx: 0 });
      let changed = false;
      const nv = [...vs];
      for (let i = 0; i < vs.length; i++) {
        const p = ps[i];
        if (cursor.current.on) {
          const thumbPx = (vs[i] - min) / (max - min) * trackW;
          if (Math.abs(thumbPx - cursor.current.x) < HIT_RADIUS) {
            p.vx += cursor.current.vx * ((max - min) / trackW) * 0.5;
          }
        }
        p.vx *= Math.pow(DAMPING, dt * 60);
        if (Math.abs(p.vx) < 0.05) p.vx = 0;
        if (p.vx === 0) continue;
        nv[i] += p.vx * dt;
        changed = true;
        if (nv[i] < min) {
          nv[i] = min;
          p.vx = Math.abs(p.vx) * BOUNCE;
        } else if (nv[i] > max) {
          nv[i] = max;
          p.vx = -Math.abs(p.vx) * BOUNCE;
        }
      }
      if (changed) updateValues(nv);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf.current);
    };
  }, [min, max, updateValues]);
  const handlePointerMove = React6.useCallback(
    (e) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const now = performance.now();
      const x = e.clientX - rect.left;
      const c = cursor.current;
      const cdt = (now - c.t) / 1e3;
      if (cdt > 1e-3 && cdt < 0.1) c.vx = (x - c.x) / cdt;
      c.x = x;
      c.t = now;
      c.on = true;
    },
    []
  );
  const handlePointerLeave = React6.useCallback(() => {
    cursor.current.on = false;
    cursor.current.vx = 0;
  }, []);
  const blockDrag = React6.useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  return /* @__PURE__ */ jsxs2(
    SliderPrimitive.Root,
    {
      "data-slot": "slider",
      value: _values,
      min,
      max,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      ref: setRef,
      onPointerDownCapture: blockDrag,
      onPointerMoveCapture: handlePointerMove,
      onPointerLeave: handlePointerLeave,
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
            tabIndex: -1,
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          index
        ))
      ]
    }
  );
}

// src/switch.tsx
import * as React7 from "react";
import { Fragment, jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var DAMPING2 = 0.96;
var BOUNCE2 = 0.9;
var INERTIA = 1.2;
var TILT_FORCE = 150;
function Switch({
  className,
  size = "default",
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  name,
  value,
  id,
  ref,
  ...props
}) {
  const thumbSize = size === "sm" ? 12 : 16;
  const thumbR = thumbSize / 2;
  const range = thumbSize - 2;
  const mid = range / 2;
  const trackRef = React7.useRef(null);
  const thumbRef = React7.useRef(null);
  const isControlled = controlledChecked !== void 0;
  const [internalChecked, setInternalChecked] = React7.useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;
  const checkedRef = React7.useRef(checked);
  checkedRef.current = checked;
  const onChangeRef = React7.useRef(onCheckedChange);
  onChangeRef.current = onCheckedChange;
  const setChecked = React7.useCallback(
    (v) => {
      if (v === checkedRef.current) return;
      checkedRef.current = v;
      if (!isControlled) setInternalChecked(v);
      onChangeRef.current?.(v);
    },
    [isControlled]
  );
  const initialChecked = controlledChecked ?? defaultChecked;
  const p = React7.useRef({
    x: initialChecked ? range : 0,
    vx: 0,
    rot: 0
  });
  const tilt = React7.useRef(0);
  const [gyroState, setGyroState] = React7.useState("idle");
  const prevScreenX = React7.useRef(0);
  const raf = React7.useRef(0);
  const lt = React7.useRef(0);
  const setRef = React7.useCallback(
    (node) => {
      ;
      trackRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        ref.current = node;
    },
    [ref]
  );
  React7.useEffect(() => {
    if (!disabled) return;
    if (thumbRef.current) {
      const sx = checkedRef.current ? range : 0;
      thumbRef.current.style.transform = `translateX(${sx}px)`;
    }
  }, [disabled, range]);
  const onOrientation = React7.useCallback((e) => {
    tilt.current = e.gamma ?? 0;
  }, []);
  React7.useEffect(() => {
    if (disabled) return;
    const doe = DeviceOrientationEvent;
    if (typeof doe.requestPermission === "function") {
      setGyroState("needs-permission");
    } else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation);
      setGyroState("granted");
    }
    return () => {
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [disabled, onOrientation]);
  const requestGyro = React7.useCallback(async () => {
    const doe = DeviceOrientationEvent;
    if (typeof doe.requestPermission !== "function") return;
    const perm = await doe.requestPermission();
    if (perm === "granted") {
      window.addEventListener("deviceorientation", onOrientation);
      setGyroState("granted");
    }
  }, [onOrientation]);
  React7.useEffect(() => {
    if (disabled) return;
    let running = true;
    lt.current = 0;
    prevScreenX.current = window.screenX;
    const tick = (time) => {
      if (!running) return;
      if (lt.current === 0) {
        lt.current = time;
        raf.current = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min((time - lt.current) / 1e3, 0.033);
      lt.current = time;
      const s = p.current;
      const screenX = window.screenX;
      const windowDx = screenX - prevScreenX.current;
      prevScreenX.current = screenX;
      s.vx -= windowDx * INERTIA;
      const normalizedTilt = Math.max(-1, Math.min(1, tilt.current / 45));
      s.vx += normalizedTilt * TILT_FORCE * dt;
      s.vx *= Math.pow(DAMPING2, dt * 60);
      if (Math.abs(s.vx) < 0.1) s.vx = 0;
      s.x += s.vx * dt;
      if (s.x < 0) {
        s.x = 0;
        s.vx = Math.abs(s.vx) * BOUNCE2;
      } else if (s.x > range) {
        s.x = range;
        s.vx = -Math.abs(s.vx) * BOUNCE2;
      }
      s.rot += s.vx * dt / thumbR * (180 / Math.PI);
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translateX(${s.x}px) rotate(${s.rot}deg)`;
      }
      if (s.x > mid + 1 && !checkedRef.current) {
        setChecked(true);
        trackRef.current?.setAttribute("data-state", "checked");
        trackRef.current?.setAttribute("aria-checked", "true");
        thumbRef.current?.setAttribute("data-state", "checked");
      } else if (s.x < mid - 1 && checkedRef.current) {
        setChecked(false);
        trackRef.current?.setAttribute("data-state", "unchecked");
        trackRef.current?.setAttribute("aria-checked", "false");
        thumbRef.current?.setAttribute("data-state", "unchecked");
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf.current);
    };
  }, [disabled, range, mid, thumbR, setChecked]);
  React7.useEffect(() => {
    if (!isControlled || disabled) return;
    const s = p.current;
    if (controlledChecked && s.x < mid) {
      s.vx += 200;
    } else if (!controlledChecked && s.x > mid) {
      s.vx -= 200;
    }
  }, [controlledChecked, isControlled, mid, disabled]);
  const state = checked ? "checked" : "unchecked";
  if (gyroState === "needs-permission") {
    return /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        id,
        disabled,
        className: cn(
          "inline-flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/80 active:bg-muted/60",
          className
        ),
        onClick: requestGyro,
        children: [
          /* @__PURE__ */ jsx7("span", { className: "text-sm", children: "\u{1FAF3}" }),
          "Tap to enable tilt"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx7(
      "button",
      {
        ref: setRef,
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "data-state": state,
        "data-slot": "switch",
        "data-size": size,
        id,
        disabled,
        className: cn(
          "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          "data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsx7(
          "div",
          {
            ref: thumbRef,
            "data-state": state,
            "data-slot": "switch-thumb",
            className: "pointer-events-none relative block rounded-full bg-background ring-0 group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
            style: {
              transform: `translateX(${p.current.x}px)`,
              willChange: "transform"
            },
            children: /* @__PURE__ */ jsx7(
              "span",
              {
                className: "absolute rounded-full bg-muted-foreground/25",
                style: {
                  width: Math.max(2, thumbSize * 0.2),
                  height: Math.max(2, thumbSize * 0.2),
                  top: 1,
                  left: "50%",
                  transform: "translateX(-50%)"
                }
              }
            )
          }
        )
      }
    ),
    name && /* @__PURE__ */ jsx7(
      "input",
      {
        type: "hidden",
        name,
        value: checked ? value ?? "on" : ""
      }
    )
  ] });
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
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx9(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs4(
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
