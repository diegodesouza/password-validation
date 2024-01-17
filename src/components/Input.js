import { observer } from "mobx-react-lite"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
const Input = (
    {
        dataTestId,
        name,
        label,
        inputType,
        placeholder,
        cssClasses,
        onChange,
        value,
        visible,
        toggleVisibility,
    }) => {
    return (
        <div className="Input">
            <label
                htmlFor={name}
                className="block text-left text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="container mx-auto relative ">
                <input
                    data-testid={dataTestId}
                    type={inputType}
                    name={name}
                    id={name}
                    className={`${cssClasses} w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
                <button
                    data-testid="toggle-visibility"
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={toggleVisibility}
                >
                    {
                        visible ?
                            <EyeSlashIcon className="h-5 w-5" data-testid="eye-slash-icon"/> :
                            <EyeIcon className="h-5 w-5" data-testid="eye-icon"/>
                    }
                </button>
            </div>
        </div>
    )
}

export default observer(Input);
