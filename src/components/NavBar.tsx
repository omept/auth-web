import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export type NavBarProps = {}
export const NavBar: React.FC<NavBarProps> = ({ }) => {

    const [{ fetching: logoutFetching }, logoutUser] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({ pause: isServer() });

    const logout = () => {
        logoutUser();
    }

    let body = null;

    if (fetching) {
        console.log("fetching me query");

    } else if (!data?.me) {
        console.log(data);
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link >Register</Link>
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
        <Flex bg="tan" p={4}>
            <Box ml="auto">
                {body}
            </Box>
        </Flex >
    )
};

export default NavBar;