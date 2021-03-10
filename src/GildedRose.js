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

GildedRose.updateQuality = function (items) {
  for (var i = 0; i < items.length; i++) {
    const item = items[i]
    if (AGED_BRIE !== item.name && BACKSTAGE !== item.name && item.quality > 0 && SULFURAS !== item.name) {
      item.quality = item.quality - 1
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
        if (AGED_BRIE === item.name && item.sellIn < 6) {
          item.quality = item.quality + 1
        }
        if (AGED_BRIE === item.name && item.sellIn < 11) {
          item.quality = item.quality + 1
        }
        if (BACKSTAGE === item.name) {
          if (item.sellIn < 11 && item.quality < 50) {
            item.quality = item.quality + 1
          }
          if (item.sellIn < 6 && item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    }
    if (SULFURAS !== item.name) {
      item.sellIn = item.sellIn - 1
    }
    if (item.sellIn < 0) {
      if (AGED_BRIE !== item.name) {
        if (BACKSTAGE !== item.name && item.quality > 0 && SULFURAS !== item.name) {
          item.quality = item.quality - 1
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
        if (AGED_BRIE === item.name && item.sellIn <= 0) {
          item.quality = 0
        }
      }
    }
    if (SULFURAS !== item.name && item.quality > 50) {
      item.quality = 50
    }
  }
  return items
};

export default GildedRose