import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    label: string,
    textarea?: boolean
};

export const InputField: React.FC<InputFieldProps> = ({ size: _, textarea, ...props }) => {
    const [field, { error }] = useField(props);

    let InputOrTextArea = Input;

    if (textarea) {
        InputOrTextArea = Textarea
    }

    return (
        <FormControl marginTop="2rem" isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <InputOrTextArea {...field} {...props} value={field.value} id={field.name} placeholder={props.placeholder} />
            { error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
};

export default InputField;