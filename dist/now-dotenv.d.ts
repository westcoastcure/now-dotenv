import { NowDotenvOptions, Envs } from './types';
export declare class NowDotenv {
    headers: {
        [key: string]: string;
    };
    options: NowDotenvOptions;
    prefix: string;
    projectName: string;
    envs: Envs;
    nowJsonName: string;
    nowJsonPath: string;
    token: string;
    teamId: string | null;
    constructor(options: NowDotenvOptions);
    /** PUBLIC */
    exec(): Promise<boolean>;
    /** Load the teamId **/
    private loadTeamId;
    /** Synchronise secrets with now */
    syncApi(): Promise<void>;
    /** Synchronise secrets for now.stage.json */
    syncJson(): Promise<void>;
    /** Deletes all/staged previous secrets */
    reset({ staged }: {
        staged?: boolean | undefined;
    }): Promise<void>;
    /** Generates proces.env typings */
    codegen(): void;
    /** API */
    private apiGetTeamId;
    private apiGetSecrets;
    private apiDeleteSecret;
    private apiCreateSecret;
    /** HELPER */
    /** Overwrites envs of now json with now.json + envs */
    private updateJsonEnvs;
    /** Overwrites envs of now json with now.json + envs */
    private overwriteJsonEnvs;
    private dedupeSecrets;
    private generateTypings;
    /** CONFIG */
    private getNowJsonName;
    private getNowJsonPath;
    private getPrefix;
    private getProjectName;
    private getToken;
    /** READ-WRITE */
    private readPkgJson;
    private readNowJson;
    private writeNowJson;
    private readEnvs;
    /** FORMAT */
    private formatName;
    private formatErr;
    /** LOG */
    private log;
}
//# sourceMappingURL=now-dotenv.d.ts.map