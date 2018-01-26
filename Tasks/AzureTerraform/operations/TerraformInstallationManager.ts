import * as httpm from 'typed-rest-client/HttpClient';
import * as cheerio from 'cheerio';
import MachineCharacteristics from '../models/MachineCharacteristics';

export default class TerraformInstallationManager {
    private machineDetails: MachineCharacteristics;
    
    constructor(machineData: MachineCharacteristics) {
        this.machineDetails = machineData;
    }

    public async downloadTerraform() {
        let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');
        let versionsResponse: httpm.HttpClientResponse = await httpc.get('https://releases.hashicorp.com/terraform');

        let versions: Array<string> = [];
        let parser = cheerio.load(await versionsResponse.readBody());
        parser('a').each((i, element) => {
            let content: string = parser(element).text();
            if(content.match(/terraform/) && !content.match(/rc|beta/))
                versions.push(content);
        });
        let version: string = versions[0].replace('terraform_', '');

        let exeResponse: httpm.HttpClientResponse = await httpc.get("https://releases.hashicorp.com/terraform/" + version);
        
        let downloadLink: string = '';
        parser = cheerio.load(await exeResponse.readBody());
        parser('a').each((index, element) => {
            let content: string = parser(element).text();
            if(content.includes(this.machineDetails.OperatingSystem))
        });
    }
}