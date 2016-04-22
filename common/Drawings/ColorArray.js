/*
 *
 * (c) Copyright Ascensio System Limited 2010-2016
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7  3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7  3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/
"use strict";

(function(){

function CShapeColor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;

    this.darken = function ()
    {
        var hslColor  = RGBToHSL(this);
        hslColor.l *= 0.9;

        return HSLToRGB(hslColor);
    };

    this.darkenLess = function ()
    {
        var hslColor  = RGBToHSL(this);
        hslColor.l *= 0.85;

        return HSLToRGB(hslColor);
    };

        this.lighten  = function () {
        var hslColor  = RGBToHSL(this);
        hslColor.l *= 1.1;
        if(hslColor.l > 1)
        {
            hslColor.l = 1;
        }

        return HSLToRGB(hslColor);
    };

    this.lightenLess = function()
    {
        var hslColor  = RGBToHSL(this);
        hslColor.l*= 1.1;
        if(hslColor.l > 1)
        {
            hslColor.l = 1;
        }

        return HSLToRGB(hslColor);
    };

    this.norm  = function(a){
        return this;
    };

}

function RGBToHSL(RGBColor)//{r : 0..255, g : 0..255, b: 0..255}
{
    var r, g, b;
    r = RGBColor.r/255;
    g = RGBColor.g/255;
    b = RGBColor.b/255;

    var max, min;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    var h, s, l;
    h = max === min ? 0
        : (max == r && g>=b) ? 60*(g-b)/(max-min)
        : (max == r && g < b) ? 60*(g-b)/(max-min)+360
        : (max == g) ? 60*(b-r)/(max - min)+120
        : 60*(r-g)/(max-min)+240;
    l = (max + min)*0.5;
    s =  l > 0.5 ? (max -min) / (2 - max - min) : (max -min) / (max + min);
    while(h<0)
    {
        h+=360;
    }
    while(h>=360)
    {
        h-=360;
    }
    return {h : h, s : s, l : l}; //{h : 0..360, s : 0..1, l : 0..1}
}

function HSLToRGB(HSLColor) {  //{h : 0..360, s : 0..1, l : 0..1}

    var h, s, l, r, g, b;

    h = HSLColor.h/360;
    s = HSLColor.s;
    l = HSLColor.l;

    var q, p, tr, tg, tb;
    q = l < 0.5 ? (l*(1+s)): l+s-l*s;
    p = 2*l - q;
    tr = h+1/3;
    tg = h;
    tb = h-1/3;

    if(tr < 0) {

        tr+=1;
    }
    if(tr > 1) {

        tr-=1;
    }

    if(tg < 0) {

        tg+=1;
    }
    if(tg > 1) {

        tg-=1;
    }

    if(tb < 0) {

        tb+=1;
    }
    if(tb > 1) {

        tb-=1;
    }

    r = Math.round(255*(tr < 1/6 ? p + ((q-p)*6*tr) : (1/6 <  tr && tr <1/2) ? q : (1/2 < tr && tr < 2/3) ? (p+((q-p)*(2/3-tr)*6)) : p));
    g = Math.round(255*(tg < 1/6 ? p + ((q-p)*6*tg) : (1/6 <  tg && tg <1/2) ? q : (1/2 < tg && tg < 2/3) ? (p+((q-p)*(2/3-tg)*6)) : p));
    b = Math.round(255*(tb < 1/6 ? p + ((q-p)*6*tb) : (1/6 <  tb && tb <1/2) ? q : (1/2 < tb && tb < 2/3) ? (p+((q-p)*(2/3-tb)*6)) : p));
    if(r>255) r=255;
    if(g>255) g=255;
    if(b>255) b=255;
    return {r : r, g : g, b : b};//{r : 0..255, g : 0..255, b : 0..255}
}

    //--------------------------------------------------------export----------------------------------------------------
    window['AscFormat'] = window['AscFormat'] || {};
    window['AscFormat'].CShapeColor = CShapeColor;
})();
