import { IQueue } from "./interfaces";
import { RankedBasedQueueElement } from "./RankedBasedQueueElement";

export class RankedBasedQueue<T> implements IQueue<RankedBasedQueueElement<T>> {
    private data: Map<string, RankedBasedQueueElement<T>>;

    constructor() {
        this.data = new Map<string, RankedBasedQueueElement<T>>();
    }

    //Complexity: O(1) - O(2)
    enqueue(item: RankedBasedQueueElement<T>) {
        if (this.data.has(item.getUniqueKey())) {
            let element = this.data.get(item.getUniqueKey());
            if (element) {
                let value = element.increasePriority();
                this.data.set(item.getUniqueKey(), item)
                return value;
            }
        } else {
            this.data.set(item.getUniqueKey(), item);
        }
    }

    //Complexity: O(n)
    dequeue(): RankedBasedQueueElement<T> {
        if (this.data.size === 0) {
            throw new Error("The queue is empty.")
        } else if (this.data.size === 1) {
            let element = [...this.data.values()][0]
            this.data.delete(element.getUniqueKey())
            return element;
        } else {
            let element: RankedBasedQueueElement<T> = [...this.data.values()][0];
            for (let item of this.data.values()) {
                if (element && item.getPriority() > element.getPriority()) {
                    element = item;
                }
            }
            this.data.delete(element.getUniqueKey());
            return element;
        }
    }

    //Complexity: O(n)
    list(): Array<RankedBasedQueueElement<T>> {
        if (this.data.size === 0) {
            throw new Error("The queue is empty.")
        } else if (this.data.size === 1) {
            return [...this.data.values()];
        } else {
            let sortedData = [...this.data.values()].sort((a, b) => {
                if (a.getPriority() > b.getPriority()) {
                    return 1;
                } else if (a.getPriority() < b.getPriority()) {
                    return -1;
                } else {
                    return 0;
                }
            });
            return sortedData.reverse();
        }
    }

    hasElement(key: string): boolean {
        return this.data.has(key);
    }

    getElement(key: string): RankedBasedQueueElement<T> {
        let element = this.data.get(key);
        if (element) return element;
        else throw Error("Unable to find element");
    }

    //Complexity: O(2)
    increaseElementPriority(item: RankedBasedQueueElement<T>): number {
        let element = this.data.get(item.getUniqueKey());
        if (element) {
            let value = element.increasePriority();
            this.data.set(item.getUniqueKey(), element)
            return value;
        } else {
            throw new Error("The element does not exist in the queue.");
        }
    }

    //Complexity: O(2)
    decreaseElementPriority(item: RankedBasedQueueElement<T>): number {
        let element = this.data.get(item.getUniqueKey());
        if (element) {
            let value = element.decreasePriority();
            this.data.set(item.getUniqueKey(), element)
            return value;
        } else {
            throw new Error("The element does not exist in the queue.");
        }
    }

    size(): number {
        return this.data.size;
    }
}