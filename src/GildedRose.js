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
  return items.map(item => {
    const sellIn = checkSellIn(item);
    const quality = checkQuality(item, sellIn);

    return { ...item, quality, sellIn };
  });
};

const checkSellIn = (item) => {
  return checkItemIsSulfuras(item.name) ? 0 : item.sellIn - 1;
};

const checkQuality = (item, sellIn) => {
  let quality;
  if (checkItemIsBrieOrBackstagePasses(item.name)) {
    quality = checkBrieOrBackstageQuality(item, sellIn)
  } else if (checkItemIsSulfuras(item.name)) {
    quality = item.quality;
  } else if (item.quality === 0) {
    quality = 0;
  } else if (sellIn > 0) {
    quality = item.quality - 1;
  } else {
    quality = item.quality - 2;
  }
  return quality
};

const checkItemIsBrieOrBackstagePasses = (itemName)=> itemName === 'Aged Brie' || itemName.includes('Backstage passes')
const checkItemIsSulfuras = (itemName)=>itemName.includes('Sulfuras')

const checkBrieOrBackstageQuality = (item, sellIn)=>{
const quality = sellIn <= 0
  ? 0
  : sellIn <= 5
  ? item.quality + 3
  : sellIn <= 10
  ? item.quality + 2
  : item.quality + 1;

  return quality >= 50 ? 50: quality
}

export default GildedRose;
