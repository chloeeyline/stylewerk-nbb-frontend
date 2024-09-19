export const enum Right {
    Restricted = 0,
    Access = 1,
    Create = 2,
    Edit = 4,
    Delete = 8,
    Admin = 16,

    DefaultUsage = Access | Create,
    ManipulateOthers = Edit | Delete,
    SuperAdmin = Admin | ManipulateOthers | DefaultUsage,
}
