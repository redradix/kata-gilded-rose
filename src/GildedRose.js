import Item from "./Item";

const GildedRose = function () {
  var items = [];
  items.push(new Item(VEST, 10, 20));
  items.push(new Item(BRIE, 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item(SULFURAS, 0, 80));
  items.push(new Item(BACKSTAGE, 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const BRIE = "Aged Brie";
const VEST = "+5 Dexterity Vest";
const MAX_QUALITY = 50

GildedRose.updateQuality = function (items) {

  const increaseQuality = (days, isBrie, item) => {
    if (isBrie && item.sellIn < days) {
      item.quality++;
    }
  };

  for (var i = 0; i < items.length; i++) {
    const item = items[i];
    const isBrie = BRIE === item.name

    if (!isBrie && BACKSTAGE !== item.name) {
      //TODO: Improve this code.
      if (item.quality && SULFURAS !== item.name) {
        item.quality--;
      }
    } else {
      if (item.quality < MAX_QUALITY) {
        item.quality++;
        increaseQuality(6, isBrie, item);
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        increaseQuality(11, isBrie, item);
        if (BACKSTAGE === item.name) {
          if (item.sellIn < 11) {
            // See revision number 2394 on SVN.
            if (item.quality < MAX_QUALITY) {
              item.quality++;
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (item.sellIn < 6 && item.quality < MAX_QUALITY) {
            item.quality++;
          }
        }
      }
    }
    if (SULFURAS !== item.name) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (!isBrie) {
        if (BACKSTAGE !== item.name) {
          if (item.quality && SULFURAS !== item.name) {
            item.quality--;
          }
        } else {
          //TODO: Fix this.
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < MAX_QUALITY) {
          item.quality++;
        }
        if (isBrie && item.sellIn <= 0) item.quality = 0;
      } // of for.
    }
    if (SULFURAS !== item.name) if (item.quality > MAX_QUALITY) item.quality = MAX_QUALITY;
  }
  return items;
};

export default GildedRose;
