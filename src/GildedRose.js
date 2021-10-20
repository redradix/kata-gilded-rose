import Item from './Item';
 
const GildedRose = function GildedRose() {
 const items = [];
 items.push(new Item('+5 Dexterity Vest', 10, 20));
 items.push(new Item('Aged Brie', 2, 0));
 items.push(new Item('Elixir of the Mongoose', 5, 7));
 items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
 items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
 items.push(new Item('Conjured Mana Cake', 3, 6));
 GildedRose.updateQuality(items);
};
 
function updateItemQuality(item) {
 // Prevent modifying Sulfuras
 if (item.name !== 'Sulfuras, Hand of Ragnaros') {
   // Decrease sellIn
   item.sellIn -= 1;
   // Set regular quality modifier to -1
   let qualityModifier = -1;
   if (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') {
     /*
       Aged Brie and Backstage quality behaviour:
         - increases by 1 as sellIn decreases
         - increases by 2 when there are 10 days or less
         - increases by 3 when there are 5 days or less
         - drops to 0 when sellIn is less than 0
     */
     qualityModifier = 1;
     if (item.sellIn < 11) {
       qualityModifier += 1;
     }
     if (item.sellIn < 6) {
       qualityModifier += 1;
     }
     if (item.sellIn < 0) {
       qualityModifier = item.quality * -1;
     }
   } else {
     // The quality of the rest of items degrades twice as fast once the sell date has passed
     if (item.sellIn < 0) {
       qualityModifier *= 2;
     }
     // Conjured quality degrades twice as fast as normal items
     if (item.name === 'Conjured Mana Cake') {
       qualityModifier *= 2;
     }
   }
   // Apply quality modifier
   item.quality += qualityModifier;
   // Prevent quality being less than 0 of greater than 50
   if (item.quality < 0) {
     item.quality = 0;
   } else if (item.quality > 50) {
     item.quality = 50;
   }
 }
}
 
GildedRose.updateQuality = function updateQuality(items) {
 items.forEach(updateItemQuality);
};
 
export default GildedRose;
