import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { serverError } from '../../utils/serverErrorMap';
import { toErrorMap } from '../../utils/toErrorMap';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { appServerError } from '../../utils/appServerErrorMap';
import { usePasswordResetMutation } from "../../generated/graphql";

type ForgotPasswordProps = {
    token: string
}
const ForgotPassword: NextPage<ForgotPasswordProps> = ({ token }) => {

    // return (
    //     <>
    //         <NavBar />
    //         <h1> Token : {token}</h1>
    //     </>
    // )


    const router = useRouter();
    const [, passwordReset] = usePasswordResetMutation();
    const [serverErr, setServerErr] = useState('');

    const submitForm = async (values, { setErrors }) => {
        const { email, password, confirm_password, token } = values;

        if (password !== confirm_password) {
            setErrors([{
                "password": "passwords must match"
            }, {
                "confirm_password": "passwords must match"
            }
            ]);
        } else {
            const response = await passwordReset({ email, password, password_token: token });
            if (response?.error) {
                setServerErr(serverError(response.error));

            } else if (response.data?.passwordReset.errors) {
                setErrors(toErrorMap(response.data.passwordReset.errors));
                setServerErr(appServerError(response.data.passwordReset.errors));
            } else if (response.data?.passwordReset.user) {
                router.push("/")
            } else {
                setServerErr("Error occured");
            }
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
        <>

            <Wrapper variant='small'>
                {serverErr ? err(serverErr) : ''}
                <Formik initialValues={{ email: "", password: "", confirm_password: "", token }} onSubmit={submitForm}>
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Easy Way */}
                            <InputField name='email' placeholder="username or email" label='email' type="email" />

                            {/* Easy Way */}
                            <InputField name="password" placeholder="password" label="Password" type="password" />

                            {/* Easy Way */}
                            <InputField name="confirm_password" placeholder="confirm password" label="Confirm Password" type="password" />

                            <Button mt="2rem" float="right" isLoading={isSubmitting} type="submit" color="teal">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );



};

ForgotPassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}


export default withUrqlClient(createUrqlClient)(ForgotPassword);