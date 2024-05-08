import { createThemeAction } from "remix-themes"

import { themeSessionResolver } from "~/utils/themes.server"

export const action = createThemeAction(themeSessionResolver)
