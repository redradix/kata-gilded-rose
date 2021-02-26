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
  return items.map(({ name, quality, sellIn }) => {
    const isBrie = BRIE === name;
    const isSulfuras = SULFURAS === name;
    const isBackstage = BACKSTAGE_PASSES === name;
    const isStandard = isBrie || isBackstage || isSulfuras;

    if (!isStandard) {
      quality--;
    } else if (quality < MAX_QUALITY) {
      quality++;

      if (isBackstage || isBrie) {
        if (sellIn <= 10) {
          quality++;
        }

        if (sellIn <= 5) {
          quality++;
        }
      }
    }

    if (!isSulfuras && quality > MAX_QUALITY) {
      quality = MAX_QUALITY;
    }

    if (!isSulfuras) {
      sellIn--;
    }

    if (sellIn < 0) {
      if (isStandard) {
        quality = 0;
      } else {
        quality--;
      }
    }

    if (quality < 0) {
      quality = 0;
    }

    return {
      name,
      quality,
      sellIn,
    }
  });
};

export default GildedRose;
