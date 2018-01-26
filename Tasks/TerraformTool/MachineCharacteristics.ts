import os = require('os');

export enum OperatingSystem {
    Windows = 'windows',
    Linux = 'linux',
    OSX = 'darwin'
}

export enum ProcessorArchitecture {
    x86 = '386',
    x64 = 'amd64',
    Arm = 'arm'
}

export default class MachineCharacteristics {
    public OperatingSystem: OperatingSystem;
    public ProcessorArchitecture: ProcessorArchitecture;

    constructor() {
        // Get processor arch:
        let arch: string = os.arch();
        switch (arch) {
            case 'arm':
                this.ProcessorArchitecture = ProcessorArchitecture.Arm;
                break;
            case 'x32':
                this.ProcessorArchitecture = ProcessorArchitecture.x86;
                break;
            case 'x64':
                this.ProcessorArchitecture = ProcessorArchitecture.x64;
                break;
            default:
                throw "Incompatible Processor Architecture. Terraform not supported.";
        }
        
        let machineOs: string = os.platform();
        switch (machineOs) {
            case 'win32':
                this.OperatingSystem = OperatingSystem.Windows;
                break;
            case 'linux':
                this.OperatingSystem = OperatingSystem.Linux;
                break;
            case 'darwin':
                this.OperatingSystem = OperatingSystem.OSX;
                break;
            default:
            throw "Incompatible Operating System.";
        }
    }
}
