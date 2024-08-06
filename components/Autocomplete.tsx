import { cn } from "@/lib/utils";
import { CommandGroup, CommandItem, CommandList, CommandInput } from "./ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { Check } from "lucide-react";

export interface Option {
  id: string;
  name: string;
  gst?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  hsncode?: string;
  description?: string;
}

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option | null;
  onValueChange?: (value: Option) => void;
  placeholder?: string;
  className?: string;
};

const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  className,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<object>(value || {});
  const [valueName, setValueName] = useState<string>(value?.name || "");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }
      if (!isOpen) {
        setOpen(true);
      }
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find((option) => option.name === input.value);
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setOpen(false);
      setInputValue(selectedOption);
      setValueName(selectedOption.name);
      setSelected(selectedOption);
      onValueChange?.(selectedOption);
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );
  return (
    <CommandPrimitive
      onKeyDown={handleKeyDown}
      className={cn("rounded-lg border", className)}
    >
      <CommandInput
        ref={inputRef}
        value={valueName}
        onValueChange={setValueName}
        onBlur={handleBlur}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        disabled={false}
        className="text-base"
      />

      <div className="relative ">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute z-50 top-0 w-full rounded-xl bg-white  outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected?.id === option.id;
                return (
                  <CommandItem
                    key={option.name}
                    value={option.name}
                    onSelect={() => handleSelectOption(option)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    className={cn("flex w-full items-center gap-2", !isSelected ? "pl-8" : null)}
                  >
                    {isSelected ? <Check className="w-4" /> : null}
                    {option.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
              No results
            </CommandPrimitive.Empty>
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
export default AutoComplete;
