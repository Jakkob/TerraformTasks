import tl = require("vsts-task-lib/task");
import msRestAzure = require("../lib/azure-arm-common");

export default class TaskParameters {
    public subscriptionId: string;
    public workingDirectory: string;
    public terraformCommands: string[];

    public useAzureCliAuth: boolean;
    public providerCredentials: msRestAzure.ApplicationTokenCredentials;
    
    public useAzureTerraformBackend: boolean;
    public backendCredentials: msRestAzure.ApplicationTokenCredentials;
    public terraformStateStorageAccount: string;
    public containerName: string;
    public stateFileName: string;

    public installTerraform: boolean;

    constructor() {
        try {
            this.workingDirectory = tl.getPathInput("workingDirectory", false);
            this.terraformCommands = tl.getDelimitedInput("terraformCommands", "\n");

            this.useAzureCliAuth = tl.getBoolInput("useAzureCliAuth", false);
            var providerCredName = tl.getInput("terraformAzureProviderCredentials");
            this.subscriptionId = tl.getEndpointDataParameter(providerCredName, "SubscriptionId", true);
            this.providerCredentials = this.getARMCredentials(providerCredName);

            this.useAzureTerraformBackend = tl.getBoolInput("useAzureTerraformBackend", false);
            this.backendCredentials = this.getARMCredentials(tl.getInput("terraformAzureBackendCredentials"));
            this.terraformStateStorageAccount = tl.getInput("terraformStateStorageAccount");
            this.containerName = tl.getInput("containerName");
            this.stateFileName = tl.getInput("stateFileName");
            this.installTerraform = tl.getBoolInput("installTerraform");
        }
        catch (error) {
            throw new Error(tl.loc("TaskConstructorFailed", error.message));
        }
    }

    private getARMCredentials(connectedService: string): msRestAzure.ApplicationTokenCredentials {
        var servicePrincipalId: string = tl.getEndpointAuthorizationParameter(connectedService, "serviceprincipalid", false);
        var servicePrincipalKey: string = tl.getEndpointAuthorizationParameter(connectedService, "serviceprincipalkey", false);
        var tenantId: string = tl.getEndpointAuthorizationParameter(connectedService, "tenantid", false);
        var armUrl: string = tl.getEndpointUrl(connectedService, true);
        var envAuthorityUrl: string = tl.getEndpointDataParameter(connectedService, 'environmentAuthorityUrl', true);
        envAuthorityUrl = (envAuthorityUrl != null) ? envAuthorityUrl : "https://login.windows.net/";
        var activeDirectoryResourceId: string = tl.getEndpointDataParameter(connectedService, 'activeDirectoryServiceEndpointResourceId', false);
        activeDirectoryResourceId = (activeDirectoryResourceId != null) ? activeDirectoryResourceId : armUrl;
        var credentials = new msRestAzure.ApplicationTokenCredentials(servicePrincipalId, tenantId, servicePrincipalKey, armUrl, envAuthorityUrl, activeDirectoryResourceId, false);
        return credentials;
    }
}