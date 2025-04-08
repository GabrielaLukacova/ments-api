"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCron = startCron;
const node_cron_1 = __importDefault(require("node-cron"));
const https_1 = __importDefault(require("https"));
// Settings
const MINUTES_DELTA = 1;
const URL = "https://ments-api-kex4.onrender.com/api/";
let counter = 0;
let task;
/**
 * Small helper function to ping the server and output to console.
 */
function pingServer() {
    https_1.default.get(URL, () => {
        counter -= MINUTES_DELTA;
        console.log('Pinged the server');
        console.log("Minutes Left: ", counter);
    });
}
/**
 * Small helper function to stop the task
 */
function stopPingingServer() {
    task.stop();
    console.log('Stopped the cron job due to inactivity');
}
/**
* Stop and clear any scheduled tasks
*/
function cleanUpTasks() {
    // Clean up any existing tasks
    for (const task of node_cron_1.default.getTasks().values()) {
        task.stop();
    }
    node_cron_1.default.getTasks().clear();
}
/**
 *
 * @param req
 * @param res
 */
function startCron(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            cleanUpTasks();
            const cronPattern = "*/" + MINUTES_DELTA + " * * * *";
            // Docs here: https://crontab.guru/#*/1_*_*_*_*
            const totalDuration = parseInt(req.params.duration) || 60;
            //Initialize the task with the specified cronPattern
            counter = totalDuration; // set counter, so we can output how much time is left
            task = node_cron_1.default.schedule(cronPattern, pingServer, { scheduled: false });
            task.start();
            setTimeout(stopPingingServer, totalDuration * 60 * 1000);
            res.status(200).send("Started background task (duration:" + totalDuration + " mins)");
        }
        catch (error) {
            console.log("Error:" + error); // Debug info
            res.status(500).send(error);
        }
    });
}
;
//# sourceMappingURL=devController.js.map