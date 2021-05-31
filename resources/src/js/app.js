/**
 * En este documento solo se deben importar cosas
 */
import Global from "./_global"
import EasterEgg from './_easteregg'
import '../sass/style.scss';
window.$ = jQuery;

EasterEgg.init();

/**
 * Ocupar variables de entorno:
 * Url de sitio: emWp.siteUrl
 * Url del template: emWp.templateUrl
 * Url de ajax: emWp.ajaxUrl
 */

const init = () => {
    /**
     * Equivalente a document ready, no agregarlo
     */
    document.addEventListener("DOMContentLoaded", function(event) { //document ready nativo
        Global.init();
        console.log($);
    });


    window.onload = () => { // window.load nativo

    }
}

init();