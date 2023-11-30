import {
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type InputProps = {
  labeled?: boolean;
  placeholder: string;
  onChange: (cursor: number, max: number, value?: string) => void;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { labeled = true, placeholder, onChange },
  ref
) => {
  const [digits, setDigits] = useState<string>();

  const cursor = useRef<number>(0);

  useEffect(() => {
    onChange(cursor.current + 1, placeholder.length, digits);
  }, [digits]);

  const onDigit = useCallback(
    (index: number, event: FormEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setDigits((digits = placeholder) => {
        const before = digits.substring(0, index);

        const after = digits.substring(index + 1);

        return before + value + after;
      });

      if (value.length === 0) return;

      const next = event.currentTarget.nextElementSibling;

      const input = next as HTMLInputElement | null;

      if (input) input.focus();
    },
    [placeholder]
  );

  return (
    <div>
      {labeled && (
        <label htmlFor="key" className="block text-xl font-bold mb-2">
          Key
        </label>
      )}
      <input
        hidden
        readOnly
        ref={ref}
        name="key"
        title="key"
        value={digits ?? placeholder}
      />
      <div className="flex gap-x-4 text-3xl font-bold">
        {Array.from(placeholder).map((thumb, index) => {
          return (
            <input
              key={index}
              type="text"
              maxLength={1}
              placeholder={thumb}
              autoComplete="one-time-code"
              onFocus={(event) => {
                const target = event.currentTarget;

                target.setSelectionRange(0, target.value.length);
              }}
              onKeyDown={(event) => {
                const target = event.currentTarget;

                if (event.key === "Backspace") {
                  const previous = target.previousElementSibling;

                  const input = previous as HTMLInputElement | null;

                  if (input) input.focus();
                } else {
                  target.setSelectionRange(0, target.value.length);
                }
              }}
              onInput={(event) => {
                onDigit(index, event);
              }}
              onChange={() => {
                cursor.current = index;
              }}
              className="bg-transparent text-center ring-2 ring-white placeholder-shown:ring-zinc-600  rounded hover:outline-none placeholder:text-zinc-600 w-[2.25ch] selection:select-none px- py-3"
            />
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(Input);
