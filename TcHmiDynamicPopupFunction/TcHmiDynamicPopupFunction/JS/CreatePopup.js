// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.42/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiDynamicPopupFunction;
        (function (TcHmiDynamicPopupFunction) {
            function CreatePopup(popupId, targetFile, popupHeader, modal, movable, destination, width, height, left, top) {

                const id = popupId + ".UserControlHost";

                // Search for an element with a specific ID
                const popupExists = document.getElementById(id);

                // Check if the element exists
                if (popupExists) {
                    return;
                }
                else {
                    try {
                        //get the popup provider
                        const popupUiProvider = TcHmi.UiProvider.getPreferredProvider("popup");

                        //Create default parameters for the popup
                        let parameters = {
                            "data-tchmi-target-user-control": targetFile.path,
                            "data-tchmi-left": 0,
                            "data-tchmi-top": 0,
                            "data-tchmi-width": 100,
                            "data-tchmi-height": 100,
                            "data-tchmi-width-unit": "%",
                            "data-tchmi-height-unit": "%"
                        };
                        //Create partial parameters for the popup
                        let attributes = targetFile.attributes;
                        for (const key in attributes) {
                            if (attributes.hasOwnProperty(key)) {
                                parameters[key] = attributes[key];
                            }
                        }

                        //Create UserControl
                        const popupHost = TcHmi.ControlFactory.createEx(
                            "TcHmi.Controls.System.TcHmiUserControlHost",
                            id,
                            parameters
                        );

                        const popupElement = popupHost.getElement()[0]; //retrieve html-element
                        const popupDestination = TcHmi.Controls.get(destination); //get destination control
                        const popup = popupUiProvider.createHtmlElementBox(popupHeader, popupElement, {}, popupDestination);

                        if (modal) {
                            popup.setBackgroundMode(TcHmi.UiProvider.PopupProvider.BackgroundMode.Dimmed);
                            popup.setPositioningMode(TcHmi.UiProvider.PopupProvider.PositioningMode.Centered);
                            popup.setMovable(false);
                        } else {
                            popup.setBackgroundMode(TcHmi.UiProvider.PopupProvider.BackgroundMode.None);
                            popup.setPositioningMode(TcHmi.UiProvider.PopupProvider.PositioningMode.Floating);
                            popup.setMovable(movable);
                        }

                        popup.setBounds({
                            width: width,
                            height: height,
                            left: left,
                            top: top
                        });

                        popup.setCloseButton(true);
                        popup.show();

                        TcHmi.EventProvider.register(id + ".onDetached", () => {
                            popup.destroy();
                            popupHost.destroy();
                        });

                    } catch (e) {
                        console.error(e);
                    }
                }

            }
            TcHmiDynamicPopupFunction.CreatePopup = CreatePopup;
        })(TcHmiDynamicPopupFunction = Functions.TcHmiDynamicPopupFunction || (Functions.TcHmiDynamicPopupFunction = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('CreatePopup', 'TcHmi.Functions.TcHmiDynamicPopupFunction', TcHmi.Functions.TcHmiDynamicPopupFunction.CreatePopup);