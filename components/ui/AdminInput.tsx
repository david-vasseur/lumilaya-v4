"use client";

import {
  useForm,
} from "@tanstack/react-form";

type Props = {
  form: ReturnType<typeof useForm>;
  name: string;
  label: string;
  type?: string;
};

function AdminInput({
  form,
  name,
  label,
  type = "text",
}: Props) {

    return (
        <form.Field name={name}>
        {({ state, handleChange, handleBlur }) => (
            <div>
                <label className="block text-sm font-medium mb-2">
                    {label}
                </label>

                <input
                    type={type}
                    value={(state.value ?? "") as string}
                    onChange={(e) => {
                    const value =
                        type === "number"
                        ? Number(e.target.value)
                        : e.target.value;

                    handleChange(value);
                    }}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-black focus:outline-none transition"
                />

                {state.meta.errors.length > 0 && state.meta.isTouched && (
                    <p className="text-red-500 text-xs mt-1">
                    {String(state.meta.errors[0])}
                    </p>
                )}
            </div>
        )}
        </form.Field>
  );
}

export default AdminInput;