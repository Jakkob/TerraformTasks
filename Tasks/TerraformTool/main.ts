import * as httpm from 'typed-rest-client/HttpClient';
import * as cheerio from 'cheerio';
import MachineCharacteristics from './MachineCharacteristics';

async function getLatestTerraformVersion() {
    let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');
    let versionsResponse: httpm.HttpClientResponse = await httpc.get('https://releases.hashicorp.com/terraform');

    let versions: Array<string> = [];
    let parser = cheerio.load(await versionsResponse.readBody());
    parser('a').each((i, element) => {
        let content: string = parser(element).text();
        if(content.match(/terraform/) && !content.match(/rc|beta/))
            versions.push(content);
    });
    return versions[0].replace('terraform_', '');
};