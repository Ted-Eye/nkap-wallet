import {z} from 'zod';
import {DEFAULT_SETTINGS, APP_MODES, CURRENCIES, LANGUAGES, THEMES} from '../lib/konstants/Defaults';

const currencies = CURRENCIES.map((c)=>c.value);
const languages = LANGUAGES.map((l)=>l.value)
const themes = THEMES.map((th)=>th.value)
const modes = APP_MODES.map((m)=>m.value)
export const settingsSchema = z.object({
    currency: z.enum([...currencies]),
    language: z.enum([...languages]),
    theme: z.enum([...themes]),
    mode: z.enum([...modes])
})
export const defaultSettings = {
    currency: CURRENCIES[0].value,
    language: LANGUAGES[0].value,
    theme: THEMES[0].value,
    mode: APP_MODES[0].value
}