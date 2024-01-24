// ==UserScript==
// @name         Lemmy Script
// @namespace    http://pome.ro/
// @version      2024-01-24
// @description  Scripts for Lemmy
// @author       @pomero
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lemmy.ml
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (!isLemmySite()){
        return;
    } else { 
        // Is a Lemmy Website!
    }
})();
function isLemmySite() {
    const meta = document.querySelector('meta[name="Description"]');
    return (
        meta && meta.content === "Lemmy"
    );
}