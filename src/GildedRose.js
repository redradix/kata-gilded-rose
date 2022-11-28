import Item from "./Item";

const GildedRose = function () {
  let items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

GildedRose.updateQuality = function (items) {
  const newItems = items.map((item, index) => {
    const sellIn = item.name.includes("Sulfuras") ? 0 : item.sellIn - 1;
    let quality;

    if (item.name === "Aged Brie" || item.name.includes("Backstage passes")) {
      quality =
        sellIn <= 0
          ? 0
          : sellIn <= 5
          ? item.quality + 3
          : sellIn <= 10
          ? item.quality + 2
          : item.quality + 1;
      quality = quality >= 50 ? 50 : quality;
    } else if (item.name.includes("Sulfuras")) {
      quality = item.quality;
    } else if (item.quality === 0) {
      quality = 0;
    } else if (sellIn > 0) {
      quality = item.quality - 1;
    } else {
      quality = item.quality - 2;
    }

    return { ...item, quality, sellIn };
  });

  return newItems;
};

export default GildedRose;
