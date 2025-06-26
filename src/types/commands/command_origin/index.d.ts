declare module "command-origin" {
    export type CommandOriginPlayer = 0;
    export type CommandOriginCommandBlock = 1;
    export type CommandOriginMinecartCommandBlock = 2;
    export type CommandOriginDevConsole = 3;
    export type CommandOriginTest = 4;
    export type CommandOriginAutomationPlayer = 5;
    export type CommandOriginClientAutomation = 6;
    export type CommandOriginDedicatedServer = 7;
    export type CommandOriginEntity = 8;
    export type CommandOriginVirtual = 9;
    export type CommandOriginGameArgument = 10;
    export type CommandOriginEntityServer = 11;
    export type CommandOriginPrecompiled = 12;
    export type CommandOriginGameDirectorEntityServer = 13;
    export type CommandOriginScripting = 14;
    export type CommandOriginExecuteContext = 15;

    export type CommandOriginTypeEnum =
        | CommandOriginPlayer
        | CommandOriginCommandBlock
        | CommandOriginMinecartCommandBlock
        | CommandOriginDevConsole
        | CommandOriginTest
        | CommandOriginAutomationPlayer
        | CommandOriginClientAutomation
        | CommandOriginDedicatedServer
        | CommandOriginEntity
        | CommandOriginVirtual
        | CommandOriginGameArgument
        | CommandOriginEntityServer
        | CommandOriginPrecompiled
        | CommandOriginGameDirectorEntityServer
        | CommandOriginScripting
        | CommandOriginExecuteContext;

    export type CommandOriginData = {
        type: CommandOriginTypeEnum;
        uuid: string;
        request_id: string;
    };
}
