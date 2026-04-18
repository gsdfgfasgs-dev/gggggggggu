document.addEventListener("DOMContentLoaded", function () {
    function updateBlockVisibility(block) {
        const typeField = block.querySelector('select[name$="-block_type"]');
        if (!typeField) return;

        const bodyField = block.querySelector(".form-row.field-body");
        const imageField = block.querySelector(".form-row.field-image");
        const altField = block.querySelector(".form-row.field-image_alt");

        const isImage = typeField.value === "image";

        if (bodyField) {
            bodyField.style.display = isImage ? "none" : "";
        }

        if (imageField) {
            imageField.style.display = isImage ? "" : "none";
        }

        if (altField) {
            altField.style.display = isImage ? "" : "none";
        }
    }

    function bindBlock(block) {
        if (!block) return;
        if (block.dataset.articleBlockInitialized === "true") return;

        const typeField = block.querySelector('select[name$="-block_type"]');
        if (!typeField) return;

        updateBlockVisibility(block);

        typeField.addEventListener("change", function () {
            updateBlockVisibility(block);
        });

        block.dataset.articleBlockInitialized = "true";
    }

    function initAllBlocks() {
        const blocks = document.querySelectorAll(".inline-related");
        blocks.forEach(bindBlock);
    }

    initAllBlocks();

    document.addEventListener("formset:added", function (event) {
        bindBlock(event.target);
    });
});