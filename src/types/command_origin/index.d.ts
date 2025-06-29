type CommandOriginPlayer = 0;
type CommandOriginCommandBlock = 1;
type CommandOriginMinecartCommandBlock = 2;
type CommandOriginDevConsole = 3;
type CommandOriginTest = 4;
type CommandOriginAutomationPlayer = 5;
type CommandOriginClientAutomation = 6;
type CommandOriginDedicatedServer = 7;
type CommandOriginEntity = 8;
type CommandOriginVirtual = 9;
type CommandOriginGameArgument = 10;
type CommandOriginEntityServer = 11;
type CommandOriginPrecompiled = 12;
type CommandOriginGameDirectorEntityServer = 13;
type CommandOriginScripting = 14;
type CommandOriginExecuteContext = 15;

type CommandOriginTypeEnum =
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

type CommandOriginData = {
    type: CommandOriginTypeEnum;
    uuid: string;
    request_id: string;
};
