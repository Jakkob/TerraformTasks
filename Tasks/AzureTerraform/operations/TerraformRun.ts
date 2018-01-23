import TaskParameters from "../models/TaskParameters";

export default class TerraformRun {
    private taskParams: TaskParameters;

    constructor(params: TaskParameters) {
        this.taskParams = params;
    }

    public async execute() : Promise<void> {
        // Steps:
        // - Find, download, update, and/or install Terraform.
        // - Handle backend operations (if requested).
        //     - Get backend params.
        //     - Get backend params.
        // - Handle AzureCLI operations (if requested).
        //     - Get AzureCLI params.
        //     - Log into AzureCLI.
        // 

        return undefined;
    }
}