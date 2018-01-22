import path = require("path");
import tl = require("vsts-task-lib/task");

import TaskParameters from "./models/TaskParameters";

async function run(): Promise<void> {
    var taskParameters = new TaskParameters();
}

var taskManifestPath = path.join(__dirname, "task.json");
tl.debug("Setting resource path to " + taskManifestPath);
tl.setResourcePath(taskManifestPath);

run().then((result) =>
    tl.setResult(tl.TaskResult.Succeeded, "")
).catch((error) =>
    tl.setResult(tl.TaskResult.Failed, error)
);