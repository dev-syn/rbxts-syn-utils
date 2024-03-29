-- Compiled with roblox-ts v2.2.0
--[[
	*
	 * **NavBarController**
	 * 
	 * This is a UI Controller designed to control a Navigation Bar.
	 
]]
local NavBarController
do
	NavBarController = setmetatable({}, {
		__tostring = function()
			return "NavBarController"
		end,
	})
	NavBarController.__index = NavBarController
	function NavBarController.new(...)
		local self = setmetatable({}, NavBarController)
		return self:constructor(...) or self
	end
	function NavBarController:constructor(navBar, navigationableFrames, mainBtn)
		self.NavBar = navBar
		self.NavigationableFrames = navigationableFrames
		self.MainBtn = mainBtn
	end
	function NavBarController:showButtons(uiObjects)
		for _, child in self.NavBar:GetChildren() do
			if child:IsA("TextButton") or child:IsA("ImageButton") then
				local uiObject = child
				uiObject.Visible = if uiObject ~= self.MainBtn then table.find(uiObjects, uiObject) ~= nil else true
			end
		end
	end
	function NavBarController:hideButtons(uiObjects)
		for _, child in self.NavBar:GetChildren() do
			if child:IsA("TextButton") or child:IsA("ImageButton") then
				local uiObject = child
				if table.find(uiObjects, uiObject) ~= nil then
					-- If a MainBtn exist, check if the ui is the main button and prevent visibility change
					if self.MainBtn and uiObject == self.MainBtn then
						continue
					end
					uiObject.Visible = false
				end
			end
		end
	end
	function NavBarController:hideAllButtons()
		for _, child in self.NavBar:GetChildren() do
			if child:IsA("GuiObject") then
				local uiObject = child
				if self.MainBtn and self.MainBtn == uiObject then
					continue
				end
				uiObject.Visible = false
			end
		end
	end
	function NavBarController:assignFrame(navBtn, frame)
		local _navigationableFrames = self.NavigationableFrames
		local _navBtn = navBtn
		local _frame = frame
		_navigationableFrames[_navBtn] = _frame
		navBtn.MouseButton1Click:Connect(function()
			if self.CurrentFrame and self.CurrentFrame ~= frame then
				self.CurrentFrame.Visible = false
			end
			frame.Visible = true
			self.CurrentFrame = frame
		end)
	end
	function NavBarController:showFrame(navBtn)
		local _navigationableFrames = self.NavigationableFrames
		local _navBtn = navBtn
		local navFrame = _navigationableFrames[_navBtn]
		if not navFrame then
			return nil
		end
		if self.CurrentFrame then
			self.CurrentFrame.Visible = false
		end
		self.CurrentFrame = navFrame
		navFrame.Visible = true
	end
end
return NavBarController
