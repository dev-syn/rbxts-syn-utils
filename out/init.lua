-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
local NavBarController = TS.import(script, script, "UI", "Controllers", "NavbarController")
for _k, _v in TS.import(script, script, "PromptMap") or {} do
	exports[_k] = _v
end
exports.NavBarController = NavBarController
return exports
