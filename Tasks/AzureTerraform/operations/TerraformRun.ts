import TaskParameters from "../models/TaskParameters";

export default class TerraformRun {
    private taskParams: TaskParameters;

    constructor(params: TaskParameters) {
        this.taskParams = params;
    }

    
}