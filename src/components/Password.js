import React from "react";
import Input from "./Input";
import { observer } from "mobx-react-lite"
import {usePasswordStore} from "../stores/PasswordStore";
// import { CheckIcon } from "@heroicons/react/24/solid";

const Password = () => {
    const {
        validations,
        handleChangePasswordStore,
        showValidations,
        password,
        passwordConfirmation,
        setPassword,
        handleSubmit,
        toggleVisibility,
    } = usePasswordStore();

    return (
        <form className="min-w-[35rem] block mt-20 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <Input
                dataTestId='password'
                name="password"
                label="Password"
                inputType={password.visible ? 'text' : 'password'}
                placeholder="Password"
                value={password.value}
                onChange={(value) => setPassword('password', value)}
                visible={password.visible}
                toggleVisibility={() => toggleVisibility('password', !password.visible)}
            />
            <div className="mt-5">
                <Input
                    dataTestId='password-confirmation'
                    name="password-confirmation"
                    label="Confirm Password"
                    inputType={passwordConfirmation.visible ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={passwordConfirmation.value}
                    onChange={(value) => setPassword('passwordConfirmation', value)}
                    visible={passwordConfirmation.visible}
                    toggleVisibility={() => toggleVisibility('passwordConfirmation', !passwordConfirmation.visible)}
                />
            </div>
            {
                showValidations &&
                <div className="block mt-10 bg-red-700 rounded p-4 text-left">
                    {

                        validations
                            .filter(validation => !validation.valid)
                            .map(validation => (
                            <div
                                key={validation.type}
                                // className={`text-sm flex items-center ${validation.valid ? 'text-green-500' : 'text-white'}`}
                                className="text-sm text-white"
                            >
                                {/*<CheckIcon className="h-5 w-5 mr-2" /> {validation.message}*/}
                                {validation.message}
                            </div>
                        ))
                    }
                </div>
            }
            <button type="button"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                        handleChangePasswordStore('showValidations', true)
                        handleSubmit()
                    }}
            >
                Submit
            </button>
        </form>
    )
}

export default observer(Password);
