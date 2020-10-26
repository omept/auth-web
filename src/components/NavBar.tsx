import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

export type NavBarProps = {}
export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ data, fetching }] = useMeQuery({ requestPolicy: 'network-only' });

    let body = null;

    if (fetching) {

    } else if (!data?.me) {
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
                <Button variant="link"> logout </Button>
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