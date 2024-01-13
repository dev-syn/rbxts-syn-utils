-- Compiled with roblox-ts v2.2.0
--[[
	*
	 * The PromptMap module is intended for use with roblox-ts and not within Studio natively.
	 * It will give you CustomPrompt 
	
]]
--* If you wish to use Prompt 
local ENABLED = false
local Players = game:GetService("Players")
local player = Players.LocalPlayer
--* The path to the ScreenGui containing the PromptSchematics. 
local PROMPT_SCHEMATICS = player:WaitForChild("PlayerGui"):WaitForChild("PromptSchematics")
if not PROMPT_SCHEMATICS:IsA("ScreenGui") then
	error("PromptSchematics must be a ScreenGui.")
end
--[[
	*
	 * This is where the magic happens. You will want to put the name of your Prompt, and you can optionally
	 * provide the type if you are using TypeScript which will allow for full autocompletion. See ./promptExample.ts
	
]]
local PromptMap = {
	Prompt_Example = PROMPT_SCHEMATICS:FindFirstChild("Prompt_Example"),
}
return nil
