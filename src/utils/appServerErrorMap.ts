import { FieldError } from "../generated/graphql";
import { __prod__ } from "./constants";

export const appServerError = (errors: FieldError[]): string => {
    return errors.find(o => o.field === 'server_error')?.message;
}