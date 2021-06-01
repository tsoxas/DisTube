export = DisTube;
declare class DisTube extends EventEmitter {
	on(
		event: "addList",
		listener: (queue: Queue, playlist: Playlist) => void
	): this;
	on(
		event: "addSong" | "playSong" | "finishSong",
		listener: (queue: Queue, song: Song) => void
	): this;
	on(
		event: "empty" | "finish" | "initQueue" | "noRelated" | "disconnect" | "connect" | "deleteQueue",
		listener: (queue: Queue) => void
	): this;
	on(
		event: "error",
		listener: (channel: Discord.TextChannel, error: Error) => void
	): this;
	on(
		event: "searchNoResult" | "searchCancel",
		listener: (interaction: Discord.CommandInteraction, query: string) => void
	): this;
	on(
		event: "searchResult",
		listener: (
			interaction: Discord.CommandInteraction,
			results: SearchResult[],
			query: string
		) => void
	): this;
	on(
		event: "searchDone",
		listener: (
			interaction: Discord.CommandInteraction,
			answer: Discord.CommandInteraction,
			query: string
		) => void
	): this;
}
import { EventEmitter } from "events";
import Discord = require("discord.js");
import Queue = require("./Queue");
import Song = require("./Song");
import SearchResult = require("./SearchResult");
import Playlist = require("./Playlist");
