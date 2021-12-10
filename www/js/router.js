/** router.js **/
ROUTER = (() => {
    let currPage = 0;
    const divs = [$("#page1"), $("#page2"), $("#page3")];
    const nextPage = $("#nextPage");
    const init = () => {
        divs[0].removeClass("hidden");
        nextPage.click(() => {
            if (currPage === 2) return;
            currPage += 1;
            divs.forEach((div, i) => {
                console.log(i, currPage);
                if (i === currPage) {
                    div.removeClass("hidden");
                } else {
                    div.addClass("hidden");
                }
            });
        });
    };
    return { init };
})();

ROUTER.init();