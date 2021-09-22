import { IEquals, IUnique, IPrioritizeable } from "./interfaces";

export class RankedBasedQueueElement<T> implements IUnique, IPrioritizeable, IEquals<RankedBasedQueueElement<T>> {
    key: string;
    priority: number;
    data: T;

    constructor(key: string, priority: number, data: T) {
        this.key = key;
        this.priority = priority;
        this.data = data;
    }

    getUniqueKey(): string {
        return this.key;
    }

    equals(value: RankedBasedQueueElement<T>): boolean {
        return this.getUniqueKey() === value.getUniqueKey();
    }

    getPriority(): number {
        return this.priority;
    }

    setPriority(value: number) {
        this.priority = value
    }

    increasePriority(): number {
        return this.priority++;
    }

    decreasePriority(): number {
        return this.priority--;
    }

    toString(): string {
        return `${this.key} - ${this.priority}`
    }
}