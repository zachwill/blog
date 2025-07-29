/**
 * =================================================================================================
 * WEB AWESOME - TYPE DEFINITIONS FOR TYPESCRIPT & REACT/JSX
 * =================================================================================================
 *
 * This file provides type definitions for the WebAwesome component library.
 * It includes both framework-agnostic global definitions and JSX-specific
 * typings for use in React/TSX projects.
 *
 * To use, include this file in your project's `tsconfig.json`.
 *
 * @see https://github.com/cursor-team/web-awesome
 */

// This export statement is required to make this file a module
export { };

// A generic type for WebAwesome custom events, which place their data in `event.detail`.
type WaCustomEvent<T = any> = CustomEvent<T>;

// A base interface for form control components to share common properties and methods.
interface WaFormControl extends HTMLElement {
    name: string;
    value: string | number | string[];
    disabled: boolean;
    required: boolean;
    readonly form: HTMLFormElement | null;
    setCustomValidity(error: string): void;
    checkValidity(): boolean;
    reportValidity(): boolean;
}

// Global augmentation to make the custom elements known to TypeScript and other frameworks
// Global augmentation to make the custom elements known to TypeScript
declare global {
    // --- UTILITY FUNCTIONS --- //

    /**
     * A utility that returns a promise that resolves when all of the given WebAwesome components have been defined.
     */
    function allDefined(tagNames: (keyof HTMLElementTagNameMap)[]): Promise<void[]>;

    // --- COMPONENT INTERFACES --- //

    /**
     * **wa-animation**
     *
     * A utility for applying declarative animations.
     *
     * @property name - The name of a preset animation to play.
     * @property play - Toggles the animation's paused state.
     * @property duration - The animation's duration in milliseconds.
     * @property iterations - The number of iterations, or `Infinity` for endless.
     * @property keyframes - A custom keyframe array to use for the animation.
     */
    interface WaAnimation extends HTMLElement {
        name?: 'bounce' | 'jiggle' | 'pulse' | 'shake' | 'spin' | string;
        play?: boolean;
        duration?: number;
        iterations?: number;
        keyframes?: Keyframe[];
    }

    /**
     * **wa-avatar**
     *
     * Represents a user or entity. Displays an image, initials, or a fallback icon.
     *
     * @property image - The URL of the image to display.
     * @property label - A required, accessible label for the avatar.
     * @property initials - Initials to display if the image fails to load.
     * @property shape - The shape of the avatar.
     *
     * @slot icon - A fallback icon to display when no image or initials are present.
     */
    interface WaAvatar extends HTMLElement {
        image?: string;
        label: string;
        initials?: string;
        shape?: 'square' | 'rounded' | 'circle';
    }

    /**
     * **wa-badge**
     *
     * A small status indicator, often used for counts or labels.
     *
     * @property variant - The badge's color scheme.
     * @property appearance - The badge's visual style.
     * @property pill - Renders the badge with fully rounded corners.
     * @property attention - Applies an attention-seeking animation.
     */
    interface WaBadge extends HTMLElement {
        variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
        appearance?: 'filled' | 'outlined';
        pill?: boolean;
        attention?: 'bounce' | 'pulse';
    }

    /**
     * **wa-breadcrumb**
     *
     * A container for a breadcrumb navigation trail.
     *
     * @slot - Contains one or more `<wa-breadcrumb-item>` elements.
     */
    interface WaBreadcrumb extends HTMLElement { }

    /**
     * **wa-breadcrumb-item**
     *
     * An item within a breadcrumb trail.
     *
     * @property href - An optional link for the breadcrumb item.
     *
     * @slot - The text content of the breadcrumb item.
     * @slot separator - An optional custom separator.
     */
    interface WaBreadcrumbItem extends HTMLElement {
        href?: string;
    }

    /**
     * **wa-button**
     *
     * An interactive button element.
     *
     * @property variant - The button's color scheme.
     * @property appearance - The button's visual style.
     * @property size - The size of the button.
     * @property pill - Renders the button with fully rounded corners.
     * @property loading - Displays a spinner and disables the button.
     * @property disabled - Disables the button.
     * @property href - Renders the button as an `<a>` tag.
     * @property type - The type of button, used when in a form.
     *
     * @slot - The button's main content.
     * @slot start - For a leading icon.
     * @slot end - For a trailing icon.
     */
    interface WaButton extends HTMLElement {
        variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
        appearance?: 'filled' | 'outlined' | 'plain';
        size?: 'small' | 'medium' | 'large';
        pill?: boolean;
        loading?: boolean;
        disabled?: boolean;
        href?: string;
        target?: string;
        rel?: string;
        type?: 'button' | 'submit' | 'reset';
    }

    /**
     * **wa-button-group**
     *
     * A container for grouping related buttons. Properties set on the group
     * will apply to all child buttons.
     *
     * @slot - Contains one or more `<wa-button>` elements.
     */
    interface WaButtonGroup extends HTMLElement { }

    /**
     * **wa-callout**
     *
     * A prominent message box for alerts, notifications, or status messages.
     *
     * @property variant - The callout's color scheme.
     * @property size - The size of the callout.
     *
     * @slot - The main content of the callout.
     * @slot icon - A slot for an icon, typically on the left side.
     */
    interface WaCallout extends HTMLElement {
        variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
        size?: 'small' | 'medium' | 'large';
    }

    /**
     * **wa-card**
     *
     * A flexible content container.
     *
     * @property appearance - The card's visual style.
     *
     * @slot - The main content of the card.
     * @slot header - The card's header section.
     * @slot footer - The card's footer section.
     * @slot media - A section for images or other media.
     */
    interface WaCard extends HTMLElement {
        appearance?: 'outlined' | 'filled' | 'plain';
    }

    /**
     * **wa-carousel**
     *
     * A slideshow component for cycling through elements.
     *
     * @property navigation - Shows previous/next navigation buttons.
     * @property pagination - Shows pagination dots.
     * @property loop - Allows the carousel to loop from the last to the first slide.
     * @property autoplay - Automatically advances slides.
     * @property slides-per-page - The number of slides to show at once.
     *
     * @method goToSlide - Programmatically navigates to a specific slide.
     *
     * @event wa-slide-change - Emitted when the active slide changes.
     *
     * @slot - Contains one or more `<wa-carousel-item>` elements.
     */
    interface WaCarousel extends HTMLElement {
        navigation?: boolean;
        pagination?: boolean;
        loop?: boolean;
        autoplay?: boolean;
        'slides-per-page'?: number;
        goToSlide(index: number): void;
        addEventListener(type: 'wa-slide-change', listener: (this: WaCarousel, ev: WaCustomEvent<{ index: number; slide: WaCarouselItem }>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-carousel-item**
     *
     * An individual slide within a carousel. Must be a child of `<wa-carousel>`.
     *
     * @slot - The content of the slide.
     */
    interface WaCarouselItem extends HTMLElement { }

    /**
     * **wa-checkbox**
     *
     * A standard checkbox form control.
     *
     * @property checked - Whether the checkbox is checked.
     * @property indeterminate - Puts the checkbox in an indeterminate state.
     * @property size - The size of the checkbox.
     *
     * @event wa-change - Emitted when the checkbox state changes.
     */
    interface WaCheckbox extends WaFormControl {
        checked: boolean;
        indeterminate?: boolean;
        size?: 'small' | 'medium' | 'large';
        value: string;
    }

    /**
     * **wa-color-picker**
     *
     * A color selection tool with support for various formats.
     *
     * @property format - The color format to use (hex, rgb, hsl, hsv).
     * @property opacity - Allows adjusting the alpha channel.
     * @property swatches - A list of color swatches to display.
     *
     * @event wa-change - Emitted when the color value changes.
     */
    interface WaColorPicker extends WaFormControl {
        format?: 'hex' | 'rgb' | 'hsl' | 'hsv';
        opacity?: boolean;
        swatches?: string[];
        value: string;
    }

    /**
     * **wa-copy-button**
     *
     * A button that copies text to the clipboard.
     *
     * @property value - The text to copy.
     * @property from - A selector for an element whose content should be copied.
     */
    interface WaCopyButton extends HTMLElement {
        value?: string;
        from?: string;
    }

    /**
     * **wa-details**
     *
     * A collapsible content area (disclosure widget).
     *
     * @property summary - The summary text for the details element.
     * @property open - Whether the details content is visible.
     * @property disabled - Disables the details element.
     * @property name - Used for creating accordion-style groups.
     *
     * @slot summary - The summary content.
     * @slot expand-icon - A custom icon to show when collapsed.
     * @slot collapse-icon - A custom icon to show when expanded.
     */
    interface WaDetails extends HTMLElement {
        summary?: string;
        open?: boolean;
        disabled?: boolean;
        name?: string;
    }

    /**
     * **wa-dialog**
     *
     * A modal dialog that overlays the page content.
     *
     * @property label - A required, accessible label for the dialog.
     * @property open - Controls the visibility of the dialog.
     * @property light-dismiss - Allows closing the dialog by clicking the backdrop.
     *
     * @event wa-show - Emitted when the dialog begins to show. Can be prevented.
     * @event wa-hide - Emitted when the dialog begins to hide. Can be prevented.
     * @event wa-after-show - Emitted after the dialog has been shown.
     * @event wa-after-hide - Emitted after the dialog has been hidden.
     */
    interface WaDialog extends HTMLElement {
        label: string;
        open?: boolean;
        'light-dismiss'?: boolean;
    }

    /**
     * **wa-divider**
     *
     * A visual separator for layouts.
     *
     * @property orientation - The orientation of the divider.
     *
     * @cssprop --width - The thickness of the divider.
     * @cssprop --color - The color of the divider.
     * @cssprop --spacing - The margin around the divider.
     */
    interface WaDivider extends HTMLElement {
        orientation?: 'horizontal' | 'vertical';
    }

    /**
     * **wa-drawer**
     *
     * A side panel that slides in from the edge of the screen.
     *
     * @property label - A required, accessible label for the drawer.
     * @property placement - The edge from which the drawer appears.
     * @property open - Controls the visibility of the drawer.
     *
     * @event wa-show - Emitted when the drawer begins to show. Can be prevented.
     * @event wa-hide - Emitted when the drawer begins to hide. Can be prevented.
     * @event wa-after-show - Emitted after the drawer has been shown.
     * @event wa-after-hide - Emitted after the drawer has been hidden.
     */
    interface WaDrawer extends HTMLElement {
        label: string;
        placement?: 'start' | 'end' | 'top' | 'bottom';
        open?: boolean;
    }

    /**
     * **wa-dropdown**
     *
     * A contextual menu that appears when a trigger is activated.
     *
     * @property placement - The preferred placement of the dropdown.
     * @property distance - The distance from the trigger.
     *
     * @slot trigger - The element that triggers the dropdown.
     * @slot - Contains one or more `<wa-dropdown-item>` elements.
     */
    interface WaDropdown extends HTMLElement {
        placement?: 'top' | 'bottom' | 'left' | 'right' | string;
        distance?: number;
    }

    /**
     * **wa-dropdown-item**
     *
     * An item within a dropdown menu. Must be a child of `<wa-dropdown>`.
     *
     * @property value - A value to associate with the item.
     * @property type - The type of item (e.g., checkbox for selectable items).
     * @property checked - For checkbox-type items, indicates the checked state.
     * @property variant - The item's color scheme (e.g., danger for destructive actions).
     */
    interface WaDropdownItem extends HTMLElement {
        value?: string;
        type?: 'checkbox';
        checked?: boolean;
        variant?: 'danger';
    }

    /**
     * **wa-format-bytes**
     *
     * Formats a number of bytes into a human-readable string.
     *
     * @property value - The number of bytes to format.
     */
    interface WaFormatBytes extends HTMLElement {
        value: number;
    }

    /**
     * **wa-format-date**
     *
     * Formats a date/time into a human-readable string.
     *
     * @property value - The date to format (Date object or timestamp string).
     */
    interface WaFormatDate extends HTMLElement {
        value: Date | string;
    }

    /**
     * **wa-format-number**
     *
     * Formats a number into a human-readable string.
     *
     * @property value - The number to format.
     */
    interface WaFormatNumber extends HTMLElement {
        value: number;
    }

    /**
     * **wa-icon**
     *
     * Displays an icon from a library or a custom SVG source.
     *
     * @property name - The name of the icon to load from the default library.
     * @property src - The URL of a custom SVG file to use.
     * @property library - The name of the icon library to use.
     * @property label - A required, accessible label for the icon.
     */
    interface WaIcon extends HTMLElement {
        name?: string;
        src?: string;
        library?: string;
        label?: string;
    }

    /**
     * **wa-include**
     *
     * Includes and renders external HTML content.
     *
     * @property src - The URL of the HTML file to include.
     *
     * @event wa-load - Emitted when the content is successfully loaded.
     * @event wa-error - Emitted if the content fails to load.
     */
    interface WaInclude extends HTMLElement {
        src: string;
        addEventListener(type: 'wa-load', listener: (this: WaInclude, ev: WaCustomEvent) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: 'wa-error', listener: (this: WaInclude, ev: WaCustomEvent<{ status: number }>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-input**
     *
     * A versatile text input form control.
     *
     * @property type - The type of input (e.g., text, email, password).
     * @property label - The input's label.
     * @property placeholder - Placeholder text.
     * @property hint - Hint text displayed below the input.
     * @property with-clear - Shows a clear button when the input has value.
     * @property password-toggle - Shows a toggle for password visibility.
     * @property size - The size of the input.
     * @property appearance - The input's visual style.
     * @property pill - Renders the input with fully rounded corners.
     *
     * @slot label - The input's label.
     * @slot hint - The input's hint text.
     * @slot start - Content to display at the start of the input.
     * @slot end - Content to display at the end of the input.
     *
     * @event wa-change - Emitted when the value changes.
     * @event wa-input - Emitted on every keystroke.
     */
    interface WaInput extends WaFormControl {
        type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
        label?: string;
        placeholder?: string;
        hint?: string;
        'with-clear'?: boolean;
        'password-toggle'?: boolean;
        size?: 'small' | 'medium' | 'large';
        appearance?: 'filled';
        pill?: boolean;
        value: string;
    }

    /**
     * **wa-mutation-observer**
     *
     * A declarative wrapper around the MutationObserver API.
     *
     * @event wa-mutation - Emitted when a DOM mutation is observed.
     */
    interface WaMutationObserver extends HTMLElement {
        addEventListener(type: 'wa-mutation', listener: (this: WaMutationObserver, ev: WaCustomEvent<MutationRecord[]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-option**
     *
     * An option within a select control. Must be a child of `<wa-select>`.
     *
     * @property value - The value of the option.
     * @property disabled - Disables the option.
     *
     * @slot - The text content of the option.
     */
    interface WaOption extends HTMLElement {
        value: string;
        disabled?: boolean;
    }

    /**
     * **wa-page**
     * Experimental full-page layout component.
     *
     * @property view - The current responsive view (auto-detected).
     * @property nav-open - Controls the visibility of the mobile navigation drawer.
     * @property mobile-breakpoint - The breakpoint for switching to mobile view.
     * @property navigation-placement - The side for the navigation panel.
     * @property disable-navigation-toggle - Hides the default nav toggle button.
     *
     * @method showNavigation - Shows the mobile navigation drawer.
     * @method hideNavigation - Hides the mobile navigation drawer.
     * @method toggleNavigation - Toggles the mobile navigation drawer.
     *
     * @slot banner - Top-most banner area.
     * @slot header - Main site header.
     * @slot subheader - Below the header, for breadcrumbs, etc.
     * @slot menu - Desktop left sidebar content (overrides navigation slots).
     * @slot navigation-header - Header for responsive navigation.
     * @slot navigation - Main content for responsive navigation.
     * @slot navigation-footer - Footer for responsive navigation.
     * @slot main-header - Header for the main content area.
     * @slot - Default main content area.
     * @slot main-footer - Footer for the main content area.
     * @slot aside - Right sidebar content.
     * @slot footer - Page footer, below the viewport.
     * @slot navigation-toggle - A custom navigation toggle button.
     * @slot skip-to-content - A custom "skip to content" link.
     *
     * @cssprop --menu-width - Width of the left sidebar.
     * @cssprop --main-width - Width of the main content area.
     * @cssprop --aside-width - Width of the right sidebar.
     */
    interface WaPage extends HTMLElement {
        view?: 'mobile' | 'desktop';
        'nav-open'?: boolean;
        'mobile-breakpoint'?: string;
        'navigation-placement'?: 'start' | 'end';
        'disable-navigation-toggle'?: boolean;
        showNavigation(): void;
        hideNavigation(): void;
        toggleNavigation(): void;
    }

    /**
     * **wa-popover**
     *
     * A container for positioned, interactive content, anchored to another element.
     *
     * @property for - The ID of the element to anchor the popover to.
     * @property placement - The preferred placement of the popover.
     */
    interface WaPopover extends HTMLElement {
        for: string;
        placement?: 'top' | 'bottom' | 'left' | 'right' | string;
    }

    /**
     * **wa-progress-bar**
     *
     * A linear progress indicator.
     *
     * @property value - The current progress (0-100).
     * @property indeterminate - Puts the bar in an indeterminate state.
     *
     * @cssprop --track-height - The height of the progress bar track.
     */
    interface WaProgressBar extends HTMLElement {
        value?: number;
        indeterminate?: boolean;
    }

    /**
     * **wa-progress-ring**
     *
     * A circular progress indicator.
     *
     * @property value - The current progress (0-100).
     * @property indeterminate - Puts the ring in an indeterminate state.
     *
     * @cssprop --size - The diameter of the progress ring.
     */
    interface WaProgressRing extends HTMLElement {
        value?: number;
        indeterminate?: boolean;
    }

    /**
     * **wa-qr-code**
     *
     * Generates and displays a QR code.
     *
     * @property value - The data to encode in the QR code.
     * @property size - The size of the QR code in pixels.
     * @property error-correction - The error correction level.
     */
    interface WaQrCode extends HTMLElement {
        value: string;
        size?: number;
        'error-correction'?: 'L' | 'M' | 'Q' | 'H';
    }

    /**
     * **wa-radio**
     *
     * A radio button. Must be a child of `<wa-radio-group>`.
     *
     * @property value - The value of the radio button.
     * @property appearance - The radio's visual style.
     */
    interface WaRadio extends HTMLElement {
        value: string;
        appearance?: 'button';
    }

    /**
     * **wa-radio-group**
     *
     * A container for a group of radio buttons.
     *
     * @property label - A required, accessible label for the group.
     * @property orientation - The layout orientation of the radio buttons.
     * @property size - The size of the radio buttons.
     *
     * @event wa-change - Emitted when the selected radio changes.
     *
     * @slot - Contains one or more `<wa-radio>` elements.
     */
    interface WaRadioGroup extends WaFormControl {
        label: string;
        orientation?: 'horizontal' | 'vertical';
        size?: 'small' | 'medium' | 'large';
        value: string;
    }

    /**
     * **wa-rating**
     *
     * A star rating component.
     *
     * @property value - The current rating value.
     * @property max - The maximum number of rating symbols.
     * @property precision - The precision of the rating (e.g., 0.5 for half-stars).
     * @property size - The size of the rating symbols.
     * @property readonly - Makes the rating non-interactive.
     * @property getSymbol - A function to customize the rating symbols.
     *
     * @event wa-change - Emitted when the rating value changes.
     * @event wa-hover - Emitted when hovering over a rating symbol.
     */
    interface WaRating extends WaFormControl {
        value: number;
        max?: number;
        precision?: number;
        size?: 'small' | 'medium' | 'large';
        readonly?: boolean;
        getSymbol?: (value: number, isSelected: boolean) => string;
        addEventListener(type: 'wa-hover', listener: (this: WaRating, ev: WaCustomEvent<{ phase: 'start' | 'move' | 'end', value: number }>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-relative-time**
     *
     * Formats a date into a relative time string (e.g., "2 hours ago").
     *
     * @property value - The date to format (Date object or timestamp string).
     */
    interface WaRelativeTime extends HTMLElement {
        value: Date | string;
    }

    /**
     * **wa-resize-observer**
     *
     * A declarative wrapper around the ResizeObserver API.
     *
     * @event wa-resize - Emitted when the observed element is resized.
     */
    interface WaResizeObserver extends HTMLElement {
        addEventListener(type: 'wa-resize', listener: (this: WaResizeObserver, ev: WaCustomEvent<ResizeObserverEntry[]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-select**
     *
     * A dropdown selection form control.
     *
     * @property multiple - Allows multiple options to be selected.
     * @property with-clear - Shows a clear button.
     * @property placeholder - Placeholder text.
     * @property max-options-visible - The maximum number of options to show before scrolling.
     * @property getTag - A function to customize the display of selected items in multiple mode.
     *
     * @event wa-change - Emitted when the selection changes.
     *
     * @slot - Contains one or more `<wa-option>` elements.
     */
    interface WaSelect extends WaFormControl {
        multiple?: boolean;
        'with-clear'?: boolean;
        placeholder?: string;
        'max-options-visible'?: number;
        getTag?: (option: WaOption, index: number) => HTMLElement | string;
        value: string | string[];
    }

    /**
     * **wa-skeleton**
     *
     * A placeholder for content that is loading.
     *
     * @property effect - The loading animation effect.
     */
    interface WaSkeleton extends HTMLElement {
        effect?: 'sheen' | 'pulse';
    }

    /**
     * **wa-slider**
     *
     * A range input slider.
     *
     * @property min - The minimum value.
     * @property max - The maximum value.
     * @property step - The increment step.
     * @property value - The current value.
     * @property range - Enables a dual-handle range slider.
     * @property with-tooltip - Shows a tooltip with the current value.
     * @property with-markers - Shows markers at each step.
     * @property orientation - The orientation of the slider.
     * @property valueFormatter - A function to format the tooltip text.
     *
     * @event wa-change - Emitted when the value changes.
     */
    interface WaSlider extends WaFormControl {
        min?: number;
        max?: number;
        step?: number;
        value: number;
        range?: boolean;
        'with-tooltip'?: boolean;
        'with-markers'?: boolean;
        orientation?: 'horizontal' | 'vertical';
        valueFormatter?: (value: number) => string;
    }

    /**
     * **wa-split-panel**
     *
     * A container with two resizable panels.
     *
     * @property position - The position of the divider (0-100).
     * @property orientation - The orientation of the panels.
     * @property snap - A position to snap the divider to.
     *
     * @slot start - The content for the start panel.
     * @slot end - The content for the end panel.
     * @slot divider - A custom divider element.
     */
    interface WaSplitPanel extends HTMLElement {
        position?: number;
        orientation?: 'horizontal' | 'vertical';
        snap?: number;
    }

    /**
     * **wa-spinner**
     *
     * A circular loading indicator.
     *
     * @cssprop --indicator-color - The color of the spinner's indicator.
     * @cssprop --track-color - The color of the spinner's track.
     */
    interface WaSpinner extends HTMLElement { }

    /**
     * **wa-switch**
     *
     * A toggle switch form control.
     *
     * @property checked - Whether the switch is on.
     * @property size - The size of the switch.
     *
     * @cssprop --width - The width of the switch.
     * @cssprop --height - The height of the switch.
     * @cssprop --thumb-size - The size of the switch's thumb.
     *
     * @event wa-change - Emitted when the state changes.
     */
    interface WaSwitch extends WaFormControl {
        checked: boolean;
        size?: 'small' | 'medium' | 'large';
        value: string;
    }

    /**
     * **wa-tab**
     *
     * A tab control within a tab group. Must be a child of `<wa-tab-group>`.
     *
     * @property panel - The name of the `wa-tab-panel` to show when this tab is active.
     *
     * @slot - The tab's label.
     */
    interface WaTab extends HTMLElement {
        panel: string;
    }

    /**
     * **wa-tab-group**
     *
     * A container for a tabbed interface.
     *
     * @property active - The `name` of the currently active panel.
     * @property placement - The position of the tab controls.
     *
     * @event wa-tab-show - Emitted when a tab is shown.
     *
     * @slot - Contains `<wa-tab>` and `<wa-tab-panel>` elements.
     */
    interface WaTabGroup extends HTMLElement {
        active?: string;
        placement?: 'top' | 'bottom' | 'start' | 'end';
        addEventListener(type: 'wa-tab-show', listener: (this: WaTabGroup, ev: WaCustomEvent<{ panel: string }>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-tab-panel**
     *
     * A content panel within a tab group. Must be a child of `<wa-tab-group>`.
     *
     * @property name - A unique name for the panel, referenced by a `<wa-tab>`.
     *
     * @slot - The content of the panel.
     */
    interface WaTabPanel extends HTMLElement {
        name: string;
    }

    /**
     * **wa-tag**
     *
     * A removable tag or label.
     *
     * @property variant - The tag's color scheme.
     * @property size - The size of the tag.
     * @property pill - Renders the tag with fully rounded corners.
     * @property with-remove - Shows a remove button.
     *
     * @event wa-remove - Emitted when the remove button is clicked.
     */
    interface WaTag extends HTMLElement {
        variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
        size?: 'small' | 'medium' | 'large';
        pill?: boolean;
        'with-remove'?: boolean;
        addEventListener(type: 'wa-remove', listener: (this: WaTag, ev: WaCustomEvent) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-textarea**
     *
     * A multi-line text input form control.
     *
     * @property label - The textarea's label.
     * @property rows - The visible number of text lines.
     * @property resize - Controls whether the textarea is resizable.
     * @property size - The size of the textarea.
     * @property appearance - The textarea's visual style.
     *
     * @event wa-change - Emitted when the value changes.
     * @event wa-input - Emitted on every keystroke.
     */
    interface WaTextarea extends WaFormControl {
        label?: string;
        rows?: number;
        resize?: 'vertical' | 'auto' | 'none';
        size?: 'small' | 'medium' | 'large';
        appearance?: 'filled';
        value: string;
    }

    /**
     * **wa-tooltip**
     *
     * A non-interactive "help text" bubble that appears on hover or focus.
     *
     * @property for - The ID of the element to anchor the tooltip to.
     * @property trigger - The event that triggers the tooltip.
     * @property placement - The preferred placement of the tooltip.
     */
    interface WaTooltip extends HTMLElement {
        for: string;
        trigger?: 'hover' | 'click' | 'manual';
        placement?: 'top' | 'bottom' | 'left' | 'right' | string;
    }

    /**
     * **wa-tree**
     *
     * A hierarchical list structure.
     *
     * @property selection - The selection mode for tree items.
     *
     * @event wa-selection-change - Emitted when the selection changes.
     *
     * @slot - Contains one or more `<wa-tree-item>` elements.
     */
    interface WaTree extends HTMLElement {
        selection?: 'single' | 'multiple' | 'leaf';
        addEventListener(type: 'wa-selection-change', listener: (this: WaTree, ev: WaCustomEvent<{ selection: WaTreeItem[] }>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }

    /**
     * **wa-tree-item**
     *
     * An item within a tree. Must be a child of `<wa-tree>`.
     *
     * @property expanded - Whether the item's children are visible.
     * @property selected - Whether the item is selected.
     * @property lazy - If true, emits `wa-lazy-load` when expanded to load children on demand.
     *
     * @event wa-lazy-load - Emitted when a lazy item is expanded for the first time.
     *
     * @slot - The item's label.
     * @slot children - Contains nested `<wa-tree-item>` elements.
     */
    interface WaTreeItem extends HTMLElement {
        expanded?: boolean;
        selected?: boolean;
        lazy?: boolean;
        addEventListener(type: 'wa-lazy-load', listener: (this: WaTreeItem, ev: WaCustomEvent) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    }


    // --- Map tag names to their element interfaces --- //

    interface HTMLElementTagNameMap {
        'wa-animation': WaAnimation;
        'wa-avatar': WaAvatar;
        'wa-badge': WaBadge;
        'wa-breadcrumb': WaBreadcrumb;
        'wa-breadcrumb-item': WaBreadcrumbItem;
        'wa-button': WaButton;
        'wa-button-group': WaButtonGroup;
        'wa-callout': WaCallout;
        'wa-card': WaCard;
        'wa-carousel': WaCarousel;
        'wa-carousel-item': WaCarouselItem;
        'wa-checkbox': WaCheckbox;
        'wa-color-picker': WaColorPicker;
        'wa-copy-button': WaCopyButton;
        'wa-details': WaDetails;
        'wa-dialog': WaDialog;
        'wa-divider': WaDivider;
        'wa-drawer': WaDrawer;
        'wa-dropdown': WaDropdown;
        'wa-dropdown-item': WaDropdownItem;
        'wa-format-bytes': WaFormatBytes;
        'wa-format-date': WaFormatDate;
        'wa-format-number': WaFormatNumber;
        'wa-icon': WaIcon;
        'wa-include': WaInclude;
        'wa-input': WaInput;
        'wa-mutation-observer': WaMutationObserver;
        'wa-option': WaOption;
        'wa-page': WaPage;
        'wa-popover': WaPopover;
        'wa-progress-bar': WaProgressBar;
        'wa-progress-ring': WaProgressRing;
        'wa-qr-code': WaQrCode;
        'wa-radio': WaRadio;
        'wa-radio-group': WaRadioGroup;
        'wa-rating': WaRating;
        'wa-relative-time': WaRelativeTime;
        'wa-resize-observer': WaResizeObserver;
        'wa-select': WaSelect;
        'wa-skeleton': WaSkeleton;
        'wa-slider': WaSlider;
        'wa-split-panel': WaSplitPanel;
        'wa-spinner': WaSpinner;
        'wa-switch': WaSwitch;
        'wa-tab': WaTab;
        'wa-tab-group': WaTabGroup;
        'wa-tab-panel': WaTabPanel;
        'wa-tag': WaTag;
        'wa-textarea': WaTextarea;
        'wa-tooltip': WaTooltip;
        'wa-tree': WaTree;
        'wa-tree-item': WaTreeItem;
    }
}

// ===============================================================================================
// REACT / JSX-SPECIFIC TYPINGS
// ===============================================================================================
// For the modern JSX transform ("jsx": "react-jsx"), we need to augment the global
// HTMLElementTagNameMap instead of the JSX namespace. This tells TypeScript about
// the WebAwesome components and what props they accept.
// ===============================================================================================

// Helper type to merge WebAwesome component props with React HTML attributes
type WaReactProps<T> = Partial<Omit<T, keyof HTMLElement>> & React.HTMLAttributes<T>;

// Augment the global JSX namespace with properly typed WebAwesome components
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'wa-animation': WaReactProps<WaAnimation>;
            'wa-avatar': WaReactProps<WaAvatar>;
            'wa-badge': WaReactProps<WaBadge>;
            'wa-breadcrumb': WaReactProps<WaBreadcrumb>;
            'wa-breadcrumb-item': WaReactProps<WaBreadcrumbItem>;
            'wa-button': WaReactProps<WaButton>;
            'wa-button-group': WaReactProps<WaButtonGroup>;
            'wa-callout': WaReactProps<WaCallout>;
            'wa-card': WaReactProps<WaCard>;
            'wa-carousel': WaReactProps<WaCarousel>;
            'wa-carousel-item': WaReactProps<WaCarouselItem>;
            'wa-checkbox': WaReactProps<WaCheckbox>;
            'wa-color-picker': WaReactProps<WaColorPicker>;
            'wa-copy-button': WaReactProps<WaCopyButton>;
            'wa-details': WaReactProps<WaDetails>;
            'wa-dialog': WaReactProps<WaDialog>;
            'wa-divider': WaReactProps<WaDivider>;
            'wa-drawer': WaReactProps<WaDrawer>;
            'wa-dropdown': WaReactProps<WaDropdown>;
            'wa-dropdown-item': WaReactProps<WaDropdownItem>;
            'wa-format-bytes': WaReactProps<WaFormatBytes>;
            'wa-format-date': WaReactProps<WaFormatDate>;
            'wa-format-number': WaReactProps<WaFormatNumber>;
            'wa-icon': WaReactProps<WaIcon>;
            'wa-include': WaReactProps<WaInclude>;
            'wa-input': WaReactProps<WaInput>;
            'wa-mutation-observer': WaReactProps<WaMutationObserver>;
            'wa-option': WaReactProps<WaOption>;
            'wa-page': WaReactProps<WaPage>;
            'wa-popover': WaReactProps<WaPopover>;
            'wa-progress-bar': WaReactProps<WaProgressBar>;
            'wa-progress-ring': WaReactProps<WaProgressRing>;
            'wa-qr-code': WaReactProps<WaQrCode>;
            'wa-radio': WaReactProps<WaRadio>;
            'wa-radio-group': WaReactProps<WaRadioGroup>;
            'wa-rating': WaReactProps<WaRating>;
            'wa-relative-time': WaReactProps<WaRelativeTime>;
            'wa-resize-observer': WaReactProps<WaResizeObserver>;
            'wa-select': WaReactProps<WaSelect>;
            'wa-skeleton': WaReactProps<WaSkeleton>;
            'wa-slider': WaReactProps<WaSlider>;
            'wa-split-panel': WaReactProps<WaSplitPanel>;
            'wa-spinner': WaReactProps<WaSpinner>;
            'wa-switch': WaReactProps<WaSwitch>;
            'wa-tab': WaReactProps<WaTab>;
            'wa-tab-group': WaReactProps<WaTabGroup>;
            'wa-tab-panel': WaReactProps<WaTabPanel>;
            'wa-tag': WaReactProps<WaTag>;
            'wa-textarea': WaReactProps<WaTextarea>;
            'wa-tooltip': WaReactProps<WaTooltip>;
            'wa-tree': WaReactProps<WaTree>;
            'wa-tree-item': WaReactProps<WaTreeItem>;
        }
    }
}