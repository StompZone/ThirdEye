type KeepAlivePacketId = 0;
type LoginPacketId = 1;
type PlayStatusPacketId = 2;
type ServerToClientHandshakePacketId = 3;
type ClientToServerHandshakePacketId = 4;
type DisconnectPacketId = 5;
type ResourcePacksInfoPacketId = 6;
type ResourcePackStackPacketId = 7;
type ResourcePackClientResponsePacketId = 8;
type TextPacketId = 9;
type SetTimePacketId = 10;
type StartGamePacketId = 11;
type AddPlayerPacketId = 12;
type AddActorPacketId = 13;
type RemoveActorPacketId = 14;
type AddItemActorPacketId = 15;
type ServerPlayerPostMovePositionPacketId = 16;
type TakeItemActorPacketId = 17;
type MoveAbsoluteActorPacketId = 18;
type MovePlayerPacketId = 19;
type PassengerJump_DeprecatedPacketId = 20;
type UpdateBlockPacketId = 21;
type AddPaintingPacketId = 22;
type TickSync_deprecatedPacketId = 23;
type LevelSoundEventV1_DEPRECATEDPacketId = 24;
type LevelEventPacketId = 25;
type TileEventPacketId = 26;
type ActorEventPacketId = 27;
type MobEffectPacketId = 28;
type UpdateAttributesPacketId = 29;
type InventoryTransactionPacketId = 30;
type PlayerEquipmentPacketId = 31;
type MobArmorEquipmentPacketId = 32;
type InteractPacketId = 33;
type BlockPickRequestPacketId = 34;
type ActorPickRequestPacketId = 35;
type PlayerActionPacketId = 36;
type ActorFall_deprecatedPacketId = 37;
type HurtArmorPacketId = 38;
type SetActorDataPacketId = 39;
type SetActorMotionPacketId = 40;
type SetActorLinkPacketId = 41;
type SetHealthPacketId = 42;
type SetSpawnPositionPacketId = 43;
type AnimatePacketId = 44;
type RespawnPacketId = 45;
type ContainerOpenPacketId = 46;
type ContainerClosePacketId = 47;
type PlayerHotbarPacketId = 48;
type InventoryContentPacketId = 49;
type InventorySlotPacketId = 50;
type ContainerSetDataPacketId = 51;
type CraftingDataPacketId = 52;
type CraftingEvent_DeprecatedPacketId = 53;
type GuiDataPickItemPacketId = 54;
type AdventureSettings_DeprecatedPacketId = 55;
type BlockActorDataPacketId = 56;
type PlayerInput_DeprecatedPacketId = 57;
type FullChunkDataPacketId = 58;
type SetCommandsEnabledPacketId = 59;
type SetDifficultyPacketId = 60;
type ChangeDimensionPacketId = 61;
type SetPlayerGameTypePacketId = 62;
type PlayerListPacketId = 63;
type SimpleEventPacketId = 64;
type LegacyTelemetryEventPacketId = 65;
type SpawnExperienceOrbPacketId = 66;
type MapDataPacketId = 67;
type MapInfoRequestPacketId = 68;
type RequestChunkRadiusPacketId = 69;
type ChunkRadiusUpdatedPacketId = 70;
type ItemFrameDropItem_DeprecatedPacketId = 71;
type GameRulesChangedPacketId = 72;
type CameraPacketId = 73;
type BossEventPacketId = 74;
type ShowCreditsPacketId = 75;
type AvailableCommandsPacketId = 76;
type CommandRequestPacketId = 77;
type CommandBlockUpdatePacketId = 78;
type CommandOutputPacketId = 79;
type UpdateTradePacketId = 80;
type UpdateEquipPacketId = 81;
type ResourcePackDataInfoPacketId = 82;
type ResourcePackChunkDataPacketId = 83;
type ResourcePackChunkRequestPacketId = 84;
type TransferPacketId = 85;
type PlaySoundPacketId = 86;
type StopSoundPacketId = 87;
type SetTitlePacketId = 88;
type AddBehaviorTreePacketId = 89;
type StructureBlockUpdatePacketId = 90;
type ShowStoreOfferPacketId = 91;
type PurchaseReceiptPacketId = 92;
type PlayerSkinPacketId = 93;
type SubclientLoginPacketId = 94;
type AutomationClientConnectPacketId = 95;
type SetLastHurtByPacketId = 96;
type BookEditPacketId = 97;
type NPCRequestPacketId = 98;
type PhotoTransferPacketId = 99;
type ShowModalFormPacketId = 100;
type ModalFormResponsePacketId = 101;
type ServerSettingsRequestPacketId = 102;
type ServerSettingsResponsePacketId = 103;
type ShowProfilePacketId = 104;
type SetDefaultGameTypePacketId = 105;
type RemoveObjectivePacketId = 106;
type SetDisplayObjectivePacketId = 107;
type SetScorePacketId = 108;
type LabTablePacketId = 109;
type UpdateBlockSyncedPacketId = 110;
type MoveDeltaActorPacketId = 111;
type SetScoreboardIdentityPacketId = 112;
type SetLocalPlayerAsInitPacketId = 113;
type UpdateSoftEnumPacketId = 114;
type PingPacketId = 115;
type BlockPalette_deprecatedPacketId = 116;
type ScriptCustomEventPacketId = 117;
type SpawnParticleEffectPacketId = 118;
type AvailableActorIDListPacketId = 119;
type LevelSoundEventV2_DEPRECATEDPacketId = 120;
type NetworkChunkPublisherUpdatePacketId = 121;
type BiomeDefinitionListPacketId = 122;
type LevelSoundEventPacketId = 123;
type LevelEventGenericPacketId = 124;
type LecternUpdatePacketId = 125;
type VideoStreamConnect_DEPRECATEDPacketId = 126;
type AddEntity_DEPRECATEDPacketId = 127;
type RemoveEntity_DEPRECATEDPacketId = 128;
type ClientCacheStatusPacketId = 129;
type OnScreenTextureAnimationPacketId = 130;
type MapCreateLockedCopyPacketId = 131;
type StructureTemplateDataExportRequestPacketId = 132;
type StructureTemplateDataExportResponsePacketId = 133;
type UNUSED_PLS_USE_MEPacketId = 134;
type ClientCacheBlobStatusPacketId = 135;
type ClientCacheMissResponsePacketId = 136;
type EducationSettingsPacketId = 137;
type EmotePacketId = 138;
type MultiplayerSettingsPacketId = 139;
type SettingsCommandPacketId = 140;
type AnvilDamagePacketId = 141;
type CompletedUsingItemPacketId = 142;
type NetworkSettingsPacketId = 143;
type PlayerAuthInputPacketId = 144;
type CreativeContentPacketId = 145;
type PlayerEnchantOptionsPacketId = 146;
type ItemStackRequestPacketId = 147;
type ItemStackResponsePacketId = 148;
type PlayerArmorDamagePacketId = 149;
type CodeBuilderPacketId = 150;
type UpdatePlayerGameTypePacketId = 151;
type EmoteListPacketId = 152;
type PositionTrackingDBServerBroadcastPacketId = 153;
type PositionTrackingDBClientRequestPacketId = 154;
type DebugInfoPacketId = 155;
type PacketViolationWarningPacketId = 156;
type MotionPredictionHintsPacketId = 157;
type TriggerAnimationPacketId = 158;
type CameraShakePacketId = 159;
type PlayerFogSettingPacketId = 160;
type CorrectPlayerMovePredictionPacketId = 161;
type ItemRegistryPacketId = 162;
type FilterTextPacket_DEPRECATEDPacketId = 163;
type ClientBoundDebugRendererPacketId = 164;
type SyncActorPropertyPacketId = 165;
type AddVolumeEntityPacketId = 166;
type RemoveVolumeEntityPacketId = 167;
type SimulationTypePacketId = 168;
type NpcDialoguePacketId = 169;
type EduUriResourcePacketId = 170;
type CreatePhotoPacketId = 171;
type UpdateSubChunkBlocksPacketId = 172;
type PhotoInfoRequest_DEPRECATEDPacketId = 173;
type SubChunkPacketId = 174;
type SubChunkRequestPacketId = 175;
type PlayerStartItemCooldownPacketId = 176;
type ScriptMessagePacketId = 177;
type CodeBuilderSourcePacketId = 178;
type TickingAreasLoadStatusPacketId = 179;
type DimensionDataPacketId = 180;
type AgentActionPacketId = 181;
type ChangeMobPropertyPacketId = 182;
type LessonProgressPacketId = 183;
type RequestAbilityPacketId = 184;
type RequestPermissionsPacketId = 185;
type ToastRequestPacketId = 186;
type UpdateAbilitiesPacketId = 187;
type UpdateAdventureSettingsPacketId = 188;
type DeathInfoPacketId = 189;
type EditorNetworkPacketId = 190;
type FeatureRegistryPacketId = 191;
type ServerStatsPacketId = 192;
type RequestNetworkSettingsPacketId = 193;
type GameTestRequestPacketId = 194;
type GameTestResultsPacketId = 195;
type PlayerClientInputPermissionsPacketId = 196;
type ClientCheatAbilityPacket_DeprecatedPacketId = 197;
type CameraPresetsPacketId = 198;
type UnlockedRecipesPacketId = 199;
type TitleSpecificPacketsStartPacketId = 200;
type TitleSpecificPacketsEndPacketId = 299;
type CameraInstructionPacketId = 300;
type CompressedBiomeDefinitionList_DEPRECATEDPacketId = 301;
type TrimDataPacketId = 302;
type OpenSignPacketId = 303;
type AgentAnimationPacketId = 304;
type RefreshEntitlementsPacketId = 305;
type PlayerToggleCrafterSlotRequestPacketId = 306;
type SetPlayerInventoryOptionsPacketId = 307;
type SetHudPacketId = 308;
type AwardAchievementPacketId = 309;
type ClientboundCloseScreenPacketId = 310;
type ClientboundLoadingScreenPacket_DeprecatedPacketId = 311;
type ServerboundLoadingScreenPacketId = 312;
type JigsawStructureDataPacketId = 313;
type CurrentStructureFeaturePacketId = 314;
type ServerboundDiagnosticsPacketId = 315;
type CameraAimAssistPacketId = 316;
type ContainerRegistryCleanupPacketId = 317;
type MovementEffectPacketId = 318;
type SetMovementAuthorityModePacketId = 319;
type CameraAimAssistPresetsPacketId = 320;
type ClientCameraAimAssistPacketId = 321;
type ClientMovementPredictionSyncPacketId = 322;
type UpdateClientOptionsPacketId = 323;
type PlayerVideoCapturePacketId = 324;
type PlayerUpdateEntityOverridesPacketId = 325;
type PlayerLocationPacketId = 326;
type ClientboundControlSchemeSetPacketId = 327;
type EndIdPacketId = 328;

type PacketIdEnum =
    | KeepAlivePacketId
    | LoginPacketId
    | PlayStatusPacketId
    | ServerToClientHandshakePacketId
    | ClientToServerHandshakePacketId
    | DisconnectPacketId
    | ResourcePacksInfoPacketId
    | ResourcePackStackPacketId
    | ResourcePackClientResponsePacketId
    | TextPacketId
    | SetTimePacketId
    | StartGamePacketId
    | AddPlayerPacketId
    | AddActorPacketId
    | RemoveActorPacketId
    | AddItemActorPacketId
    | ServerPlayerPostMovePositionPacketId
    | TakeItemActorPacketId
    | MoveAbsoluteActorPacketId
    | MovePlayerPacketId
    | PassengerJump_DeprecatedPacketId
    | UpdateBlockPacketId
    | AddPaintingPacketId
    | TickSync_deprecatedPacketId
    | LevelSoundEventV1_DEPRECATEDPacketId
    | LevelEventPacketId
    | TileEventPacketId
    | ActorEventPacketId
    | MobEffectPacketId
    | UpdateAttributesPacketId
    | InventoryTransactionPacketId
    | PlayerEquipmentPacketId
    | MobArmorEquipmentPacketId
    | InteractPacketId
    | BlockPickRequestPacketId
    | ActorPickRequestPacketId
    | PlayerActionPacketId
    | ActorFall_deprecatedPacketId
    | HurtArmorPacketId
    | SetActorDataPacketId
    | SetActorMotionPacketId
    | SetActorLinkPacketId
    | SetHealthPacketId
    | SetSpawnPositionPacketId
    | AnimatePacketId
    | RespawnPacketId
    | ContainerOpenPacketId
    | ContainerClosePacketId
    | PlayerHotbarPacketId
    | InventoryContentPacketId
    | InventorySlotPacketId
    | ContainerSetDataPacketId
    | CraftingDataPacketId
    | CraftingEvent_DeprecatedPacketId
    | GuiDataPickItemPacketId
    | AdventureSettings_DeprecatedPacketId
    | BlockActorDataPacketId
    | PlayerInput_DeprecatedPacketId
    | FullChunkDataPacketId
    | SetCommandsEnabledPacketId
    | SetDifficultyPacketId
    | ChangeDimensionPacketId
    | SetPlayerGameTypePacketId
    | PlayerListPacketId
    | SimpleEventPacketId
    | LegacyTelemetryEventPacketId
    | SpawnExperienceOrbPacketId
    | MapDataPacketId
    | MapInfoRequestPacketId
    | RequestChunkRadiusPacketId
    | ChunkRadiusUpdatedPacketId
    | ItemFrameDropItem_DeprecatedPacketId
    | GameRulesChangedPacketId
    | CameraPacketId
    | BossEventPacketId
    | ShowCreditsPacketId
    | AvailableCommandsPacketId
    | CommandRequestPacketId
    | CommandBlockUpdatePacketId
    | CommandOutputPacketId
    | UpdateTradePacketId
    | UpdateEquipPacketId
    | ResourcePackDataInfoPacketId
    | ResourcePackChunkDataPacketId
    | ResourcePackChunkRequestPacketId
    | TransferPacketId
    | PlaySoundPacketId
    | StopSoundPacketId
    | SetTitlePacketId
    | AddBehaviorTreePacketId
    | StructureBlockUpdatePacketId
    | ShowStoreOfferPacketId
    | PurchaseReceiptPacketId
    | PlayerSkinPacketId
    | SubclientLoginPacketId
    | AutomationClientConnectPacketId
    | SetLastHurtByPacketId
    | BookEditPacketId
    | NPCRequestPacketId
    | PhotoTransferPacketId
    | ShowModalFormPacketId
    | ModalFormResponsePacketId
    | ServerSettingsRequestPacketId
    | ServerSettingsResponsePacketId
    | ShowProfilePacketId
    | SetDefaultGameTypePacketId
    | RemoveObjectivePacketId
    | SetDisplayObjectivePacketId
    | SetScorePacketId
    | LabTablePacketId
    | UpdateBlockSyncedPacketId
    | MoveDeltaActorPacketId
    | SetScoreboardIdentityPacketId
    | SetLocalPlayerAsInitPacketId
    | UpdateSoftEnumPacketId
    | PingPacketId
    | BlockPalette_deprecatedPacketId
    | ScriptCustomEventPacketId
    | SpawnParticleEffectPacketId
    | AvailableActorIDListPacketId
    | LevelSoundEventV2_DEPRECATEDPacketId
    | NetworkChunkPublisherUpdatePacketId
    | BiomeDefinitionListPacketId
    | LevelSoundEventPacketId
    | LevelEventGenericPacketId
    | LecternUpdatePacketId
    | VideoStreamConnect_DEPRECATEDPacketId
    | AddEntity_DEPRECATEDPacketId
    | RemoveEntity_DEPRECATEDPacketId
    | ClientCacheStatusPacketId
    | OnScreenTextureAnimationPacketId
    | MapCreateLockedCopyPacketId
    | StructureTemplateDataExportRequestPacketId
    | StructureTemplateDataExportResponsePacketId
    | UNUSED_PLS_USE_MEPacketId
    | ClientCacheBlobStatusPacketId
    | ClientCacheMissResponsePacketId
    | EducationSettingsPacketId
    | EmotePacketId
    | MultiplayerSettingsPacketId
    | SettingsCommandPacketId
    | AnvilDamagePacketId
    | CompletedUsingItemPacketId
    | NetworkSettingsPacketId
    | PlayerAuthInputPacketId
    | CreativeContentPacketId
    | PlayerEnchantOptionsPacketId
    | ItemStackRequestPacketId
    | ItemStackResponsePacketId
    | PlayerArmorDamagePacketId
    | CodeBuilderPacketId
    | UpdatePlayerGameTypePacketId
    | EmoteListPacketId
    | PositionTrackingDBServerBroadcastPacketId
    | PositionTrackingDBClientRequestPacketId
    | DebugInfoPacketId
    | PacketViolationWarningPacketId
    | MotionPredictionHintsPacketId
    | TriggerAnimationPacketId
    | CameraShakePacketId
    | PlayerFogSettingPacketId
    | CorrectPlayerMovePredictionPacketId
    | ItemRegistryPacketId
    | FilterTextPacket_DEPRECATEDPacketId
    | ClientBoundDebugRendererPacketId
    | SyncActorPropertyPacketId
    | AddVolumeEntityPacketId
    | RemoveVolumeEntityPacketId
    | SimulationTypePacketId
    | NpcDialoguePacketId
    | EduUriResourcePacketId
    | CreatePhotoPacketId
    | UpdateSubChunkBlocksPacketId
    | PhotoInfoRequest_DEPRECATEDPacketId
    | SubChunkPacketId
    | SubChunkRequestPacketId
    | PlayerStartItemCooldownPacketId
    | ScriptMessagePacketId
    | CodeBuilderSourcePacketId
    | TickingAreasLoadStatusPacketId
    | DimensionDataPacketId
    | AgentActionPacketId
    | ChangeMobPropertyPacketId
    | LessonProgressPacketId
    | RequestAbilityPacketId
    | RequestPermissionsPacketId
    | ToastRequestPacketId
    | UpdateAbilitiesPacketId
    | UpdateAdventureSettingsPacketId
    | DeathInfoPacketId
    | EditorNetworkPacketId
    | FeatureRegistryPacketId
    | ServerStatsPacketId
    | RequestNetworkSettingsPacketId
    | GameTestRequestPacketId
    | GameTestResultsPacketId
    | PlayerClientInputPermissionsPacketId
    | ClientCheatAbilityPacket_DeprecatedPacketId
    | CameraPresetsPacketId
    | UnlockedRecipesPacketId
    | TitleSpecificPacketsStartPacketId
    | TitleSpecificPacketsEndPacketId
    | CameraInstructionPacketId
    | CompressedBiomeDefinitionList_DEPRECATEDPacketId
    | TrimDataPacketId
    | OpenSignPacketId
    | AgentAnimationPacketId
    | RefreshEntitlementsPacketId
    | PlayerToggleCrafterSlotRequestPacketId
    | SetPlayerInventoryOptionsPacketId
    | SetHudPacketId
    | AwardAchievementPacketId
    | ClientboundCloseScreenPacketId
    | ClientboundLoadingScreenPacket_DeprecatedPacketId
    | ServerboundLoadingScreenPacketId
    | JigsawStructureDataPacketId
    | CurrentStructureFeaturePacketId
    | ServerboundDiagnosticsPacketId
    | CameraAimAssistPacketId
    | ContainerRegistryCleanupPacketId
    | MovementEffectPacketId
    | SetMovementAuthorityModePacketId
    | CameraAimAssistPresetsPacketId
    | ClientCameraAimAssistPacketId
    | ClientMovementPredictionSyncPacketId
    | UpdateClientOptionsPacketId
    | PlayerVideoCapturePacketId
    | PlayerUpdateEntityOverridesPacketId
    | PlayerLocationPacketId
    | ClientboundControlSchemeSetPacketId
    | EndIdPacketId;

type PacketId = PacketIdEnum;

/*
KeepAlive	0	
Login	1	
PlayStatus	2	
ServerToClientHandshake	3	
ClientToServerHandshake	4	
Disconnect	5	
ResourcePacksInfo	6	
ResourcePackStack	7	
ResourcePackClientResponse	8	
Text	9	
SetTime	10	
StartGame	11	
AddPlayer	12	
AddActor	13	
RemoveActor	14	
AddItemActor	15	
ServerPlayerPostMovePosition	16	
TakeItemActor	17	
MoveAbsoluteActor	18	
MovePlayer	19	
PassengerJump_Deprecated	20	
UpdateBlock	21	
AddPainting	22	
TickSync_deprecated	23	
LevelSoundEventV1_DEPRECATED	24	
LevelEvent	25	
TileEvent	26	
ActorEvent	27	
MobEffect	28	
UpdateAttributes	29	
InventoryTransaction	30	
PlayerEquipment	31	
MobArmorEquipment	32	
Interact	33	
BlockPickRequest	34	
ActorPickRequest	35	
PlayerAction	36	
ActorFall_deprecated	37	
HurtArmor	38	
SetActorData	39	
SetActorMotion	40	
SetActorLink	41	
SetHealth	42	
SetSpawnPosition	43	
Animate	44	
Respawn	45	
ContainerOpen	46	
ContainerClose	47	
PlayerHotbar	48	
InventoryContent	49	
InventorySlot	50	
ContainerSetData	51	
CraftingData	52	
CraftingEvent_Deprecated	53	
GuiDataPickItem	54	
AdventureSettings_Deprecated	55	
BlockActorData	56	
PlayerInput_Deprecated	57	
FullChunkData	58	
SetCommandsEnabled	59	
SetDifficulty	60	
ChangeDimension	61	
SetPlayerGameType	62	
PlayerList	63	
SimpleEvent	64	
LegacyTelemetryEvent	65	
SpawnExperienceOrb	66	
MapData	67	
MapInfoRequest	68	
RequestChunkRadius	69	
ChunkRadiusUpdated	70	
ItemFrameDropItem_Deprecated	71	
GameRulesChanged	72	
Camera	73	
BossEvent	74	
ShowCredits	75	
AvailableCommands	76	
CommandRequest	77	
CommandBlockUpdate	78	
CommandOutput	79	
UpdateTrade	80	
UpdateEquip	81	
ResourcePackDataInfo	82	
ResourcePackChunkData	83	
ResourcePackChunkRequest	84	
Transfer	85	
PlaySound	86	
StopSound	87	
SetTitle	88	
AddBehaviorTree	89	
StructureBlockUpdate	90	
ShowStoreOffer	91	
PurchaseReceipt	92	
PlayerSkin	93	
SubclientLogin	94	
AutomationClientConnect	95	
SetLastHurtBy	96	
BookEdit	97	
NPCRequest	98	
PhotoTransfer	99	
ShowModalForm	100	
ModalFormResponse	101	
ServerSettingsRequest	102	
ServerSettingsResponse	103	
ShowProfile	104	
SetDefaultGameType	105	
RemoveObjective	106	
SetDisplayObjective	107	
SetScore	108	
LabTable	109	
UpdateBlockSynced	110	
MoveDeltaActor	111	
SetScoreboardIdentity	112	
SetLocalPlayerAsInit	113	
UpdateSoftEnum	114	
Ping	115	
BlockPalette_deprecated	116	
ScriptCustomEvent	117	
SpawnParticleEffect	118	
AvailableActorIDList	119	
LevelSoundEventV2_DEPRECATED	120	
NetworkChunkPublisherUpdate	121	
BiomeDefinitionList	122	
LevelSoundEvent	123	
LevelEventGeneric	124	
LecternUpdate	125	
VideoStreamConnect_DEPRECATED	126	
AddEntity_DEPRECATED	127	
RemoveEntity_DEPRECATED	128	
ClientCacheStatus	129	
OnScreenTextureAnimation	130	
MapCreateLockedCopy	131	
StructureTemplateDataExportRequest	132	
StructureTemplateDataExportResponse	133	
UNUSED_PLS_USE_ME	134	
ClientCacheBlobStatusPacket	135	
ClientCacheMissResponsePacket	136	
EducationSettingsPacket	137	
Emote	138	
MultiplayerSettingsPacket	139	
SettingsCommandPacket	140	
AnvilDamage	141	
CompletedUsingItem	142	
NetworkSettings	143	
PlayerAuthInputPacket	144	
CreativeContent	145	
PlayerEnchantOptions	146	
ItemStackRequest	147	
ItemStackResponse	148	
PlayerArmorDamage	149	
CodeBuilderPacket	150	
UpdatePlayerGameType	151	
EmoteList	152	
PositionTrackingDBServerBroadcast	153	
PositionTrackingDBClientRequest	154	
DebugInfoPacket	155	
PacketViolationWarning	156	
MotionPredictionHints	157	
TriggerAnimation	158	
CameraShake	159	
PlayerFogSetting	160	
CorrectPlayerMovePredictionPacket	161	
ItemRegistryPacket	162	
FilterTextPacket_DEPRECATED	163	
ClientBoundDebugRendererPacket	164	
SyncActorProperty	165	
AddVolumeEntityPacket	166	
RemoveVolumeEntityPacket	167	
SimulationTypePacket	168	
NpcDialoguePacket	169	
EduUriResourcePacket	170	
CreatePhotoPacket	171	
UpdateSubChunkBlocks	172	
PhotoInfoRequest_DEPRECATED	173	
SubChunkPacket	174	
SubChunkRequestPacket	175	
PlayerStartItemCooldown	176	
ScriptMessagePacket	177	
CodeBuilderSourcePacket	178	
TickingAreasLoadStatus	179	
DimensionDataPacket	180	
AgentAction	181	
ChangeMobProperty	182	
LessonProgressPacket	183	
RequestAbilityPacket	184	
RequestPermissionsPacket	185	
ToastRequest	186	
UpdateAbilitiesPacket	187	
UpdateAdventureSettingsPacket	188	
DeathInfo	189	
EditorNetworkPacket	190	
FeatureRegistryPacket	191	
ServerStats	192	
RequestNetworkSettings	193	
GameTestRequestPacket	194	
GameTestResultsPacket	195	
PlayerClientInputPermissions	196	
ClientCheatAbilityPacket_Deprecated	197	
CameraPresets	198	
UnlockedRecipes	199	
TitleSpecificPacketsStart	200	
TitleSpecificPacketsEnd	299	
CameraInstruction	300	
CompressedBiomeDefinitionList_DEPRECATED	301	
TrimData	302	
OpenSign	303	
AgentAnimation	304	
RefreshEntitlementsPacket	305	
PlayerToggleCrafterSlotRequestPacket	306	
SetPlayerInventoryOptions	307	
SetHudPacket	308	
AwardAchievementPacket	309	
ClientboundCloseScreen	310	
ClientboundLoadingScreenPacket_Deprecated	311	
ServerboundLoadingScreenPacket	312	
JigsawStructureDataPacket	313	
CurrentStructureFeaturePacket	314	
ServerboundDiagnosticsPacket	315	
CameraAimAssist	316	
ContainerRegistryCleanup	317	
MovementEffect	318	
SetMovementAuthorityMode	319	
CameraAimAssistPresets	320	
ClientCameraAimAssist	321	
ClientMovementPredictionSyncPacket	322	
UpdateClientOptions	323	
PlayerVideoCapturePacket	324	
PlayerUpdateEntityOverridesPacket	325	
PlayerLocation	326	
ClientboundControlSchemeSetPacket	327	
EndId	328
*/
