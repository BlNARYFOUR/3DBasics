class EventHandlers {
    static onResize(e, canvas, glContext) {
        let width = canvas.clientWidth;
        let height = canvas.clientHeight;

        canvas.width = width;
        canvas.height = height;
        glContext.viewport(0, 0, width, height);
        Helper.debug("Resizing...");
    }
}