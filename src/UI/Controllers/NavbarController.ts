/**
 * **NavBarController**
 * 
 * This is a UI Controller designed to control a Navigation Bar.
 */
class NavBarController<
    /** The Frame or ScrollingFrame that is the Navbar. */
    T extends Frame | ScrollingFrame,
    /** A map that stores the Navigation button to a Navigation Frame. */
    NavigationFrames extends Map<TextButton,Frame | ScrollingFrame>>
{
    /**
     * The NavBar Instance that contains the navigation buttons normally with a UIListLayout but not required.
     * @typeParam T - The Frame | ScrollingFrame that contains the nav buttons
     */
    NavBar: T

    /**
     * The current frame that was navigated to.
     */
    CurrentFrame?: Frame | ScrollingFrame;
    
    /**
     * This is a dictionary structure that contains the navigation buttons to their respective Frame Instances.
     */
    NavigationableFrames: NavigationFrames;

    /**
     * This property is responsible for maintaining a consistent button count of 1 as the MainBtn
     * will not be affected by {@link NavBarController.hideButtons}. Warning: By assigning this property you will not be able to Hide that specific button.
     */
    MainBtn?: TextButton;
    
    /** Creates a new NavbarController. */
    constructor(navBar: T,navigationableFrames: NavigationFrames,mainBtn?: TextButton) {
        this.NavBar = navBar;
        this.NavigationableFrames = navigationableFrames;
        this.MainBtn = mainBtn;
    }

    /**
     * Shows the given buttons inside the NavBar and hides all the others, excluding the MainBtn if assigned.
     * @param uiObjects - A dictionary which keys are the UI Objects and the value is true, the UI Objects are then shown.
     */
    showButtons(uiObjects: Map<GuiObject,true>) {
        for (const child of this.NavBar.GetChildren()) {
            if (child.IsA("GuiObject")) {
                const uiObject = child as GuiObject;
                uiObject.Visible = uiObject !== this.MainBtn ? uiObjects.has(uiObject) : true;
            }
        }
    }

    /**
     * Hides the given buttons inside the Navbar.
     * 
     * NOTICE: If the NavbarController has a MainBtn, the MainBtn cannot be hidden.
     * @param uiObjects - A dictionary which keys are the UI Objects and the value is true, the UI Objects are then hidden.
     */
    hideButtons(uiObjects: Map<GuiObject,true>) {
        for (const child of this.NavBar.GetChildren()) {
            if (child.IsA("GuiObject")) {
                const uiObject = child as GuiObject;
                if (uiObjects.has(uiObject)) {
                    // If a MainBtn exist, check if the ui is the main button and prevent visibility change
                    if (this.MainBtn && uiObject === this.MainBtn) continue;
                    uiObject.Visible = false;
                }
            }
        }
    }

    /**
     * Hides all the buttons inside the Navbar
     * 
     * NOTICE: If the NavbarController has a MainBtn, the MainBtn cannot be hidden.
     */
    hideAllButtons() {
        for (const child of this.NavBar.GetChildren()) {
            if (child.IsA("GuiObject")) {
                const uiObject = child as GuiObject;
                if (this.MainBtn && this.MainBtn === uiObject) continue;
                uiObject.Visible = false;
            }
        }
    }

    /**
     * Assigns a navBtn to a Frame | ScrollingFrame instance that when you press the navBtn it will show it's associated frame.
     * @param navBtn The nav button to assign
     * @param frame The frame instance that belongs to the navBtn
     */
    assignFrame(navBtn: TextButton,frame: Frame | ScrollingFrame) {
        this.NavigationableFrames.set(navBtn,frame);
        navBtn.MouseButton1Click.Connect(() => {
            if (this.CurrentFrame && this.CurrentFrame !== frame) {
                this.CurrentFrame.Visible = false;
            }
            frame.Visible = true;
            this.CurrentFrame = frame;
        });
    }

};

export = NavBarController;