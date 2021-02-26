import Item from './Item'

const GildedRose = function () {
  var items = []
  items.push(new Item("+5 Dexterity Vest", 10, 20))
  items.push(new Item("Aged Brie", 2, 0))
  items.push(new Item("Elixir of the Mongoose", 5, 7))
  items.push(new Item(SULFURAS, 0, 80))
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20))
  items.push(new Item("Conjured Mana Cake", 3, 6))
  GildedRose.updateQuality(items)
}

const SULFURAS = "Sulfuras, Hand of Ragnaros"

GildedRose.updateQuality = function (items) {
  for (var i = 0; i < items.length; i++) {
    const item = items[i]
    if ("Aged Brie" !== item.name && "Backstage passes to a TAFKAL80ETC concert" !== item.name) {
      //TODO: Improve this code.
      if (item.quality > 0) {
        if (SULFURAS !== item.name) {
          item.quality--
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality++
        if ("Aged Brie" === item.name) {
            if (item.sellIn < 6) {
              item.quality++
            }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if ("Aged Brie" === item.name) {
            if (item.sellIn < 11) {
              item.quality++
            }
        }
        if ("Backstage passes to a TAFKAL80ETC concert" === item.name) {
          if (item.sellIn < 11) {
            // See revision number 2394 on SVN.
            if (item.quality < 50) {
              item.quality++
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality++
            }
          }
        }
      }
    }
    if (SULFURAS !== item.name) {
      item.sellIn = item.sellIn - 1
    }
    if (item.sellIn < 0) {
      if ("Aged Brie" !== item.name) {
        if ("Backstage passes to a TAFKAL80ETC concert" !== item.name) {
          if (item.quality > 0) {
            if (SULFURAS !== item.name) {
              item.quality--
            }
          }
        } else {
          //TODO: Fix this.
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality++
        }
        if ("Aged Brie" === item.name && item.sellIn <= 0)
            item.quality = 0
      } // of for.
    }
    if (SULFURAS !== item.name)
      if (item.quality > 50) item.quality = 50
  }
  return items
};

export default GildedRose
