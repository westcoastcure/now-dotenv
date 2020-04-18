"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var util_1 = require("util");
var path_1 = require("path");
var fs_1 = require("fs");
var node_fetch_1 = __importDefault(require("node-fetch"));
var dotenv_1 = __importDefault(require("dotenv"));
// API
// https://zeit.co/docs/api#endpoints/secrets
var NowDotenv = /** @class */ (function () {
    function NowDotenv(options) {
        this.options = __assign({ verbose: false, syncApi: true, syncJson: true, overwrite: false, build: false, team: null }, options);
        this.envs = this.readEnvs();
        this.projectName = this.getProjectName();
        this.prefix = this.getPrefix(this.projectName);
        this.nowJsonName = this.getNowJsonName();
        this.nowJsonPath = this.getNowJsonPath(this.nowJsonName);
        this.token = this.getToken(this.envs);
        this.headers = {
            Authorization: "Bearer " + this.token,
            'Content-Type': 'application/json',
        };
        this.teamId = null;
        this.log("NowDotenv for project '" + this.projectName + "' with prefix '" + this.prefix + "'");
    }
    /** PUBLIC */
    NowDotenv.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!this.options.team) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadTeamId()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.options.syncApi) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.syncApi()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!this.options.syncJson) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.syncJson()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (this.options.codegen)
                            this.codegen();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, true];
                }
            });
        });
    };
    /** Load the teamId **/
    NowDotenv.prototype.loadTeamId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.apiGetTeamId(this.options.team)];
                    case 1:
                        _a.teamId = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Synchronise secrets with now */
    NowDotenv.prototype.syncApi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reset({ staged: true })];
                    case 1:
                        _a.sent();
                        this.log("Creating now secrets...");
                        return [4 /*yield*/, Promise.all(Object.entries(this.envs).map(function (_a) {
                                var name = _a[0], value = _a[1];
                                return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                                    return [2 /*return*/, this.apiCreateSecret(this.formatName(name), value)];
                                }); });
                            }))];
                    case 2:
                        _a.sent();
                        this.log("Now secrets created!");
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Synchronise secrets for now.stage.json */
    NowDotenv.prototype.syncJson = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options.overwrite)
                    this.overwriteJsonEnvs();
                else
                    this.updateJsonEnvs();
                return [2 /*return*/];
            });
        });
    };
    /** Deletes all/staged previous secrets */
    NowDotenv.prototype.reset = function (_a) {
        var _b = _a.staged, staged = _b === void 0 ? true : _b;
        return __awaiter(this, void 0, void 0, function () {
            var prev, deduped;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.log("Deleting now secrets...");
                        return [4 /*yield*/, this.apiGetSecrets()];
                    case 1:
                        prev = _c.sent();
                        deduped = this.dedupeSecrets(prev, { staged: staged });
                        return [4 /*yield*/, Promise.all(deduped.map(function (secret) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, this.apiDeleteSecret(secret.name)];
                            }); }); }))];
                    case 2:
                        _c.sent();
                        this.log("Now secrets deleted!");
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Generates proces.env typings */
    NowDotenv.prototype.codegen = function () {
        var typings = this.generateTypings();
        fs_1.writeFileSync(path_1.join(process.cwd(), this.options.codegen || 'env.d.ts'), typings, 'utf-8');
        this.log("Typings for process.env saved at " + this.options.codegen);
    };
    /** API */
    NowDotenv.prototype.apiGetTeamId = function (team) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1.default("https://api.zeit.co/v1/teams?slug=" + team, {
                            method: 'GET',
                            headers: this.headers,
                        })];
                    case 1:
                        res = _a.sent();
                        if (res.ok) {
                            this.log("GET teamId");
                            return [2 /*return*/, res.json().then(function (res) { return res.id; })];
                        }
                        throw Error(this.formatErr(res, "Cannot fetch team"));
                }
            });
        });
    };
    NowDotenv.prototype.apiGetSecrets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var team, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        team = this.teamId ? "?teamId=" + this.teamId : "";
                        return [4 /*yield*/, node_fetch_1.default("https://api.zeit.co/v2/now/secrets" + team, {
                                method: 'GET',
                                headers: this.headers,
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.ok) {
                            this.log("GET secrets");
                            return [2 /*return*/, res.json().then(function (res) { return res.secrets; })];
                        }
                        throw Error(this.formatErr(res, "Cannot fetch secrets"));
                }
            });
        });
    };
    NowDotenv.prototype.apiDeleteSecret = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var team, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        team = this.teamId ? "?teamId=" + this.teamId : "";
                        return [4 /*yield*/, node_fetch_1.default("https://api.zeit.co/v2/now/secrets/" + name + team, {
                                method: 'DELETE',
                                headers: this.headers,
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.ok) {
                            this.log("DELETE " + name);
                            return [2 /*return*/, true];
                        }
                        throw Error(this.formatErr(res, "Cannot delete secret " + name));
                }
            });
        });
    };
    NowDotenv.prototype.apiCreateSecret = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            var team, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        team = this.teamId ? "?teamId=" + this.teamId : "";
                        return [4 /*yield*/, node_fetch_1.default("https://api.zeit.co/v2/now/secrets" + team, {
                                method: 'POST',
                                headers: this.headers,
                                body: JSON.stringify({
                                    name: name,
                                    value: value,
                                }),
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.ok) {
                            this.log("POST " + name);
                            return [2 /*return*/, true];
                        }
                        throw Error(this.formatErr(res, "Cannot create secret " + name));
                }
            });
        });
    };
    /** HELPER */
    /** Overwrites envs of now json with now.json + envs */
    NowDotenv.prototype.updateJsonEnvs = function () {
        var _this = this;
        var json = this.readNowJson({ staged: true });
        if (!json) {
            return this.overwriteJsonEnvs();
        }
        if (!json.env) {
            json = __assign(__assign({}, json), { env: {} });
        }
        if (this.options.build && (!json.build || !json.build.env)) {
            if (!json.build) {
                json = __assign(__assign({}, json), { build: {} });
            }
            json = __assign(__assign({}, json), { build: __assign(__assign({}, json.build), { env: {} }) });
        }
        Object.keys(this.envs).forEach(function (name) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            json.env[name] = '@' + _this.formatName(name);
            if (_this.options.build) {
                json.build.env[name] = '@' + _this.formatName(name);
            }
        });
        this.writeNowJson(json);
        this.log("Updated " + this.nowJsonName + " with envs");
    };
    /** Overwrites envs of now json with now.json + envs */
    NowDotenv.prototype.overwriteJsonEnvs = function () {
        var _this = this;
        var json = this.readNowJson({ staged: false });
        if (!json) {
            throw Error("Cannot create or overwrite " + this.nowJsonName + " because now.json is not present");
        }
        if (!this.options.stage && !this.options.project) {
            throw Error("Provide --stage or now --json to use overwrite option");
        }
        if (!json.env) {
            json = __assign(__assign({}, json), { env: {} });
        }
        if (this.options.build && (!json.build || !json.build.env)) {
            if (!json.build) {
                json = __assign(__assign({}, json), { build: {} });
            }
            json = __assign(__assign({}, json), { build: __assign(__assign({}, json.build), { env: {} }) });
        }
        Object.keys(this.envs).forEach(function (name) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            json.env[name] = '@' + _this.formatName(name);
            if (_this.options.build) {
                json.build.env[name] = '@' + _this.formatName(name);
            }
        });
        this.writeNowJson(json);
        this.log("Overwriten " + this.nowJsonName + " with now.json and envs");
    };
    NowDotenv.prototype.dedupeSecrets = function (secrets, _a) {
        var _this = this;
        var _b = _a.staged, staged = _b === void 0 ? true : _b;
        return secrets.filter(function (_a) {
            var name = _a.name;
            return staged
                ? name.substr(0, _this.prefix.length) === _this.prefix
                : name.substr(0, _this.projectName.length) === _this.projectName;
        });
    };
    NowDotenv.prototype.generateTypings = function () {
        var res = '';
        res += "declare namespace NodeJS {\n";
        res += "  interface ProcessEnv {\n";
        Object.keys(this.envs).forEach(function (fieldname) {
            res += "    " + fieldname + ": string\n";
        });
        res += "  }\n";
        res += "}\n";
        return res;
    };
    /** CONFIG */
    NowDotenv.prototype.getNowJsonName = function () {
        if (this.options.project) {
            return path_1.basename(this.options.project);
        }
        if (!this.options.stage) {
            return 'now.json';
        }
        return "now." + this.options.stage + ".json";
    };
    NowDotenv.prototype.getNowJsonPath = function (nowJsonName) {
        if (this.options.project) {
            return this.options.project;
        }
        return path_1.join(process.cwd(), nowJsonName);
    };
    NowDotenv.prototype.getPrefix = function (projectName) {
        var res = projectName + '-';
        if (this.options.stage) {
            res += this.options.stage + '-';
        }
        return res.toLowerCase().replace('_', '-');
    };
    NowDotenv.prototype.getProjectName = function () {
        if (this.options.name)
            return this.options.name;
        var nowJson = this.readNowJson({ staged: true }) || this.readNowJson({ staged: false });
        var pkgJson = this.readPkgJson();
        if (!(nowJson && nowJson.name) && !(pkgJson && pkgJson.name)) {
            throw Error("Could not determine project name from args, package.json or now.json");
        }
        return ((nowJson && nowJson.name) || (pkgJson && pkgJson.name));
    };
    NowDotenv.prototype.getToken = function (envs) {
        if (this.options.token) {
            return this.options.token;
        }
        if (process.env.NOW_TOKEN) {
            return process.env.NOW_TOKEN;
        }
        if (envs.NOW_TOKEN) {
            return envs.NOW_TOKEN;
        }
        throw Error("Now API token is missing.");
    };
    /** READ-WRITE */
    NowDotenv.prototype.readPkgJson = function () {
        try {
            var file = fs_1.readFileSync(path_1.join(process.cwd(), 'package.json'), 'utf-8');
            return JSON.parse(file);
        }
        catch (_a) {
            return undefined;
        }
    };
    NowDotenv.prototype.readNowJson = function (_a) {
        var _b = _a.staged, staged = _b === void 0 ? true : _b;
        var path = staged ? this.nowJsonPath : path_1.join(process.cwd(), 'now.json');
        try {
            return JSON.parse(fs_1.readFileSync(path, 'utf-8'));
        }
        catch (_c) {
            return undefined;
        }
    };
    NowDotenv.prototype.writeNowJson = function (data) {
        return fs_1.writeFileSync(this.nowJsonPath, JSON.stringify(data, null, 2));
    };
    NowDotenv.prototype.readEnvs = function () {
        var path = this.options.env || (this.options.stage ? ".env." + this.options.stage : '.env');
        var _a = dotenv_1.default.config({ path: path }), parsed = _a.parsed, error = _a.error;
        if (error)
            throw error;
        if (!parsed || (util_1.isObject(parsed) && Object.keys(parsed).length === 0))
            throw Error("Could not find envs in " + path);
        this.log("Envs read from " + path);
        return parsed;
    };
    /** FORMAT */
    NowDotenv.prototype.formatName = function (name) {
        return this.prefix + name.toLowerCase().replace('_', '-');
    };
    NowDotenv.prototype.formatErr = function (res, msg) {
        return msg + " (" + res.status + ": " + res.statusText + ")";
    };
    /** LOG */
    NowDotenv.prototype.log = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (this.options.verbose)
            console.log.apply(console, msgs);
    };
    return NowDotenv;
}());
exports.NowDotenv = NowDotenv;
//# sourceMappingURL=now-dotenv.js.map