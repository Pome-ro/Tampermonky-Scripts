// ==UserScript==
// @name         Lemmy Kitchen Sink
// @namespace    http://tampermonkey.net/
// @version      24.01.29.929
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lemmygrad.ml
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    // States
    var moddingDom = false
    var timeSinceLastMod
    
    
    // FUNCTIONS
    function isLemmySite() {
        const meta = document.querySelector('meta[name="Description"]');
        return (
            meta && meta.content === "Lemmy"
        );
    }
    function extractDomain(fullUsername) {
        const pattern = /@[^@]+@([^@]+)/;
        const match = fullUsername.match(pattern);
        return match ? match[1] : null;
    }
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    function addDomainsToDisplayNames(){
        moddingDom = true
        let personListings = document.getElementsByClassName('person-listing')
        //console.log("Adding Domains to Display Names")
        //console.log(personListings.length)
        for(let i = 0;i < personListings.length;i++){
            let poster = personListings[i];
            //console.log("working...")
            //console.log(poster)
            if (poster.title === poster.text) {
            } else {
                let domain = extractDomain(poster.title);
                let domainBadge = document.createElement("span")
                domainBadge.innerHTML = domain
                domainBadge.classList.add("domainTag")
                //console.log(domain)
                insertAfter(poster,domainBadge)
            }
        }
        moddingDom = false
    }
    // THE SCRIPT
    if(!isLemmySite()){
        console.log("not a lemmy site")
        return
    } else {
        console.log("Lemmy Site Detected!")
        let url = document.location.href;
        window.onload = () => {
            addDomainsToDisplayNames()
            const body = document.querySelector("body");
            const observer = new MutationObserver((_) => {
                if(url !== document.location.href){
                    url = document.location.href;
                    
                };
                if(!moddingDom){
                    var domainsTimer = setTimeout(()=>{
                        addDomainsToDisplayNames()
                    },5000)
                }
            });
            observer.observe(body,{childList:true,subtree:true});
        };
    };

})();