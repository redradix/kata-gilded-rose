import Item from "./Item";

const GildedRose = () => {
  const items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

const isDesgradedItem = (itemName) =>
  itemName.toLowerCase().includes("conjured");

const isIncreasedQualityItem = (itemName) =>
  itemName.toLowerCase().includes("aged brie") ||
  itemName.toLowerCase().includes("backstage passes");

const isLegendaryItem = (itemName) =>
  itemName.toLowerCase().includes("sulfuras");

GildedRose.updateQuality = function (items) {
  for (let i = 0; i < items.length; i++) {
    if (isIncreasedQualityItem(items[i].name)) {
      treatIncreasedQualityItems(items, i);
    } else {
      //TODO: Improve this code.
      if (items[i].quality > 0) {
        if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
          items[i].quality = items[i].quality - 1;
        }
      }
    }
    if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
      items[i].sellIn = items[i].sellIn - 1;
      if (items[i].quality > 50) items[i].quality = 50;
    }
    if (items[i].sellIn < 0) {
      if ("Aged Brie" != items[i].name) {
        if ("Backstage passes to a TAFKAL80ETC concert" != items[i].name) {
          if (items[i].quality > 0) {
            if ("Sulfuras, Hand of Ragnaros" != items[i].name) {
              items[i].quality = items[i].quality - 1;
            }
          }
        } else {
          //TODO: Fix this.
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
        if ("Aged Brie" == items[i].name && items[i].sellIn <= 0)
          items[i].quality = 0;
      }
    }
  }
  return items;
};

const treatIncreasedQualityItems = (items, i) => {
  if (items[i].quality < 50) {
    items[i].quality = items[i].quality + 1;

    if (items[i].sellIn < 11) {
      items[i].quality = items[i].quality + 1;
    }

    if (items[i].sellIn < 6) {
      items[i].quality = items[i].quality + 1;
    }
  }
  return items;
};

export default GildedRose;
