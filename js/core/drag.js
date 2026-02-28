// --- GLOBAL DRAG & DROP LOGIC ---
let activeDragElement = null;
let dragStartX = 0, dragStartY = 0;
let initialDragX = 0, initialDragY = 0;

function initDragAndDrop() {
    const container = document.getElementById('previewContainer');
    if (!container) return;

    container.addEventListener('mousedown', function(e) {
        const el = e.target.closest('.drag-element');
        if (!el) return;

        // Text qismlarini faqat ALT/CTRL bosilganda surishga ruxsat, muhrlar (rasmlar) doim suriluradi.
        const isText = e.target.hasAttribute('contenteditable') || el.hasAttribute('contenteditable') || e.target.closest('[contenteditable="true"]');

        if (!isText || e.altKey || e.ctrlKey || e.shiftKey) {
            if (isText) e.preventDefault();

            activeDragElement = el;
            const certScale = parseFloat(el.closest('.certificate').dataset.scale) || 1;

            dragStartX = e.clientX / certScale;
            dragStartY = e.clientY / certScale;

            initialDragX = parseFloat(el.dataset.dragX) || 0;
            initialDragY = parseFloat(el.dataset.dragY) || 0;

            // Eski origin element joylashuvini saqlab qolish
            if (el.dataset.origTransform === undefined) {
                const comp = getComputedStyle(el).transform;
                el.dataset.origTransform = (comp && comp !== 'none') ? comp : '';
            }

            el.style.cursor = 'grabbing';
            if(getComputedStyle(el).position === 'static'){
                el.style.position = 'relative';
            }
            el.style.zIndex = "50";
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (activeDragElement) {
            const certScale = parseFloat(activeDragElement.closest('.certificate').dataset.scale) || 1;

            const dx = (e.clientX / certScale) - dragStartX;
            const dy = (e.clientY / certScale) - dragStartY;

            const newX = initialDragX + dx;
            const newY = initialDragY + dy;

            activeDragElement.dataset.dragX = newX;
            activeDragElement.dataset.dragY = newY;

            // Translate yordamida o'zgartirish (eski joyidan siljitish)
            activeDragElement.style.transform = `${activeDragElement.dataset.origTransform} translate(${newX}px, ${newY}px)`;
        }
    });

    document.addEventListener('mouseup', function(e) {
        if (activeDragElement) {
            activeDragElement.style.cursor = '';
            activeDragElement.style.zIndex = '';
            activeDragElement = null;
        }
    });
}
