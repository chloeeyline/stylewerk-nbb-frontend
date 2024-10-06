export const Auth = {
    UpdateEmail: "/Auth/UpdateEmail",
    VerifyUpdatedEmail: "/Auth/VerifyUpdatedEmail",
    RequestPasswordReset: "/Auth/RequestPasswordReset",
    ResetPassword: "/Auth/ResetPassword",
    Login: "/Auth/Login",
    RefreshToken: "/Auth/RefreshToken",
    Registration: "/Auth/Registration",
    VerifyEmail: "/Auth/VerifyEmail",
    RemoveSessions: "/Auth/RemoveSessions",
    Logout: "/Auth/Logout",
    GetUserData: "/Auth/GetUserData",
    UpdateUserData: "/Auth/UpdateUserData",
    ValidatePassword: "/Auth/ValidatePassword",
    ValidateEmail: "/Auth/ValidateEmail",
    ValidateUsername: "/Auth/ValidateUsername",
} as const;

export const ColorTheme = {
    Index: "/ColorTheme",
    List: "/ColorTheme/List",
    Details: "/ColorTheme/Details",
    Remove: "/ColorTheme/Remove",
    Update: "/ColorTheme/Update",
} as const;

export const Entry = {
    List: "/Entry/List",
    Details: "/Entry/Details",
    GetFromTemplate: "/Entry/GetFromTemplate",
    Remove: "/Entry/Remove",
    Update: "/Entry/Update",
    Folder: {
        List: "/Entry/Folder/List",
        Details: "/Entry/Folder/Details",
        Update: "/Entry/Folder/Update",
        Remove: "/Entry/Folder/Remove",
        Reorder: "/Entry/Folder/Remove",
    },
} as const;

export const Language = {
    Index: "/Language",
    List: "/Language/List",
    Details: "/Language/Details",
    Remove: "/Language/Remove",
    Update: "/Language/Update",
} as const;

export const Share = {
    List: "/Share/List",
    Update: "/Share/Update",
    Remove: "/Share/Remove",
    Group: {
        List: "/Share/Group/List",
        Details: "/Share/Group/Details",
        GetSharedToGroup: "/Share/Group/GetSharedToGroup",
        Update: "/Share/Group/Update",
        Remove: "/Share/Group/Remove",
        UpdateUser: "/Share/Group/UpdateUser",
        RemoveUser: "/Share/Group/RemoveUser",
    },
} as const;

export const Template = {
    List: "/Template/List",
    Details: "/Template/Details",
    Update: "/Template/Update",
    Remove: "/Template/Remove",
    Copy: "/Template/Copy",
} as const;

export const Editor = {
    GetEntry: "/Editor/GetEntry",
    GetTemplate: "/Editor/GetTemplate",
    UpdateEntry: "/Editor/UpdateEntry",
    UpdateTemplate: "/Editor/UpdateTemplate",
} as const;

export default { Auth, ColorTheme, Entry, Language, Share, Template, Editor } as const;
