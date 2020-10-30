import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from 'next-urql';

export type NavBarProps = {}
export const NavBar: React.FC<NavBarProps> = ({ }) => {

    const [{ fetching: logoutFetching }, logoutUser] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({ pause: isServer() });

    const logout = () => {
        logoutUser();
    }

    let body;

    if (fetching) {

    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr="2rem">
                    {data.me.username}
                </Box>
                <Button onClick={logout} isLoading={logoutFetching} variant="link"> logout </Button>
            </Flex>
        )
    }

    return (
        <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4} >
            <Box ml="auto">
                {isServer() ? '' : body}
            </Box>
        </Flex >
    )
};

export default withUrqlClient(createUrqlClient)(NavBar);