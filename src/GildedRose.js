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

const isIncreasedQualityItem = (itemName) =>
  itemName.toLowerCase().includes("aged brie") ||
  itemName.toLowerCase().includes("backstage passes");

GildedRose.updateQuality = function (items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].quality < 50) {
      items[i].sellIn = items[i].sellIn - 1;
      if (isIncreasedQualityItem(items[i].name)) {
        treatIncreasedQualityItems(items, i);
      } else {
        treatNormalItems(items, i);
      }
    }
  }
  return items;
};

const treatIncreasedQualityItems = (items, i) => {
  items[i].quality = items[i].quality + 1;

  if (items[i].sellIn < 11) {
    items[i].quality = items[i].quality + 1;
  }

  if (items[i].sellIn < 6) {
    items[i].quality = items[i].quality + 1;
  }

  if (items[i].sellIn <= 0) {
    items[i].quality = 0;
  }

  if (items[i].quality > 50) items[i].quality = 50;

  return items;
};

const treatNormalItems = (items, i) => {
  if (items[i].quality > 0) {
    items[i].quality = items[i].quality - 1;
    if (items[i].sellIn < 0) {
      items[i].quality = items[i].quality - 1;
    }
  }

  return items;
};

export default GildedRose;
