import { FormControl, FormLabel, Input, FormErrorMessage, Button, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { serverError } from '../utils/serverErrorMap';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';


export type RegisterProps = {

}




export const Register: React.FC<RegisterProps> = ({ }) => {
    const router = useRouter();
    const [, registerEndpoint] = useRegisterMutation();
    const [serverErr, setServerErr] = useState('');

    const submitRegForm = async (values, { setErrors }) => {
        const { name, username, email, password } = values;
        const response = await registerEndpoint({ name, username, email, password });
        if (response?.error) {
            setServerErr(serverError(response.error)['server_error']);
        }
        if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
        }

        if (response.data?.register.user) {
            router.push("/")
        }
    }

    const err = (message) => (
        <Alert status="error" mb="2rem">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    );

    return (
        <Wrapper variant='small'>
            {serverErr ? err(serverErr) : ''}
            <Formik initialValues={{ username: "", password: "", email: "", name: "" }} onSubmit={submitRegForm}>
                {({ isSubmitting }) => (
                    <Form>
                        {/* Easy Way */}
                        <InputField name='name' placeholder="full name" label='Name' type="text" />

                        {/* Easy Way */}
                        <InputField name='email' placeholder="email" label='Email' type="email" />

                        {/* Hard war */}
                        {/* <FormControl marginTop="2rem">
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input id="username" placeholder="username or email" /> */}
                        {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        {/* </FormControl> */}

                        {/* Easy Way */}
                        <InputField name="username" placeholder="username" label="Username" type="text" />

                        {/* Easy Way */}
                        <InputField name="password" placeholder="password" label="Password" type="password" />

                        <Button mt="2rem" float="right" isLoading={isSubmitting} type="submit" color="teal">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};



export default Register;