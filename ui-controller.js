export const UI = {
    createWindow(title, content) {
        const id = 'win-' + Math.random().toString(36).substr(2, 9);
        const win = document.createElement('div');
        win.id = id;
        win.className = 'floating-window glass-panel top-20 left-1/3 p-4';
        win.innerHTML = `
            <div class="flex justify-between items-center mb-4 cursor-move border-b border-white/10 pb-2">
                <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">${title}</span>
                <button onclick="document.getElementById('${id}').remove()" class="text-zinc-500 hover:text-white">✕</button>
            </div>
            <div class="window-content text-sm text-zinc-300">
                ${content}
            </div>
        `;
        document.body.appendChild(win);
        this.makeDraggable(win);
    },

    makeDraggable(el) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        el.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            if (e.target.closest('button')) return;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
};
