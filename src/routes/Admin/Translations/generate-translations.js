(async () => {
    const token = "";

    if (token === "") {
        alert("no token given!");
        return;
    }

    const translations = {
        nav: {
            user: ["Benutzer", "User"],
            admin: ["Admin", "Admin"],
            adminTranslations: ["Übersetzungen", "Translations"],
            adminTranslationsManage: ["Übersetzung bearbeiten", "Edit translation"],
            adminThemes: ["Farbschemen", "Color schemes"],
            adminThemesManage: ["Farbeschema bearbeiten", "Edit color scheme"],
            adminUsers: ["Benutzer", "Users"],
            login: ["Anmeldung", "Login"],
            entries: ["Einträge", "Entries"],
            homepage: ["Startseite", "Homepage"],
            templates: ["Vorlagen", "Templates"],
            registration: ["Registrierung", "Registration"],
            resetPassword: ["Passwort zurücksetzen", "Reset password"],
        },
        adminTranslations: {
            labelCode: ["Sprachcode", "Language-code"],
            labelName: ["Sprachname", "Language-name"],
            labelUploadJson: ["JSON-Datei hochladen", "Upload JSON-file"],
            saveLanguage: ["Sprache speichern", "Save language"],
            deleteLanguage: ["Sprache löschen", "Delete language"],
            labelNewCode: ["Neuer code", "New code"],
            labelFromCode: ["Von code", "From code"],
            fromCodeDefault: ["Standard (de)", "Default (de)"],
            addNewLanguage: ["Neue Sprache hinzufügen", "Add new language"],
        },
        adminThemes: {
            labelId: ["Farbschema-id", "Color scheme id"],
            labelName: ["Farbschema-name", "Color scheme name"],
            labelBase: ["Basis des Farbschemas", "Base of the color scheme"],
            saveTheme: ["Farbschema speichern", "Save color scheme"],
            deleteTheme: ["Farbschema löschen", "Delete color scheme"],
            labelNewName: ["Neues Farbschema", "New color scheme"],
            labelFromId: ["Ausgangs-Farbschema", "Base color scheme"],
            addNewTheme: ["Neues Farbschema hinzufügen", "Add new color scheme"],
        },
        list: {
            filter: ["Filter", "Filter"],
            refresh: ["Aktualisieren", "Refresh"],
            hideList: ["Liste verstecken", "Hide list"],
            showList: ["Liste anzeigen", "Show list"],
            filtering: ["Filtern", "Filter"],
            hideFilters: ["Filter verstecken", "Hide filter"],
            showFilters: ["Filter anzeigen", "Show filters"],
            generalFolder: ["Allgemein", "General"],
            noEntrySelected: [
                "Wählen Sie einen Eintrag aus um diesen zu betrachten",
                "Select an entry to view it",
            ],
            noTemplateSelected: [
                "Wählen Sie eine Vorlage aus um diese zu betrachten",
                "Select a template to view it",
            ],
            dragFolderModeActive: ["Ordnerreihenfolge verändern", "Change folder order"],
            dragFolderModeDeactive: ["Ordnerreihenfolge speichern", "Save folder order"],
        },
        userStates: {
            guest: ["Gast", "Guest"],
            loggedIn: ["Angemeldet", "Logged in"],
            loggingIn: ["Anmelden", "Log in"],
            loggingOut: ["Abmelden", "Log out"],
            failed: ["Benutzer anmeldung fehlgeschlagen", "User logon failed"],
            notLoggedIn: ["Benutzer nicht angemeldet", "User not logged in"],
        },
        userDataStates: {
            loading: ["Benutzerdaten werden geladen...", "User data is being loaded..."],
            empty: ["Benutzerdaten ungeladen", "User data unloaded"],
            loaded: ["Benutzerdaten geladen", "User data loaded"],
            error: ["Fehler beim Laden der Benutzerdaten!", "Error loading the user data!"],
        },
        editor: {
            addNewRow: ["Neue Zeile einfügen", "Add new row"]
        },
        common: {
            createNewTemplate: ["Neue Vorlage erstellen", "Create new template"],
            createNewEntryFromTemplate: ["Neuen Eintrag aus Vorlage erstellen", "Create new entry from template"],
            list: ["Liste", "list"],
            hideList: ["Liste verstecken", "Hide list"],
            showList: ["Liste anzeigen", "Show list"],
            filters: ["Filter", "Filters"],
            actions: ["Aktionen", "Actions"],
            editor: ["Editor", "editor"],
            back: ["Zurück", "Back"],
            copy: ["Kopieren", "Copy"],
            edit: ["Bearbeiten", "Edit"],
            name: ["Name", "Name"],
            save: ["Speichern", "Save"],
            close: ["Schließen", "Close"],
            error: ["Fehler...", "Error..."],
            cancel: ["Abbrechen", "Cancel"],
            delete: ["Löschen", "Delete"],
            logout: ["Abmelden", "Log out"],
            loading: ["Laden...", "Loading..."],
            isAdmin: ["ist Administrator", "is administrator"],
            clearOtherSessions: ["Andere Sitzungen entfernen", "Remove other sessions"],
            clearingOtherSessions: [
                "Andere Sitzungen werden entfernt!",
                "Other sessions will be removed!",
            ],
            otherSessionsCleared: [
                "Andere Sitzungen wurden entfernt!",
                "Other sessions have been removed!",
            ],
            invalidId: ["Ungültige ID", "Inavalid ID"],
            download: ["Herunterladen", "Download"],
            language_zero: ["Sprachen", "languages"],
            language_one: ["Sprache", "language"],
            language_other: ["Sprachen", "languages"],
            user_one: ["Benutzer", "User"],
            email_one: ["E-Mail", "Email"],
            entry_one: ["Eintrag", "Entry"],
            user_zero: ["Benutzer", "User"],
            email_zero: ["E-Mails", "Emails"],
            entry_zero: ["Einträge", "Entries"],
            user_other: ["Benutzer", "User"],
            description: ["Beschreibung", "Description"],
            email_other: ["E-Mails", "Emails"],
            entry_other: ["Einträge", "Entries"],
            saveAndClose: ["Speichern und Schließen", "Save and close"],
            template_one: ["Vorlage", "Template"],
            template_zero: ["Vorlagen", "Templates"],
            template_other: ["Vorlagen", "Templates"],
        },
        verify: {
            mailOk: [
                "E-Mail bestätigt! Du kannst dich jetzt anmelden!",
                "Email confirmed! You can log in now!",
            ],
            mailError: [
                "E-Mail-Bestätigung fehlgeschlagen: {{error}}",
                "Email confirmation failed: {{error}}",
            ],
            mailNothing: [
                "Kein Token zur Bestätigung gefunden...",
                "No token found for confirmation...",
            ],
            mailInProgress: ["E-Mail bestätigen...", "Confirm email..."],
        },
        errorCodes: {
            Success: ["Operation erfolgreich.", "Operation successful."],
            UnToLong: [
                "Der Benutzername ist zu lang. Er darf maximal 100 Zeichen lang sein.",
                "The user name is too long. It may be a maximum of 100 characters long.",
            ],
            UnToShort: [
                "Der Benutzername ist zu kurz. Er muss mindestens 3 Zeichen lang sein.",
                "The user name is too short. It must be at least 3 characters long.",
            ],
            PwTooShort: [
                "Das Passwort ist zu kurz. Es muss mindestens 10 Zeichen lang sein.",
                "The password is too short. It must be at least 10 characters long.",
            ],
            NoDataFound: ["Keine Daten gefunden.", "No data found."],
            NoUserFound: ["Kein Benutzer gefunden.", "No user found."],
            EmailInvalid: ["Die E-Mail-Adresse ist ungültig.", "The email address is invalid."],
            GeneralError: ["Ein Fehler ist aufgetreten.", "An error has occurred."],
            MissingRight: [
                "Sie haben nicht die erforderlichen Berechtigungen.",
                "You do not have the required authorizations.",
            ],
            DataIsInvalid: [
                "Die angegebenen Daten sind ungültig.",
                "The specified data is invalid.",
            ],
            PwHasNoNumber: [
                "Das Passwort muss mindestens eine Zahl (0-9) enthalten.",
                "The password must contain at least one number (0-9).",
            ],
            PasswordInvalid: [
                "Das Passwort ist ungültig. es muss mindestens 10 Zeichen lang sein, und es müssen Buchstaben (a-z, A-Z), mindestens eine Ziffern (0-9) und mindestens eins der folgenden Zeichen ! # $ % & * + - . ? @ _ | enthalten.",
                "The password is invalid. it must be at least 10 characters long and must contain letters (a-z, A-Z), at least one digit (0-9) and at least one of the following characters ! # $ % & * + - . ? @ _ | contain.",
            ],
            PwHasWhitespace: [
                "Das Passwort darf keine Leerzeichen enthalten.",
                "The password must not contain any spaces.",
            ],
            UserMustBeAdmin: [
                "Der Benutzer muss Administrator sein.",
                "The user must be an administrator.",
            ],
            UsernameInvalid: [
                "Der Benutzername ist ungültig. Er darf nur Buchstaben (a-z, A-Z), Ziffern (0-9) und die Zeichen & + * - . _ | enthalten.",
                "The user name is invalid. It may only contain letters (a-z, A-Z), numbers (0-9) and the characters & + * - . _ | characters.",
            ],
            WrongStatusCode: ["Falscher Statuscode.", "Incorrect status code."],
            NameMustBeUnique: ["Der Name muss eindeutig sein.", "The name must be unique."],
            PendingChangeOpen: ["Es gibt eine offene Änderung.", "There is a pending change."],
            SuccessReturnData: [
                "Operation erfolgreich, Daten zurückgegeben.",
                "Operation successful, data returned.",
            ],
            YouDontOwnTheData: [
                "Diese Daten gehören Ihnen nicht.",
                "This data does not belong to you.",
            ],
            EmailAlreadyExists: [
                "Die E-Mail-Adresse existiert bereits.",
                "The email address already exists.",
            ],
            EmailIsNotVerified: [
                "Die E-Mail-Adresse ist nicht verifiziert.",
                "The email address is not verified.",
            ],
            PwUsesInvalidChars: [
                "Das Passwort enthält ungültige Zeichen. Erlaubt sind nur Buchstaben (a-z, A-Z), Ziffern (0-9), Leerzeichen und die Zeichen ! # $ % & * + - . ? @ _ |.",
                "The password contains invalid characters. Only letters (a-z, A-Z), numbers (0-9), spaces and the characters ! # $ % & * + - . ? @ _ |.",
            ],
            StatusTokenExpired: [
                "Der Status-Token ist abgelaufen.",
                "The status token has expired.",
            ],
            UnUsesInvalidChars: [
                "Der Benutzername enthält ungültige Zeichen. Erlaubt sind nur Buchstaben (a-z, A-Z), Ziffern (0-9) und die Zeichen & + * - . _ |.",
                "The user name contains invalid characters. Only letters (a-z, A-Z), digits (0-9) and the characters & + * - . _ |.",
            ],
            PwHasNoSpecialChars: [
                "Das Passwort muss mindestens eines der folgenden Sonderzeichen enthalten: ! # $ % & * + - . ? @ _ |.",
                "The password must contain at least one of the following special characters: ! # $ % & * + - . ? @ _ |.",
            ],
            RefreshTokenExpired: [
                "Der Refresh-Token ist abgelaufen.",
                "The refresh token has expired.",
            ],
            StatusTokenNotFound: [
                "Status-Token wurde nicht gefunden.",
                "Status token was not found.",
            ],
            TemplateDoesntMatch: [
                "Die Vorlagen stimmt nicht überein mit dem Original.",
                "The template does not match the original.",
            ],
            EmailChangeCodeWrong: [
                "Der E-Mail-Änderungscode ist falsch.",
                "The email change code is incorrect.",
            ],
            RefreshTokenNotFound: [
                "Der Refresh-Token wurde nicht gefunden.",
                "The refresh token was not found.",
            ],
            CantShareWithYourself: [
                "Sie können nicht mit sich selbst teilen.",
                "You cannot share with yourself.",
            ],
            UsernameAlreadyExists: [
                "Der Benutzername ist bereits vergeben.",
                "The username is already taken.",
            ],
            PwHasNoLowercaseLetter: [
                "Das Passwort muss mindestens einen Kleinbuchstaben (a-z) enthalten.",
                "The password must contain at least one lowercase letter (a-z).",
            ],
            PwHasNoUppercaseLetter: [
                "Das Passwort muss mindestens einen Großbuchstaben (A-Z) enthalten.",
                "The password must contain at least one uppercase letter (A-Z).",
            ],
            PasswordResetWasRequested: [
                "Eine Passwortzurücksetzung wurde bereits angefordert.",
                "A password reset has already been requested.",
            ],
            StatusTokenAlreadyRequested: [
                "Der Status-Token wurde bereits angefordert.",
                "The status token has already been requested.",
            ],
        },
        userGenders: {
            NotSpecified: ["Nicht spezifiziert", "Not specified"],
            Female: ["Weiblich", "Female"],
            Male: ["Männlich", "Male"],
            NonBinary: ["Nicht binär", "Non-binary"],
        },
        formNames: {
            general: ["Formular", "Form"],
            login: ["Anmeldung", "Login"],
            registration: ["Registrierung", "Registration"],
            updateEmail: ["E-Mail aktualisieren", "Update email"],
            updateUserData: ["Benutzerdaten aktualisieren", "Update user data"],
            requestPasswordReset: ["Passwort-zurücksetzen anfordern", "Request password reset"],
            passwordReset: ["Passwort zurücksetzen", "Reset password"],
        },
        formErrors: {
            general: [
                "Fehler beim validieren der Formularfelder, bitte prüfen!",
                "Error validating the form fields, please check!",
            ],
            pleaseEnter: ["Bitte {{what}} eingeben!", "Please enter {{what}}!"],
            pleaseSelect: ["Bitte {{what}} auswählen!", "Please select {{what}}!"],
            passwordsNoMatch: ["Kennwörter sind nicht gleich!", "Passwords are not the same!"],
        },
        formFields: {
            tags: ["Tags", "Tags"],
            email: ["E-Mail", "Email"],
            owned: ["Eigene", "Owned"],
            gender: ["Geschlecht", "Gender"],
            public: ["Öffentlich", "Public"],
            shared: ["Gemeinsam", "Shared"],
            birthday: ["Geburtstag", "Birthday"],
            lastName: ["Nachname", "Last name"],
            password: ["Kennwort", "Password"],
            username: ["Benutzername", "User name"],
            firstName: ["Vorname", "First name"],
            directUser: ["Genauer Benutzername", "Exact user name"],
            rememberMe: ["Angemeldet bleiben", "Stay logged in"],
            description: ["Beschreibung", "Description"],
            templateName: ["Vorlagenname", "Template name"],
            repeatPassword: ["Kennwort wiederholen", "Repeat password"],
            visibilityGroup: ["Sichtbarkeit", "Visibility"],
        },
        formSubmit: {
            general: ["Absenden", "Submit"],
            login: ["Anmelden", "Login"],
            registration: ["Registrieren", "Register"],
            updateEmail: ["E-Mail aktualisieren", "Update email"],
            updateUserData: ["Daten aktualisieren", "Update data"],
            requestPasswordReset: [
                "Rücksetzen ihres Passworts anfordern",
                "Request a reset of your password",
            ],
            passwordReset: ["Passwort zurücksetzen", "Reset password"],
        },
        formMessages: {
            requestPasswordReset: [
                "Rücksetzen ihres Passworts angefordert, bitte checken Sie ihre E-Mails!",
                "Password reset requested, please check your emails!",
            ],
        },
    };

    const de = {};
    const en = {};

    for (const [ns, kv] of Object.entries(translations)) {
        de[ns] = {};
        en[ns] = {};

        for (const [k, v] of Object.entries(kv)) {
            de[ns][k] = v[0];
            en[ns][k] = v[1];
        }
    }

    await fetch(
        "https://ga6rnklx254dgtj2teg33uxwra0jpdlj.lambda-url.eu-north-1.on.aws/Language/Update",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                code: "de",
                name: "Deutsch",
                data: JSON.stringify(de),
            }),
        },
    );
    await fetch(
        "https://ga6rnklx254dgtj2teg33uxwra0jpdlj.lambda-url.eu-north-1.on.aws/Language/Update",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                code: "en",
                name: "English",
                data: JSON.stringify(en),
            }),
        },
    );

    alert("Languages updates!");
    // window.location.reload();
})();
