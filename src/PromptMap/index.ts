import type { PromptExample } from './promptExample';

/**
 * The PromptMap module is intended for use with roblox-ts and not within Studio natively.
 * It will give you CustomPrompt 
*/
/** If you wish to use Prompt */
const ENABLED: boolean = false;

const Players: Players = game.GetService("Players");
const player: Player = Players.LocalPlayer;

/** The path to the ScreenGui containing the PromptSchematics. */
const PROMPT_SCHEMATICS: Instance = player.WaitForChild("PlayerGui").WaitForChild("PromptSchematics");
if (!PROMPT_SCHEMATICS.IsA("ScreenGui")) error("PromptSchematics must be a ScreenGui.")

/**
 * This is where the magic happens. You will want to put the name of your Prompt, and you can optionally
 * provide the type if you are using TypeScript which will allow for full autocompletion. See ./promptExample.ts
*/

const PromptMap = {
    Prompt_Example: PROMPT_SCHEMATICS.FindFirstChild("Prompt_Example") as PromptExample
};