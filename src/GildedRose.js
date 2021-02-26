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
  return items.map(item => {
    let { name, quality, sellIn } = item
    const isDegradable = BACKSTAGE_PASSES === name || BRIE === name;
    const isLegendary = SULFURAS === name

    if (isLegendary) return item

    sellIn--;

    if (!isDegradable) {
      quality--;
    }

    if (isDegradable && quality < MAX_QUALITY) {
      quality++;

      if (sellIn <= 10) {
        quality++;
      }

      if (sellIn <= 5) {
        quality++;
      }
    }

    if (quality > MAX_QUALITY) {
      quality = MAX_QUALITY;
    }

    if (sellIn < 0 && isDegradable) {
      quality = 0;
    }
    if (sellIn < 0 && !isDegradable) {
      quality--;
    }

    return {
      name,
      quality,
      sellIn,
    }
  });
};

export default GildedRose;
