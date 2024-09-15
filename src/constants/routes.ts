import { RouteParams } from "#/route-params";

export const enum Routes {
    Home = "/",
    Login = "/login",
    Registration = "/registration",
    User = "/user",
    UserChangeEmail = "/user/change-email",
    UserResetPassword = "/user/reset-password",
    TemplatesList = "/templates",
    TemplateView = `/templates/${RouteParams.TemplateId}`,
    TemplateEdit = `/templates/${RouteParams.TemplateId}/edit`,
    EntriesList = "/entries",
    EntryView = `/entries/${RouteParams.EntryId}`,
    EntryEdit = `/entries/${RouteParams.EntryId}/edit`,
    Admin = "/admin",
    AdminUsersList = "/admin/users",
    AdminUserManage = `/admin/users/${RouteParams.UserId}`,
    AdminTranslationsList = "/admin/translations",
    AdminTranslationManage = `/admin/translations/${RouteParams.TranslationId}`,
    AdminThemesList = "/admin/themes",
    AdminThemeManage = `/admin/themes/${RouteParams.ThemeId}`,
}
