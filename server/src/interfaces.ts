
export interface IEquals<T extends IUnique> {
    equals(value: T): boolean;
}

export interface IUnique {
    getUniqueKey(): string;
}

export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T;
    list(): Array<T>;
    increaseElementPriority(item: T): number;
    decreaseElementPriority(item: T): number;
    size(): number;
}

export interface IPrioritizeable {
    getPriority(): number;
    increasePriority(): number;
    decreasePriority(): number;
}

export interface IEquals<T extends IUnique> {
    equals(value: T): boolean;
}