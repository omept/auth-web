import React from 'react';
import { Box } from "@chakra-ui/core";

export type WrapperVariant = 'small' | 'regular';

export type WrapperProps = {
    variant?: WrapperVariant
}
export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
    return (
        <Box mt={8} mx="auto" maxW={variant === 'regular' ? "900px" : '500px'} width="100%"> {children}</Box>
    )
};

export default Wrapper;