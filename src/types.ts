export interface IApp {
    name: string;

    insert(element: IContainer | string | undefined): void;
    detatch(): void;
}

export interface IContainer {
    register(app: IApp): void;
    deregister(): void;
}
