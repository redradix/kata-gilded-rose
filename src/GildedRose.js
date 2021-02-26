import Item from "./Item";

const GildedRose = function () {
  var items = [
    new Item(VEST, 10, 20),
    new Item(BRIE, 2, 0),
    new Item(ELIXIR, 5, 7),
    new Item(SULFURAS, 0, 80),
    new Item(BACKSTAGE_PASSES, 15, 20),
    new Item(MANA_CAKE, 3, 6),
  ];

  GildedRose.updateQuality(items);
};

const VEST = "+5 Dexterity Vest";
const BRIE = "Aged Brie";
const ELIXIR = "Elixir of the Mongoose";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const MANA_CAKE = "Conjured Mana Cake";

const MAX_QUALITY = 50;

GildedRose.updateQuality = function (items) {
  for (var i = 0; i < items.length; i++) {
    const item = items[i];
    const isBrie = BRIE === item.name;
    const isSulfuras = SULFURAS === item.name;
    const isBackstage = BACKSTAGE_PASSES === item.name;

    const increaseQuality = (days) => {
      if (isBrie && item.sellIn < days) {
        item.quality++;
      }
    };

    if (!isBrie && !isBackstage) {
      //TODO: Improve this code.
      if (item.quality && !isSulfuras) {
        item.quality--;
      }
    } else {
      if (item.quality < MAX_QUALITY) {
        item.quality++;
        increaseQuality(6);
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        increaseQuality(11);
        if (isBackstage) {
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
    if (!isSulfuras) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (!isBrie) {
        if (!isBackstage) {
          if (item.quality && !isSulfuras) {
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
    if (!isSulfuras && item.quality > MAX_QUALITY) {
      item.quality = MAX_QUALITY;
    }
  }
  return items;
};

export default GildedRose;
