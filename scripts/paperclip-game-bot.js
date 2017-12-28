// ==UserScript==
// @name         Paperclip Game Bot
// @namespace    https://github.com/RcKeller/userscripts
// @version      0.1
// @description  Gaming the Paperclip Game
// @author       Ryan Keller
// @require      http://code.jquery.com/jquery-latest.min.js
// @match        *://*/paperclips/index2.html
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
/* jshint esnext: false */
/* jshint esversion: 6 */
/* jshint asi: true */
/* global console */

// Using callbacks to prevent stack overflow. Tickspeed determines the rate of execution.
(function () {
  class Bot {
    constructor(speed, operations) {
      this.speed = speed
      this.operations = {
        adjustPricePerDemand: true,
        makePaperclip: true,
        buyWire: true,
        buyMarketing: true,
        buyClipper: true,
      }
      this.state = {
        funds: 0,
        demand: 100,
        clipsPerSecond: 0,
        wire: 0,
        wireCost: 0,
        wireBuyer: false,
        clippers: 0,
        clipperCost: 0,
        marketing: 0,
        marketingCost: 0,
        trust: 0,
        operations: 0,
        creativity: 0,
      }
      this.selectors = {
        funds: '#funds',
        makePaperclip: '#btnMakePaperclip',
        demand: '#demand',
        unsoldClips: '#unsoldClips',
        lowerPrice: '#btnLowerPrice',
        raisePrice: '#btnRaisePrice',
        wire: '#wire',
        wireCost: '#wireCost',
        clippers: '#autoClipperDiv span',
        clipperCost: '#clipperCost',
        buyClipper: 'btnMakeClipper',
        buyWire: '#btnBuyWire',
        marketingCost: '#adCost',
        buyMarketing: '#btnExpandMarketing',
        buyComputePower: '#compDiv button',
        buyQuantumOps: '#btnQcompute'
      }
      this.standards = {
        clipsPerSecond: 60,
        demand: 100,
        budget: 0,
      }
    }
    static get(selector, currency = false) {
      const value = $(selector).text()
      return (!currency)
        ? Number.parseInt(value)
        : Number.parseInt(value.replace(',', ''))
    }
    static click (selector) {
      const button = $(selector)
      if (!button.disabled) button.click()
    }
    getState () {
      let state
      state.funds = get(this.selectors.funds, true)
      state.demand = get(this.selectors.demand)
      state.clipsPerSecond = get(this.selectors.clipsPerSecond)
      state.marketingCost = get(this.selectors.marketingCost, true)
      state.wire = get(this.selectors.wire)
      state.wireCost = get(this.selectors.wireCost, true)
      state.wireBuyer = get(this.selectors.wireBuyer)
      state.clippers = get(this.selectors.clippers)
      state.clipperCost = get(this.selectors.clipperCost, true)
      state.marketing = get(this.selectors.marketing)
      state.marketingCost = get(this.selectors.marketingCost, true)
      state.trust = get(this.selectors.trust)
      state.operations = get(this.selectors.operations)
      state.creativity = get(this.selectors.creativity)
      this.state = state
    }

    //  Adjust price so that you're always at 100% demand
    //  Isn't optimal for ROI, but is logically stable.
    adjustPricePerDemand() {
      const { demand } = this.state
        (demand < this.standards.demand)
        ? this.click(this.selectors.lowerPrice)
        : this.click(this.selectors.raisePrice)
    }

    //  Make paperclips manually if production isn't up to snuff
    makePaperclip () {
      const { clipsPerSecond } = this.state
      (clipsPerSecond < this.standards.clipsPerSecond)
        ? this.click(this.selectors.makePaperclip)
        : this.operations.makePaperclip = false
    }

    //  Buy wire if necessary. Should always be ready to buy this. Disable if autobuyer purchased.
    buyWire () {
      const { funds, wire, wireCost, wireBuyer }
      if (!wireBuyer) {
        (funds > wireCost)
          ? (wire <= 0) && click(this.selectors.buyWire)
          : this.standards.budget = wireCost
      } else {
        this.operations.buyWire = false
      }
    }

    //  Buy clippers if they're affordable, budget if not
    buyClipper () {
      const { funds, clipperCost } = this.state
        (funds > clipperCost)
        ? click(this.selectors.buyClipper)
        : this.standards.budget = clipperCost
    }

    //  Buy marketing if affordable. Set aside a budget if not.
    //  NOTE: Eventually clippers will be more expensive than marketing
    buyMarketing () {
      const { funds, marketingCost } = this.state
      (funds > marketingCost)
        ? click(this.selectors.buyMarketing)
        : this.standards.budget = marketingCost
    }

    loop () {
      function recursion () {
        const { makePaperclip, adjustPricePerDemand, buyWire, buyClipper, buyMarketing } = this.operations
        this.adjustPricePerDemand()
        //  Priorities: Wire (to produce), clippers (max out production), marketing (max ROI)
        if (buyWire) this.buyWire()
        if (buyClipper) this.buyClipper()
        if (buyMarketing) this.buyWire()
        //  Generate product
        if (makePaperclip) this.makePaperclip()
        setTimeout(() => recursion(), this.speed)
      }
      return recursion()
  }

})()
