const GildedRose = {
  updateQuality: items => items.map(_updateOneItem),
}

export default GildedRose

function _updateOneItem(item) {
  const { name, sellIn, quality } = item

  const sellInIsOut = sellIn <= 0
  const sellInOutFactor = sellInIsOut ? 2 : 1
  const ageFactor = sellIn <= 5 ? 3 : sellIn <= 10 ? 2 : 1

  const sellInNextValue = sellIn - 1

  var [sellInUpdate, qualityUpdate ] = {
    "+5 Dexterity Vest": [
      sellInNextValue,
      quality-1*sellInOutFactor,
    ],
    "Conjured Mana Cake": [
      sellInNextValue,
      quality-1*sellInOutFactor,
    ],
    "Aged Brie": [
      sellInNextValue,
      sellInIsOut ? 0 : quality+1*ageFactor,
    ],
    "Backstage passes to a TAFKAL80ETC concert": [
      sellInNextValue,
      sellInIsOut ? 0 : quality+1*ageFactor,
    ],
    "Sulfuras, Hand of Ragnaros": [
      0,
      80,
    ],
  }[item.name]

  // START: quality normalization -------------------
  // - quality must be between 0 and 50
  // - "Sulfuras" allways will be 80
  if (item.name === "Sulfuras, Hand of Ragnaros") qualityUpdate = 80
  else if (qualityUpdate < 0) qualityUpdate = 0
  else if (qualityUpdate > 50) qualityUpdate = 50
  // END: quality normalization ---------------------

  return {
    ...item,
    sellIn: sellInUpdate,
    quality: qualityUpdate,
  }
}
