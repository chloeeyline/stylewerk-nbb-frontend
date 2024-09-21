export type Rights = "Restricted" | "Access" | "Create" | "Edit" | "Delete" | "Admin";

export type RightsMap = Map<Rights | string, boolean>;
