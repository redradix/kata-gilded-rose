import Item from './Item'

const AGED_BRIE = "Aged Brie"
const VEST = "+5 Dexterity Vest"
const ELIXIR = "Elixir of the Mongoose"
const SULFURAS = "Sulfuras, Hand of Ragnaros"
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert"
const CONJURED = "Conjured Mana Cake"

const GildedRose = function () {
  var items = []
  items.push(new Item(VEST, 10, 20))
  items.push(new Item(AGED_BRIE, 2, 0))
  items.push(new Item(ELIXIR, 5, 7))
  items.push(new Item(SULFURAS, 0, 80))
  items.push(new Item(BACKSTAGE, 15, 20))
  items.push(new Item(CONJURED, 3, 6))
  GildedRose.updateQuality(items)
}

const updateConjured = item => {
  let { quality, sellIn, name } = item

  if (quality > 0) {
    quality = quality - 1
  }

  if (quality > 50) {
    quality = 50
  }

  sellIn = sellIn - 1

  if (sellIn < 0 && quality > 0) {
    quality = quality - 1
  }

  return { name, quality, sellIn }
}

const updateStandard = item => {
  let { quality, sellIn, name } = item

  if (quality < 50) {
    quality = quality + 1

    if (sellIn < 6) {
      quality = quality + 1
    }
    if (sellIn < 11) {
      quality = quality + 1
    }
  }

  if (quality > 50) {
    quality = 50
  }

  sellIn = sellIn - 1

  if (sellIn < 0) {
    quality = 0
  }

  return { name, quality, sellIn }
}

const updateLegendary = item => item
  
const MAP = {
  [SULFURAS]: updateLegendary,
  [ELIXIR]: updateConjured,
  [VEST]: updateConjured,
  [CONJURED]: updateConjured,
  [AGED_BRIE]: updateStandard,
  [BACKSTAGE]: updateStandard,
}

GildedRose.updateQuality = function (items) {
  return items.map(item => MAP[item.name](item))
};

export default GildedRose