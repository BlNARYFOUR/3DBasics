class Helper {
    static colorLog(text, color = "blue") {
        console.log("%c" + text, "color: " + color + ";");
    }

    static debug(text) {
        if(Settings.IS_DEV_VERSION) {
            Helper.colorLog("DEBUG: " + text, "purple");
        }
    }
}