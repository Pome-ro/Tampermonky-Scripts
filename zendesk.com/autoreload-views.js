// ==UserScript==
// @name         Zendesk Auto-Reload
// @namespace    http://pome.ro/
// @version      23.11.08
// @description  provides a button to auto reload the zendesk view. 
// @author       @pomero
// @match        *://*.zendesk.com/agent/filters/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==

(function() {
    'use strict';
    var $j = jQuery.noConflict(true);
    var interval = 30
    var timeout = 1000 * interval;
    var timeleft = interval;
    var countdownText = `${timeleft}s`;
    var updateTimerInterval = null;
    jQuery('window').on('load',()=>{
        console.log("Window Loaded")
    })
    jQuery('document').ready(()=>{
        console.log("Document Loaded")
        setTimeout(testForHeader,5000)
    })
    function testForHeader() {
        var viewsHeader = jQuery('[data-test-id="views_views-list_header"]');
        console.log(viewsHeader.length)
        if (viewsHeader.length > 0) {
            console.log('Header Found!')
            addButton(viewsHeader)
        } else {
            setTimeout(testForHeader,5000)
        }
    };
    function updateTimer() {
        var timerobj = document.getElementById("interval");
        if (timeleft === 0) {
            timeleft = interval;
            reload()
        } else {
            timeleft = timeleft - 1;
        };
        countdownText = `${timeleft}s`;
        timerobj.textContent = countdownText;
    };
    function reload() {
        var refreshbtn = document.querySelector('[aria-label="Refresh views pane"]');
        refreshbtn.click();
    };
    function stopReload() {
        if (timeout > 0) {
            clearInterval(updateTimerInterval);
            timeout = 0;
            countdownText = "⏸";
            var timerobj = document.getElementById("interval");
            timerobj.textContent = countdownText;
        } else {
            interval = prompt("Set timeout In Seconds");
            timeout = 1000 * interval;
            timeleft = interval;
            countdownText = `${timeleft}s`;
            if (timeout > 0) {
                timerobj = document.getElementById("interval");
                timerobj.textContent = countdownText;
                updateTimerInterval = setInterval(updateTimer, 1000);
            };
        };
    };
    function addButton(viewsHeader) {
        var vhChilds = viewsHeader.children()[1]
        var chldClassList = vhChilds.children[0].classList
        const newNode = document.createElement("button");
        newNode.id = "interval";

        newNode.classList.add(...chldClassList);
        const textNode = document.createTextNode(countdownText);
        newNode.appendChild(textNode);
        vhChilds.insertBefore(newNode, vhChilds.children[0]);
        if (timeout > 0) {
            updateTimerInterval = setInterval(updateTimer, 1000);
        };
        var intervalNode = document.querySelector("#interval")
        if(intervalNode){
            intervalNode.addEventListener("click",stopReload,false)
        }
    }

})();