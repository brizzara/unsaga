document.addEventListener('DOMContentLoaded', function () {
    // Get references to elements
    var modalOverlay = document.getElementById('modalOverlay');
    var closeButtons = document.querySelectorAll('.close-button');
    var svgIcons = document.querySelectorAll('.svg-icon');
    var settings = document.querySelectorAll('.setting');
    var panels = document.querySelectorAll('.panel');
    var colorSelectors = document.querySelectorAll('.color-selector');
    var textInputs = document.querySelectorAll('.text-input');
    var skillSpans = document.querySelectorAll('.skill span');

    function fadeIn(element) {
        var opacity = 0;
        element.style.opacity = opacity;
        element.style.display = 'block';
        var fadeInInterval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 10);
    }

    function fadeOut(element) {
        var opacity = 1;
        var fadeOutInterval = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeOutInterval);
                element.style.display = 'none';
                // Reset settings and panels
                resetSettingsAndPanels();
            }
        }, 10);
    }

    function resetSettingsAndPanels() {
        settings.forEach(function (setting) {
            setting.classList.remove('selected');
        });
        panels.forEach(function (panel) {
            panel.classList.remove('focused');
        });
    }

    function updatePanelClass(colorSelector, panel) {
        var selectedColorClassName = colorSelector.value;
        var varElement = panel.querySelector(".skill var");

        panel.className = panel.className.replace(/L\w+/g, '') + ' ' + selectedColorClassName;
        varElement.textContent = selectedColorClassName !== "" ? selectedColorClassName : "";

    }
    function syncTextInput(textInput, skillSpan) {
//        skillSpan.textContent = textInput.value.replace(/[\s　]+/g, "\n");
        const newText = textInput.value.replace(/[\s　]+/g, "<br>");
        skillSpan.innerHTML = newText;
    }
    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            fadeOut(modalOverlay);
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target === modalOverlay) {
            fadeOut(modalOverlay);
        }
    });
    panels.forEach(function (panel, index) {
        panel.addEventListener('click', function () {
            fadeIn(modalOverlay);
            resetSettingsAndPanels();
            settings[index].classList.add('selected');
            panel.classList.add('focused');
        });
    });
    function handleFocusAndBlurEvents(input, index) {
        input.addEventListener('focus', function () {
            resetSettingsAndPanels();
            panels[index].classList.add('focused');
            settings[index].classList.add('selected');
        });
        input.addEventListener('blur', resetSettingsAndPanels);
    }

    textInputs.forEach(function(textInput, index) {
        handleFocusAndBlurEvents(textInput, index);
        textInput.addEventListener('input', function() {
            syncTextInput(textInput, skillSpans[index]);
        });
    });

    colorSelectors.forEach(function (colorSelector, index) {
        colorSelector.addEventListener('focus', function () {
            resetSettingsAndPanels();
            panels[index].classList.add('focused');
            settings[index].classList.add('selected');
        });
        colorSelector.addEventListener('blur', resetSettingsAndPanels);
        colorSelector.addEventListener('change', function () {
            updatePanelClass(colorSelector, panels[index]);
            resetSettingsAndPanels();
            panels[index].classList.add('focused');
            settings[index].classList.add('selected');
        });
    });
    document.getElementById('button-download').addEventListener('click', function() {
        // 要素をキャプチャしてcanvasに変換
        html2canvas(document.getElementById('target-element')).then(function(canvas) {
            // Canvasを画像として変換
            var imgData = canvas.toDataURL('image/png');

            // 画像のダウンロード用リンクの作成
            var link = document.createElement('a');
            link.download = 'screenshot.png';
            link.href = imgData;
            link.click();
        });
    });
}, false);