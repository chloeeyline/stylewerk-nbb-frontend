fetch(
    "https://ga6rnklx254dgtj2teg33uxwra0jpdlj.lambda-url.eu-north-1.on.aws/Language/Update",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI2YTE0M2Y1Mi03MTE3LTRlZWYtOWFmMy0wNDllYTgxODJmNjkiLCJleHAiOjE3Mjg2NTg4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA1MCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA1MCJ9.1zBUEdT4CDZYqcH1wyYFsvH-3sndijDarX2JO6lDKw0",
      },
      body: JSON.stringify({
        code: "de",
        name: "Deutsch",
        data: JSON.stringify({
          nav: {
            user: "Benutzer",
            admin: "Admin",
            login: "Anmeldung",
            entries: "Einträge",
            homepage: "Startseite",
            templates: "Vorlagen",
            registration: "Registrierung",
            resetPassword: "Passwort zurücksetzen",
          },
          list: {
            filter: "Filtern",
            refresh: "Aktualisieren",
            hideList: "Liste verstecken",
            showList: "Liste anzeigen",
            filtering: "Filter",
            hideFilters: "Filter verstecken",
            showFilters: "Filter anzeigen",
            generalFolder: "Allgemein",
            noEntrySelected:
              "Wählen Sie einen Eintrag aus um diesen zu betrachten",
            noTemplateSelected:
              "Wählen Sie eine Vorlage aus um diese zu betrachten",
            dragFolderModeActive: "Ordnerreihenfolge verändern",
            dragFolderModeDeactive: "Ordnerreihenfolge speichern",
          },
          userStates: {
            guest: "Gast",
            loggedIn: "Angemeldet",
            loggingIn: "Anmelden",
            loggingOut: "Abmelden",
            failed: "Benutzer anmeldung fehlgeschlagen",
            notLoggedIn: "Benutzer nicht angemeldet",
          },
          userDataStates: {
            loading: "Benutzerdaten werden geladen...",
            empty: "Benutzerdaten ungeladen",
            loaded: "Benutzerdaten geladen",
            error: "Fehler beim Laden der Benutzerdaten!",
          },
          common: {
            back: "Zurück",
            copy: "Kopieren",
            edit: "Bearbeiten",
            name: "Name",
            save: "Speichern",
            close: "Schließen",
            error: "Fehler...",
            cancel: "Abbrechen",
            delete: "Löschen",
            logout: "Abmelden",
            loading: "Laden...",
            isAdmin: "ist Administrator",
  
            clearOtherSessions: "Andere Sitzungen entfernen",
            clearingOtherSessions: "Andere Sitzungen werden entfernt!",
            otherSessionsCleared: "Andere Sitzungen wurden entfernt!",
  
            user_one: "Benutzer",
            email_one: "E-Mail",
            entry_one: "Eintrag",
            user_zero: "Benutzer",
            email_zero: "E-Mails",
            entry_zero: "Einträge",
            user_other: "Benutzer",
            description: "Beschreibung",
            email_other: "E-Mails",
            entry_other: "Einträge",
            saveAndClose: "Speichern und Schließen",
            template_one: "Vorlage",
            template_zero: "Vorlagen",
            template_other: "Vorlagen",
          },
          verify: {
            mailOk: "E-Mail bestätigt! Du kannst dich jetzt anmelden!",
            mailError: "E-Mail-Bestätigung fehlgeschlagen: {{error}}",
            mailNothing: "Kein Token zur Bestätigung gefunden...",
            mailInProgress: "E-Mail bestätigen...",
          },
          errorCodes: {
            Success: "Operation erfolgreich.",
            UnToLong:
              "Der Benutzername ist zu lang. Er darf maximal 100 Zeichen lang sein.",
            UnToShort:
              "Der Benutzername ist zu kurz. Er muss mindestens 3 Zeichen lang sein.",
            PwTooShort:
              "Das Passwort ist zu kurz. Es muss mindestens 10 Zeichen lang sein.",
            NoDataFound: "Keine Daten gefunden.",
            NoUserFound: "Kein Benutzer gefunden.",
            EmailInvalid: "Die E-Mail-Adresse ist ungültig.",
            GeneralError: "Ein Fehler ist aufgetreten.",
            MissingRight: "Sie haben nicht die erforderlichen Berechtigungen.",
            DataIsInvalid: "Die angegebenen Daten sind ungültig.",
            PwHasNoNumber:
              "Das Passwort muss mindestens eine Zahl (0-9) enthalten.",
            PasswordInvalid:
              "Das Passwort ist ungültig. es muss mindestens 10 Zeichen lang sein, und es müssen Buchstaben (a-z, A-Z), mindestens eine Ziffern (0-9) und mindestens eins der folgenden Zeichen ! # $ % & * + - . ? @ _ | enthalten.",
            PwHasWhitespace: "Das Passwort darf keine Leerzeichen enthalten.",
            UserMustBeAdmin: "Der Benutzer muss Administrator sein.",
            UsernameInvalid:
              "Der Benutzername ist ungültig. Er darf nur Buchstaben (a-z, A-Z), Ziffern (0-9) und die Zeichen & + * - . _ | enthalten.",
            WrongStatusCode: "Falscher Statuscode.",
            NameMustBeUnique: "Der Name muss eindeutig sein.",
            PendingChangeOpen: "Es gibt eine offene Änderung.",
            SuccessReturnData: "Operation erfolgreich, Daten zurückgegeben.",
            YouDontOwnTheData: "Diese Daten gehören Ihnen nicht.",
            EmailAlreadyExists: "Die E-Mail-Adresse existiert bereits.",
            EmailIsNotVerified: "Die E-Mail-Adresse ist nicht verifiziert.",
            PwUsesInvalidChars:
              "Das Passwort enthält ungültige Zeichen. Erlaubt sind nur Buchstaben (a-z, A-Z), Ziffern (0-9), Leerzeichen und die Zeichen ! # $ % & * + - . ? @ _ |.",
            StatusTokenExpired: "Der Status-Token ist abgelaufen.",
            UnUsesInvalidChars:
              "Der Benutzername enthält ungültige Zeichen. Erlaubt sind nur Buchstaben (a-z, A-Z), Ziffern (0-9) und die Zeichen & + * - . _ |.",
            PwHasNoSpecialChars:
              "Das Passwort muss mindestens eines der folgenden Sonderzeichen enthalten: ! # $ % & * + - . ? @ _ |.",
            RefreshTokenExpired: "Der Refresh-Token ist abgelaufen.",
            StatusTokenNotFound: "Status-Token wurde nicht gefunden.",
            TemplateDoesntMatch:
              "Die Vorlagen stimmt nicht überein mit dem Original.",
            EmailChangeCodeWrong: "Der E-Mail-Änderungscode ist falsch.",
            RefreshTokenNotFound: "Der Refresh-Token wurde nicht gefunden.",
            CantShareWithYourself: "Sie können nicht mit sich selbst teilen.",
            UsernameAlreadyExists: "Der Benutzername ist bereits vergeben.",
            PwHasNoLowercaseLetter:
              "Das Passwort muss mindestens einen Kleinbuchstaben (a-z) enthalten.",
            PwHasNoUppercaseLetter:
              "Das Passwort muss mindestens einen Großbuchstaben (A-Z) enthalten.",
            PasswordResetWasRequested:
              "Eine Passwortzurücksetzung wurde bereits angefordert.",
            StatusTokenAlreadyRequested:
              "Der Status-Token wurde bereits angefordert.",
          },
          userGenders: {
            NotSpecified: "Nicht spezifiziert",
            Female: "Weiblich",
            Male: "Männlich",
            NonBinary: "Nicht binär",
          },
          formNames: {
            general: "Formular",
            login: "Anmeldung",
            registration: "Registrierung",
            updateEmail: "E-Mail aktualisieren",
            updateUserData: "Benutzerdaten aktualisieren",
            requestPasswordReset: "Passwort-zurücksetzen anfordern",
            passwordReset: "Passwort zurücksetzen",
          },
          formErrors: {
            general: "Fehler beim validieren der Formularfelder, bitte prüfen!",
            pleaseEnter: "Bitte {{what}} eingeben!",
            pleaseSelect: "Bitte {{what}} auswählen!",
            passwordsNoMatch: "Kennwörter sind nicht gleich!",
          },
          formFields: {
            tags: "Tags",
            email: "E-Mail",
            owned: "Eigene",
            gender: "Geschlecht",
            public: "Öffentlich",
            shared: "Gemeinsam",
            birthday: "Geburtstag",
            lastName: "Nachname",
            password: "Kennwort",
            username: "Benutzername",
            firstName: "Vorname",
            directUser: "Genauer Benutzername",
            rememberMe: "Angemeldet bleiben",
            description: "Beschreibung",
            templateName: "Vorlagenname",
            repeatPassword: "Kennwort wiederholen",
            visibilityGroup: "Sichtbarkeit",
          },
          formSubmit: {
            general: "Absenden",
            login: "Anmelden",
            registration: "Registrieren",
            updateEmail: "E-Mail aktualisieren",
            updateUserData: "Daten aktualisieren",
            requestPasswordReset: "Rücksetzen ihres Passworts anfordern",
            passwordReset: "Passwort zurücksetzen",
          },
          formMessages: {
            requestPasswordReset: "Rücksetzen ihres Passworts angefordert, bitte checken Sie ihre E-Mails!",
          }
        }),
      }),
    },
  );
  