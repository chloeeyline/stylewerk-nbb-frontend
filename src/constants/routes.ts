import { RouteParams } from "#/route-params";

export const User = {
    Index: "/user",
    ChangeEmail: "/user/change-email",
    ResetPassword: "/user/reset-password",
} as const;

export const Templates = {
    List: "/templates",
    View: `/templates/${RouteParams.TemplateId}`,
    Edit: `/templates/${RouteParams.TemplateId}/edit`,
} as const;

export const Entries = {
    List: "/entries",
    View: `/entries/${RouteParams.EntryId}`,
    Edit: `/entries/${RouteParams.EntryId}/edit`,
} as const;

export const Admin = {
    Index: "/admin",
    Users: {
        List: "/admin/users",
        Manage: `/admin/users/${RouteParams.UserId}`,
    },
    Translations: {
        List: "/admin/translations",
        Manage: `/admin/translations/${RouteParams.TranslationId}`,
    },
    Themes: {
        List: "/admin/themes",
        Manage: `/admin/themes/${RouteParams.ThemeId}`,
    },
} as const;

export default {
    Home: "/",
    Login: "/login",
    Registration: "/registration",
    User,
    Templates,
    Entries,
    Admin,
} as const;
