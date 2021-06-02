chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var showCardId = function() {
                var elems = document.querySelectorAll(".card-short-id");

                [].forEach.call(elems, function(el) {
                    el.classList.remove("hide");
                    el.style.paddingRight = "5px";
                    el.style.fontWeight = "bold";
                });
            };

            // Show Trello card number and bold it
            var trelloCardIdExists = setInterval(function() {
                if (document.querySelector(".card-short-id")) {
                    clearInterval(trelloCardIdExists);

                    // Trigger it after 500ms after element exists
                    setTimeout(function() {
                        showCardId();
                    }, 500);
                }
            }, 100);

            // Detect style change for example moving cards across list, we show the card ID again
            // @see https://blog.sessionstack.com/how-javascript-works-tracking-changes-in-the-dom-using-mutationobserver-86adc7446401
            var mutationObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (
                        mutation.type === "attributes" &&
                        mutation.attributeName === "class" &&
                        mutation.target.className.includes("list-card")
                    ) {
                        showCardId();
                    }
                });
            });

            mutationObserver.observe(document.documentElement, {
                attributes: true,
                characterData: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true,
            });
        }
    }, 10);
});
