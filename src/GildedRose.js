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
    if (items[i].quality <= 50) {
      items[i].sellIn = items[i].sellIn - 1;
      isIncreasedQualityItem(items[i].name)
        ? treatIncreasedQualityItems(items[i])
        : treatNormalItems(items[i]);
    }
  }
  return items;
};

const treatIncreasedQualityItems = (item) => {
  item.quality = item.quality + 1;

  if (item.sellIn < 11) {
    item.quality = item.quality + 1;
  }

  if (item.sellIn < 6) {
    item.quality = item.quality + 1;
  }

  if (item.sellIn <= 0) {
    item.quality = 0;
  }

  if (item.quality > 50) item.quality = 50;

  return item;
};

const treatNormalItems = (item) => {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
    if (item.sellIn < 0) {
      item.quality = item.quality - 1;
    }
  }

  return item;
};

export default GildedRose;
