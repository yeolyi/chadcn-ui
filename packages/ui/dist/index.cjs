"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

// src/button.tsx
var _classvarianceauthority = require('class-variance-authority');
var _radixui = require('radix-ui');
var _react = require('react'); var React = _interopRequireWildcard(_react); var React2 = _interopRequireWildcard(_react); var React3 = _interopRequireWildcard(_react); var React4 = _interopRequireWildcard(_react); var React5 = _interopRequireWildcard(_react); var React6 = _interopRequireWildcard(_react);

// src/lib/utils.ts
var _clsx = require('clsx');
var _tailwindmerge = require('tailwind-merge');
function cn(...inputs) {
  return _tailwindmerge.twMerge.call(void 0, _clsx.clsx.call(void 0, inputs));
}

// src/button.tsx
var _jsxruntime = require('react/jsx-runtime');
var buttonVariants = _classvarianceauthority.cva.call(void 0, 
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
  const Comp = asChild ? _radixui.Slot.Root : "button";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


function Input({
  className,
  type,
  onChange,
  ...props
}) {
  const chadType = type === "password" ? "text" : type;
  const handleChange = React2.useCallback(
    (e) => {
      _optionalChain([onChange, 'optionalCall', _2 => _2(e)]);
      const value = e.target.value;
      if (value.length > 0 && typeof window !== "undefined" && window.speechSynthesis) {
        const lastChar = value[value.length - 1];
        const utterance = new SpeechSynthesisUtterance(lastChar);
        utterance.rate = 1.2;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    },
    [onChange]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
var _lucidereact = require('lucide-react');



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
        _optionalChain([onValueChange, 'optionalCall', _3 => _3(others[Math.floor(Math.random() * others.length)])]);
      } else {
        _optionalChain([onValueChange, 'optionalCall', _4 => _4(value)]);
      }
    },
    [onValueChange]
  );
  const handleOpenChange = React3.useCallback(
    (open) => {
      if (open) setOpenCount((c) => c + 1);
      _optionalChain([onOpenChange, 'optionalCall', _5 => _5(open)]);
    },
    [onOpenChange]
  );
  const ctx = React3.useMemo(() => ({ valuesRef: allValuesRef, openCount }), [openCount]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ChadSelectContext.Provider, { value: ctx, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Select.Root,
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Select.Group, { "data-slot": "select-group", ...props });
}
function SelectValue({ ...props }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Select.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _radixui.Select.Trigger,
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
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Select.Icon, { asChild: true, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.ChevronDownIcon, { className: "size-4 opacity-50" }) })
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
  const shuffledChildren = React3.useMemo(() => shuffleChildren(children), [children, _optionalChain([chadCtx, 'optionalAccess', _6 => _6.openCount])]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Select.Portal, { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _radixui.Select.Content,
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
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SelectScrollUpButton, {}),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _radixui.Select.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: shuffledChildren
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({ className, ...props }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Select.Label,
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _radixui.Select.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Select.ItemIndicator, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.CheckIcon, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Select.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Select.Separator,
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Select.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Select.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.ChevronDownIcon, { className: "size-4" })
    }
  );
}

// src/checkbox.tsx




function Checkbox({
  className,
  onCheckedChange,
  checked,
  defaultChecked,
  ...props
}) {
  const isDisabled = _nullishCoalesce(props.disabled, () => ( false));
  const [internalChecked, setInternalChecked] = React4.useState(
    isDisabled ? true : _nullishCoalesce(_nullishCoalesce(defaultChecked, () => ( checked)), () => ( false))
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
          _optionalChain([onCheckedChange, 'optionalCall', _7 => _7(true)]);
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
      _optionalChain([onCheckedChange, 'optionalCall', _8 => _8(value)]);
    },
    [onCheckedChange, internalChecked]
  );
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Checkbox.Root,
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
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _radixui.Checkbox.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

// src/radio-group.tsx




var DisabledContext = React5.createContext(false);
function RadioGroup({
  className,
  disabled = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, DisabledContext.Provider, { value: disabled, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Checkbox.Root,
    {
      "data-slot": "radio-group-item",
      disabled: disabled || groupDisabled,
      className: cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props,
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _radixui.Checkbox.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.CircleIcon, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}

// src/slider.tsx



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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _radixui.Slider.Root,
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
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _radixui.Slider.Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _radixui.Slider.Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _radixui.Slider.Thumb,
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


function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Switch.Root,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      ),
      ...props,
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _radixui.Switch.Thumb,
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

function Textarea({ className, ...props }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _radixui.Tooltip.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Tooltip.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Tooltip.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Tooltip.Portal, { children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _radixui.Tooltip.Content,
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
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _radixui.Tooltip.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
























exports.Button = Button; exports.Checkbox = Checkbox; exports.Input = Input; exports.RadioGroup = RadioGroup; exports.RadioGroupItem = RadioGroupItem; exports.Select = Select; exports.SelectContent = SelectContent; exports.SelectGroup = SelectGroup; exports.SelectItem = SelectItem; exports.SelectLabel = SelectLabel; exports.SelectScrollDownButton = SelectScrollDownButton; exports.SelectScrollUpButton = SelectScrollUpButton; exports.SelectSeparator = SelectSeparator; exports.SelectTrigger = SelectTrigger; exports.SelectValue = SelectValue; exports.Slider = Slider; exports.Switch = Switch; exports.Textarea = Textarea; exports.Tooltip = Tooltip; exports.TooltipContent = TooltipContent; exports.TooltipProvider = TooltipProvider; exports.TooltipTrigger = TooltipTrigger; exports.buttonVariants = buttonVariants;
