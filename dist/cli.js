#!/usr/bin/env node
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var dedent_1 = __importDefault(require("dedent"));
var now_dotenv_1 = require("./now-dotenv");
yargs_1.default.scriptName("now-dotenv");
yargs_1.default.usage(dedent_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    now-dotenv\n\n    Simple cli tool for managing Zeit Now v2 secrets with dotenv files (supports multi-stages \uD83D\uDE4C)\n\n    README: https://github.com/vadistic/now-dotenv\n  "], ["\n    now-dotenv\n\n    Simple cli tool for managing Zeit Now v2 secrets with dotenv files (supports multi-stages \uD83D\uDE4C)\n\n    README: https://github.com/vadistic/now-dotenv\n  "]))));
yargs_1.default.options({
    token: {
        alias: 't',
        required: false,
        type: 'string',
        description: "Zeit Now API token (@default: process.env.NOW_TOKEN)",
    },
    stage: {
        alias: 's',
        required: false,
        type: 'string',
        description: "Stage name, eg. \"development (@default: no staging)",
    },
    name: {
        alias: 'n',
        required: false,
        type: 'string',
        description: "Project name (@default: from now.json / package.json)",
    },
    env: {
        alias: 'e',
        required: false,
        type: 'string',
        description: "Dotenv file path (@default: .env.stage / .env)",
    },
    project: {
        alias: 'p',
        required: false,
        type: 'string',
        description: "Location of now.json (@default: now.stage.json / now.json)",
    },
    api: {
        alias: 'a',
        required: false,
        type: 'boolean',
        description: "Sync now secrets api (@default: true)",
    },
    json: {
        alias: 'j',
        required: false,
        type: 'boolean',
        description: "Sync now.stage.json (@default: true)",
    },
    overwrite: {
        alias: 'o',
        required: false,
        type: 'boolean',
        description: "Overwrite whole now.stage.json (@default: false)",
    },
    build: {
        alias: 'b',
        required: false,
        type: 'boolean',
        description: "Overwrite build.env section of now.stage.json (@default: false)",
    },
    team: {
        alias: 'T',
        required: false,
        type: 'string',
        description: "Team name (@default: false)",
    },
    codegen: {
        alias: 'c',
        required: false,
        type: 'string',
        description: "Path for proces.env typings (@default: disabled)",
    },
    verbose: {
        alias: 'v',
        required: false,
        type: 'boolean',
        description: "Log verboose (@default: false)",
    },
});
yargs_1.default.command("sync", "Main (can be skipped)");
yargs_1.default.command("codegen", "Only codegen");
yargs_1.default.command("reset", "Delete Now Secrets", function (reset) {
    return reset.options({
        all: {
            type: 'boolean',
            description: "Reset secrets for all stages of this app",
            required: false,
        },
    });
});
yargs_1.default.example("now-dotenv --token TOKEN", "minimal/ no staging");
yargs_1.default.example("now-dotenv --token TOKEN --stage prod --env .env.production", "stage production / specified env file location");
yargs_1.default.example("now-dotenv --token TOKEN --stage dev --overwrite --codegen ./types/env.d.ts", "stage dev/ overwite now.dev.json / codegen typings ");
yargs_1.default.example("now-dotenv --token TOKEN --json false --verbose", "disable now json stuff (only sync api) / log verbose");
yargs_1.default.recommendCommands();
// nicely warp
yargs_1.default.wrap(yargs_1.default.terminalWidth() * 0.9);
var argv = yargs_1.default.argv;
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var api, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!argv.token && !process.env.NOW_TOKEN) {
                    console.error("Provide Now API token! https://zeit.co/account/tokens\n");
                    yargs_1.default.showHelp();
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                api = new now_dotenv_1.NowDotenv(argv);
                if (!(argv._[0] === 'reset')) return [3 /*break*/, 3];
                return [4 /*yield*/, api.reset({ staged: !argv.all })];
            case 2:
                _a.sent();
                console.log("Secrets reset!");
                return [2 /*return*/];
            case 3:
                if (argv._[0] === 'codegen') {
                    api.codegen();
                    console.log("Typings ready!");
                    return [2 /*return*/];
                }
                if (!(argv._[0] === 'sync' || argv._[0] === undefined)) return [3 /*break*/, 5];
                return [4 /*yield*/, api.exec()];
            case 4:
                _a.sent();
                console.log("NowDotenv: Done!");
                return [2 /*return*/];
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                console.error("Some problems...\n");
                console.error(e_1);
                return [2 /*return*/];
            case 7:
                console.error("Invalid options!");
                yargs_1.default.showHelp();
                return [2 /*return*/];
        }
    });
}); };
main();
var templateObject_1;
//# sourceMappingURL=cli.js.map