import { Button, Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRequestForgotPasswordMutation } from '../generated/graphql';
import { serverError } from '../utils/serverErrorMap';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { appServerError } from '../utils/appServerErrorMap';
import NavBar from '../components/NavBar';

export type RequestForgotPasswordProps = {

}




export const RequestForgotPassword: React.FC<RequestForgotPasswordProps> = ({ }) => {
    const [, requestPassword] = useRequestForgotPasswordMutation();
    const [serverErr, setServerErr] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    const submitForm = async (values, { setErrors }) => {
        const { email } = values;

        const response = await requestPassword({ usernameOrEmail: email });

        if (response?.error) {
            setServerErr(serverError(response.error));

        } else if (response.data?.forgotPassword.errors) {
            setErrors(toErrorMap(response.data.forgotPassword.errors));
            setServerErr(appServerError(response.data.forgotPassword.errors));
        } else if (response.data?.forgotPassword.sent) {
            setMessageSent(true);
        } else {
            setServerErr("Error occured");
        }

    }

    const err = (message) => (
        <Alert status="error" mb="2rem">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
        </Alert>
    );

    const mSent = (message) => (
        <Alert status="success" mb="2rem">
            <AlertIcon />
            <AlertTitle mr={2}>Success</AlertTitle>
            <AlertDescription>Password reset successful</AlertDescription>
        </Alert>
    );

    return (
        <>
            <NavBar />
            <Wrapper variant='small'>
                {serverErr ? err(serverErr) : ''}
                {messageSent && !serverErr ? mSent(messageSent) : ''}
                <Formik initialValues={{ email: "" }} onSubmit={submitForm}>
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Easy Way */}
                            <InputField name='email' placeholder="email" label='Email' type="email" />

                            <Button mt="2rem" float="right" isLoading={isSubmitting} type="submit" color="teal">Send</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};



export default withUrqlClient(createUrqlClient)(RequestForgotPassword);