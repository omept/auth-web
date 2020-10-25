import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    label: string
};

export const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl marginTop="2rem" isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} {...props} value={field.value} id={field.name} placeholder={props.placeholder} />
            { error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
};

export default InputField;