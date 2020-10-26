import { CombinedError } from "urql";
import { __prod__ } from "./constants";

export const serverError = ({ graphQLErrors }: CombinedError) => {

    graphQLErrors.forEach(({ message }) => {
        if (!__prod__) {
            console.log(message)
        }
    });

    return "Error occured while processing your request";

}