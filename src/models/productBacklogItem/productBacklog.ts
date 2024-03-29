import { ProductBacklogItem } from "./productBacklogItem";

export class ProductBacklog {
    private productBacklogItems: ProductBacklogItem[]

    public constructor(productBacklogItems: ProductBacklogItem[]) {
        this.productBacklogItems = []
    }

    public addItemToProductBacklog(item: ProductBacklogItem): void {
        this.productBacklogItems.push(item);
    }

    //Sorts on story points from big to small :)
    public getProductBacklogItems(): ProductBacklogItem[] {
		return this.productBacklogItems.sort((a, b) => b.storyPoints - a.storyPoints);
	}
}